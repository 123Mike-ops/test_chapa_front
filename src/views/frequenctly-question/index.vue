<template>
    <div class="container flex  flex-col ">
      <div>
        <h1 class="text-2xl mt-10">
          {{ $t('profile.frequenctly-question') }}
        </h1>
      </div>
      <div class="container mx-auto mt-10 lg:flex lg:flex-row  lg:justify-between h-full ">
        <div class="bg-custom_gray-800 w-80 rounded-lg mr-10 ">
          <div class="w-full bg-custom_green-100 h-14 mb-3 flex items-center justify-center ">
            
            <a-input-search
      v-model:value="value"
      placeholder="input search text"
      class="h-10 w-full mx-3"
      @search="onSearch"
    />
          </div>
          <div v-if="loading" class="w-full flex items-center justify-center h-20">
          <a-spin size="large" />
        </div>
          <div v-else-if="questions.length > 0" class="w-full flex flex-col bg-transparent mr-10">
            <div  v-for="parent in questions" :key="parent.id" >
              <div :class="`w-full bg-transparent h-8 mb-2 flex items-center justify-start pl-3 text-custom_green-100':''}`" 
              
              >
                 <span class="text-custom_gray-300">{{ parent.title }}</span>
       
            </div>
            <div  >
              <div v-for="p in parent.children" :key="p.id" class="cursor-pointer">
              <div  @click="showAnswer(p)" :class="`w-full bg-white py-2  mb-2 flex items-center justify-start pl-3 text-custom_green-100':''}`" 
             
              >
                 <span class="text-[11px]">{{ p.title }}</span>
       
            </div>
            </div>
            </div>
           
           
            </div>
           
     
            
          </div>
          <div v-else class="flex items-center justify-center h-20 text-gray-500">
            <SearchOutlined />
          <span>No results found</span>
        </div>
         </div>
  <div  v-if="questions.length > 0"  class="container hidden lg:flex  bg-white flex-col px-5 ">
      <div class="w-full flex justify-between items-center h-16 px-5 py-2 shadow-md mb-4 ">
          <div class="text-2xl">{{ selectedQuestion.title }}</div>
        
      </div>

        <p>
          {{ selectedQuestion.answer }}
      </p>       
   </div>
  </div>
      
  
    </div>
  </template>

<script>
import { createHierarchy } from "../../utils/utils";
import axios from 'axios';
import API from '../setting/faq.service'
import {SearchOutlined} from "@ant-design/icons-vue";
export default {
  name: 'FrequentlyPage',
  components: {
    SearchOutlined
  },
  data() {
    return {
      selected: 1,
      questions: [],
      value: '', 
      selectedQuestion: {
        title:'',
        answer:''

      },
      loading:false
    };
  },
  mounted() {
 this.fetchData()
  },
  methods: {
    changeKey(key) {
      this.selected = key;
    },
    fetchData(){
      this.loading=true
      API.AllFAQ().then(response => {
     const modifiedData = response.data.map(item => {
          return {
            ...item,
            parentId: item.parentId == null ? null : item.parentId
           
          };
        });
        const popularQuestions = modifiedData.filter(
          (item) => item.popular && item.parentId !== null
        );
        if (popularQuestions.length > 0) {
          this.selectedQuestion = popularQuestions[0];
        }
        this.questions = createHierarchy(modifiedData);
        this.loading=false
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.loading=false
      });
    },
    onSearch(searchValue) {
      if (searchValue.trim() === "") {
        // If search value is empty, fetch all data again
        this.fetchData();
        return;
      }
      this.loading=true
      // Fetch data from backend based on search query
      API.SearchFAQ(searchValue)
        .then((response) => {
          const modifiedData = response.data.map((item) => ({
            ...item,
            parentId: item.parentId == null ? null : item.parentId,
          }));
          this.questions = createHierarchy(modifiedData);
          this.loading=false
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          this.loading=false
        });
    },
    showAnswer(question) {
      this.selectedQuestion = question;
    },
  }
};
  </script>
  <style scoped>
  
.ant-tabs{
width: 100%;
}

.ant-tabs-nav-wrap::before{
  height: 100px !important;
  padding: 10px 0;
}
::v-deep .ant-tabs-nav-wrap{
  padding: 8px 0px;
  width: 100% !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  
}
::v-deep .ant-tabs-tab {
 
  margin-right: 3px !important;
 border: none !important;
 box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

 
}
::v-deep .ant-tabs-tab-active {
  color: green;
  font-weight: bold;
}
::v-deep .ant-input-group {
  height: 40px;
}

::v-deep .ant-input-group .ant-input {
  height: 40px;
}

::v-deep .ant-input-search-button {
  height: 40px;
}



</style>