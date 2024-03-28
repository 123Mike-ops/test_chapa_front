<template>
  <div class="p-0">
  <div class="md:hidden"><span class="text-green-500">Filter by:</span></div>
    <div class="flex flex-row justify-end sm:w-full p-2 sm:block md:flex-col md:p-5 w-full">
      <div class="hidden  md:flex flex-col bg-white ">
        <div class="hidden md:block bg-custom_yellow-100 text-black p-3 rounded-md"><label class="text-lg">{{ $t('category.category') }}</label></div>
        <div class="hidden md:block p-3"><label class="font-bold"> {{ category.name }}</label></div>
        <div v-if="subCategories.length > 0" class="hidden md:flex flex-col ml-5">
          <div v-for="sub in subCategories" :key="sub.subCategory.id" class="p-1">
            <label>
              <input type="radio" v-model="selectedSubcategory" :value="sub.subCategory.id" @change="submitForm('subCategory',sub.subCategory.id)" />
              {{ sub.subCategory.name }} | <span class="ml-2 text-gray-400">{{sub.numberOfPost}}</span>
            </label>
          </div>
        </div>  
        
      </div>

      <div v-if="subCategories.length > 0" class="md:hidden flex justify-start  mt-3">
        <label class=""><Downoutlined /></label>
        <select   v-model="selectedSubcategory" @change="submitForm('subCategory', selectedSubcategory)" class=" h-8 rounded-md p-1  border-2 border-green-300 font-light">
      
          <option class="font-light"  v-for="sub in subCategories" :key="sub.subCategory.id" :value="sub.subCategory.id" :selected="sub.subCategory.id === selectedSubcategory">
            {{ sub.subCategory.name }} 
          </option>
        </select>

        

      </div>
      <div>
          <a @click="setLocationVisible(true)" class="hidden md:flex justify-between flex-row bg-white mt-3">
            <div class="flex flex-col p-3">
              <div> <span>{{ $t('category.location') }}</span></div>
              <div><small class="text-gray-400">All Ethiopia</small></div>
            </div>
            <div class="p-2">
              <RightOutlined />
            </div>
        
          </a>
    </div>
    <div class="md:hidden mt-3">
      <button @click="setLocationVisible(true)" class="flex justify-between flex-row p-1 rounded-md border-2 border-green-300 ml-2">
        <div class="flex flex-col ">
          <div><span class="font-light">{{ $t('category.location') }}</span></div>
        </div>
      </button>
    </div>
      <div class="hidden sm:block md:mr-3">  <button @click="clearForm('location')" class="text-custom_green-100 font-bold">Clear Location Filter</button></div>
      <div v-if="selectedRegion!=null && selectedCity!=null" class="hidden md:flex flex-col">
        <div class="flex justify-between flex-row bg-white">
          <div class="flex flex-col p-3">
            <span class="font-bold text-lg">Selected City</span>
            <div  class="">
              <label>
              {{selectedCity.name}}
              </label>
            </div>
          </div>
        </div>
        <div class="flex justify-between flex-row bg-white">
          <div class="flex flex-col p-3">
            <span class="font-bold text-lg">Selected Region</span>
            <div class="">
              <label>
              {{selectedRegion.name}}
              </label>
            </div>
          </div>
        </div>
      
      </div>
    
     
      
      

      <div class=" hidden sm:block md:mt-3 w-full">
        <a-collapse v-model:activeKey="activeKey" class="w-full bg-white">
          <a-collapse-panel key="1" :header="$t('category.price')" class="w-full">
            <div class="flex flex-col">
              <div class="flex flex-row">
                <div><a-input v-model:value="priceFrom" placeholder="min" @blur="submitForm('priceFrom',this.priceFrom)" /></div>
                <div class="p-2"><label>-</label></div>
                <div><a-input v-model:value="priceTo" placeholder="max" @blur="submitForm('priceTo',this.priceTo)" /></div>
              </div>
              <!-- <div>
                <a-radio-group v-model:value="value" class="p-1 text-lg">
                  <a-radio :value="1">Under 5 K • <span class="text-gray-400">400 ads</span></a-radio>
                  <a-radio :value="2">5 K - 1.7 M • <span class="text-gray-400">1 600 ads</span></a-radio>
                  <a-radio :value="3">1.7 - 4.3 M • <span class="text-gray-400">2 666 ads</span></a-radio>
                  <a-radio :value="4">4.3 - 11 M • <span class="text-gray-400">1 666 ads </span></a-radio>
                </a-radio-group>

              </div> -->

            </div>
            <div class="flex justify-between flex-row ">
              <div><button class="font-bold" type="seconday">clear</button></div>
              <div><button class="text-green-500 font-bold" type="seconday">save</button></div>
            </div>
          </a-collapse-panel>


        </a-collapse>

      </div>
      <div class="md:hidden ml-2 mt-3">
        
        <button @click="showPriceModal"  class="flex justify-between flex-row  p-1 rounded-md border-2 border-green-300 font-light ">Price</button>

      </div>
      <div class="flex justify-start flex-row ">
        <div class="hidden sm:block "> <button @click="clearForm('price')" class="text-custom_green-100 font-bold">Clear Price Filter</button></div>

      </div>

     
     


    </div>
    <div class="md:hidden flex justify-start flex-row p-2 ">
      <div > <button @click="clearForm('')" class="text-green-500 font-bold">Clear Filter</button></div>

    </div>

<!--Modal FOr Price Filer-->
    <div class="ml-0">
      <a-modal v-model:visible="isModalVisible" title="Price Filter" class="ant-modal-body">
        <div class="flex flex-col">
          <div class="flex flex-row">
            <div><a-input v-model:value="priceFrom" placeholder="min" @blur="submitForm('priceFrom', priceFrom)" /></div>
            <div class="p-2"><label>-</label></div>
            <div><a-input v-model:value="priceTo" placeholder="max" @blur="submitForm('priceTo', priceTo)" /></div>
          </div>
          <!-- Additional content for the modal -->
          <div class="flex justify-between flex-row ">
            <div><button class="font-bold" type="secondary" @click="closePriceModal">Clear</button></div>
            <div><button class="text-green-500 font-bold" type="secondary" @click="saveForm">Save</button></div>
          </div>
        </div>
      </a-modal>
    </div>

    <!--Modal For Location Filer-->
    <div id="components-modal-demo-position">

      <a-modal v-model:open="locationVisible" title="Location" style="top: 20px" class="" @ok="setLocationVisible(false)">
        <div class="flex flex-col">
          <div v-if="selectedRegion==null" class="flex flex-col">

            <div class="flex justify-between flex-row bg-white">
              <div class="flex flex-col p-3">
                <span class="font-bold text-xl">Select Region</span>
                <div v-for="reg in region" :key="reg.id" class="p-3">
                  <label>
                    <input type="radio" v-model="selectedRegion" :value="reg" @change="setCitiesVisible(reg.id)" />
                    {{ reg.name }}
                  </label>
                </div>
              </div>
              <div class="p-2">
                <RightOutlined />
              </div>
            </div>
            

          </div>
          <div v-if="selectedRegion!=null && selectedCity==null" class="flex flex-col">
            <div class="flex justify-between flex-row bg-white">
              <div class="flex flex-col p-3">
                <span class="font-bold text-xl">Select City</span>
                <div v-for="city in cities" :key="city.id" class="p-3">
                  <label>
                    <input type="radio" v-model="selectedCity" :value="city" @change="submitForm('city',city.id)"  />
                    {{ city.name }}
                  </label>
                </div>
              </div>
              <div class="p-2">
                <RightOutlined />
              </div>
            </div>
            
          </div>
  
          <div v-if="selectedRegion!=null && selectedCity!=null" class="flex flex-col">
            <div class="flex justify-between flex-row bg-white">
              <div class="flex flex-col p-3">
                <span class="font-bold text-xl">Selected City</span>
                <div  class="p-3">
                  <label>
                  {{selectedCity.name}}
                  </label>
                </div>
              </div>
            </div>
            <div class="flex justify-between flex-row bg-white">
              <div class="flex flex-col p-3">
                <span class="font-bold text-xl">Selected Region</span>
                <div class="p-3">
                  <label>
                  {{selectedRegion.name}}
                  </label>
                </div>
              </div>
            </div>
            <div><button @click="clearForm('location')" class="font-bold text-custom_green-100">Clear Filter</button></div>
          </div>
          

        </div>

      </a-modal>

    </div>

  </div>
</template>
<style>
.ant-modal-body {
  padding: 0; /* Set padding to 0 or adjust as needed */
}
</style>
<script>
import { ref, watch } from 'vue';
const activeKey = ref(['1']);
import { RightOutlined } from "@ant-design/icons-vue";
import API from "../../views/setting/lookup.service";
import APIPost from '../../views/setting/post.service';
import { FilterField } from "@/modal/filter.model";
import { Downoutlined } from "@ant-design/icons-vue";
watch(activeKey, val => {
  console.log('activeKey', val);
});


export default {
  name: "FilterComponent",
  components: {
    RightOutlined,
    Downoutlined

  },
  props: {
    category: {},
    subCategories: [],
    region: [],
    posts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      value: '',
      valueIn: '',
      locationVisible: false,
      isModalVisible: false,
      citiesVisible: false,
      cities: [],
      selectedRegion: null,
      selectedCity:null,
      selectedSubcategory:null,
      queryData:{},
      priceFrom:'',
      priceTo:'',
      filterField:new FilterField(),
      selectedSubcategoryMobile: 'SubCategory',

    };
  },
  methods: {
    setLocationVisible(open) {
      // this.submitForm();
      this.locationVisible = open;
    },
    showPriceModal(){
      this.isModalVisible=true;
    },
    closePriceModal(){
      this.isModalVisible=false;
    },
    setCitiesVisible(regionId) {
      this.submitForm('region',regionId);
      API.getCity(regionId).then(res => {
        this.cities = res.data
      }).catch(err => { console.log(err) })
    },
    clearForm(value){
      console.log("before",this.selectedCity,this.selectedRegion)
   
  
    if(value=='location'){
      this.selectedCity=null;
    this.selectedRegion=null;
      this.filterField.city=null;
      this.filterField.region=null;
      this.$emit('refresh',this.filterField,'filter');
    }else if(value=='price'){
      this.priceFrom=null;
      this.priceTo=null;
      this.filterField.priceFrom=null;
      this.filterField.priceTo=null;
      this.$emit('refresh',this.filterField,'filter');
    }else if(value=='sort'){

      this.filterField.sortBy=null;
      this.filterField.sortType=null;
      this.$emit('refresh',this.filterField,'filter');
    }else{
      this.filterField=new FilterField();
      this.filterField.category=this.category?.id;
      this.$emit('refresh',this.filterField,'filter');

    }
    


    },
    submitForm(fieldName, value) {
      // this.queryData = { ...this.queryData, [fieldName]: value };
      this.filterField[fieldName]=value;
      this.$emit('submit', fieldName, value);
       
      console.log(`Query Data for ${fieldName}:`, value);
      console.log("Query data",this.queryData);
    },
   
    
  }
 
};
</script>