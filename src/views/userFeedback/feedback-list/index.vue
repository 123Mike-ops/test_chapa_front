<template>
   
      <div class="w-full lg:w-3/4 mr-10 bg-white mt-4 shadow-lg flex flex-col relative p-8 " >
        <div class="flex justify-between">
        <div class="text-lg">
            Feedback about <span class="text-custom_green-100">Behaylu G</span>
        </div>
        <router-link :to="`/user-feedback/${route.params.userId}/create`"><a-button type="secondary"
           class=" border-2 bg-white text-custom_green-800 border-custom_green-100 w-full" >
           Add
           </a-button></router-link>
          </div>
        <!-- <div class="flex mt-8 mb-5">
            <div class="flex flex-col items-center justify-center   p-3 mr-2">
                <span class="flex items-center justify-center"><MessageOutlined class="text-green-700  text-2xl"/><span class="text-green-700  text-2xl">1</span></span>
                <span class="text-green-700  text-2xl" >Positive</span>
            </div>
            <div class="flex flex-col items-center justify-center    p-3 ml-2">
                <span><MessageOutlined class="text-custom_green-100 text-2xl"/><span class="text-custom_green-100 text-2xl">1</span></span>
                <span class="text-custom_green-100 text-2xl">Neutral</span>
            </div>
            <div class="flex flex-col items-center justify-center   p-3 ml-2">
                <span><MessageOutlined class="text-red-700  text-2xl"/><span class="text-red-700  text-2xl">1</span></span>
                <span class="text-red-700  text-2xl">Negative</span>
            </div>
        </div> -->

        <a-divider />

        <div v-if="feedbackData.length==0" class="w-full h-full flex justify-center items-center">
    <div class="h-96 w-96 flex flex-col items-center justify-center">
      <WechatOutlined class="text-4xl text-custom_green-100 mb-7 "/>
        <div class="mb-7">
            There are no Feedback yet.
        </div>
        </div>
        </div>
      <div v-for="data in feedbackData" class="mt-4  ">
          <div class=" p-5 w-full rounded-lg border-2 bg-custom_gray-800">
            <div class="w-full flex items-center justify-between">
                <div class=" flex items-center">
                  <img :src="data.sender.imageUrl" alt="" class="w-12 h-12 mr-2 rounded-full">
                   <h3>{{ data.sender.login  }}</h3>                  
                </div>
                <div >
                    <MessageOutlined class="text-green-700  text-2xl" v-if="data.type===100" />
                    <MessageOutlined class="text-custom_green-100 text-2xl"  v-if="data.type===101"/>
                    <MessageOutlined class="text-red-700  text-2xl"  v-if="data.type===102"/>
                </div>
            </div>
            <div class="mt-3">{{ data.content }}</div>
            <img :src="baseUrl + '/api/images/' + data.fileUrl" alt=""  v-if="data.fileUrl" class="w-20 h-20"/>
          </div>
          <div class="ml-5 mt-2">
            <span class="text-custom_gray-300">{{formatDateTime(data.createdTime) }}</span>
            <span class="ml-4 cursor-pointer" @click="setShowReplay(data.id)">replay</span>
            <div class="mt-3" v-if="data.id == showReplay">
               <FeedbackReplay  :parentData="data" @replay-create =" getFeedback" :setShowReplay="setShowReplay"/>
            </div>
          </div>
           
          <div v-for="child in data.children" class=" p-5 w-3/4 rounded-lg relative border-2 ml-8 mt-3 bg-custom_gray-800">
            <div class="w-full flex items-center justify-between">
                
               <div class=" flex items-center">
                  <img :src="child.sender.imageUrl" alt="" class="w-12 h-12 mr-2 rounded-full">
                   <h3>{{ child.sender.login  }}</h3>                  
                </div>
                
            </div>
            <div class="mt-3">{{ child.content }}</div>
            <img :src="baseUrl + '/api/images/' + child.fileUrl" alt=""  v-if="child.fileUrl" class="w-20 h-20"/>
            <div class="absolute bottom-2 right-5">
            <span class="text-custom_gray-300">{{formatDateTime(data.createdTime) }}</span>
           
          </div>
          </div>
      </div>
      </div>
   
  </template>
  
  <script>
  import {
    WechatOutlined,
    MessageOutlined,
    UploadOutlined
  } from "@ant-design/icons-vue";
import { ref, onMounted } from "vue";
import feedbackSerive from "@/views/setting/feedback.serivec.js";
import { useRoute } from "vue-router";
import FeedbackReplay  from '@/components/feedback/replay'

  
  export default {
    name: "FeedbackPage",
    components: {
        WechatOutlined,
        MessageOutlined,
        FeedbackReplay,
        UploadOutlined
    },
    setup() { 
      const route = useRoute()
      let feedbackData = ref([
      ])
      const baseUrl = process.env.VUE_APP_SERVER_URL;
      let showReplay = ref(null)
  
      onMounted(() => {
        getFeedback()
    });

    const getFeedback=()=>{
      feedbackSerive.getFeedbacks(parseInt(route.params.userId)).then(res=>{
          feedbackData.value =res.data
      }).catch(err=>{
     
      })
    }

    const setShowReplay= (id)=>{
      showReplay.value = id
    }


    const formatDateTime=(timestamp)=> {
      const options = {
   
        day: 'numeric',
        month: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
       
        hour12: true,
       
      };


      
      // Parse the timestamp and format it
      const formattedDateTime = new Date(timestamp).toLocaleString('en-US', options);
      
      return formattedDateTime;
    }

  return {  
    feedbackData,
    showReplay,
    setShowReplay,
    getFeedback,
    formatDateTime,
    baseUrl, 
    route
    };
    },
  };
  </script>
  <style scoped>
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(249, 172, 24);
    border: 0px none rgb(249, 172, 24);
    border-radius: 0px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(249, 172, 24);
  }
  ::-webkit-scrollbar-thumb:active {
    background: rgb(249, 172, 24);
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-track:hover {
    background: transparent;
  }
  ::-webkit-scrollbar-track:active {
    background: transparent;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  ::v-deep .ant-spin .ant-spin-dot-item {
    background-color: rgb(249, 172, 24) !important;
  }
  </style>
  