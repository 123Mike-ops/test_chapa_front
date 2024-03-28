<template>
    <div class=" flex items-start  ">
      <router-view></router-view>
      <div class="hidden  lg:flex w-1/4 mt-4 ">
     <div class=" w-96 px-3 py-8 bg-white flex flex-col items-center justify-center ">
          <WechatOutlined class="text-4xl text-custom_green-100 mb-7  "/>
                <div class="mb-7">
                    There are no Feedback sent yet.
        go to  posted then  leave feedback about the post .
        click the follow button  and give feedback.
                </div>
    
     </div>
    </div>
    </div>
  </template>
  
  <script>
  import {
    WechatOutlined,
    MessageOutlined
  } from "@ant-design/icons-vue";
import { ref } from "vue";
 
  
  
  export default {
    name: "FeedbackPage",
    components: {
        WechatOutlined,
        MessageOutlined
    },
    setup() {
      let feedbackData = ref([
        {user:{
            firstName:"Miki",
            lastName:"Dagi",
            profilePic:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
    content:"Simply waste of your time! The photo and the specs of the pc and laptops are not the same.They don’t provide the pc u chose online.",
type:100,createdTime:"15/10/23",
          attachmentFile:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
        child:[
          {
            user:{
            firstName:"baya",
            lastName:"miki",
            profilePic:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
            
        },
    content:"Simply waste of your time! ",
type:101,
createdTime:"15/10/23",
          attachmentFile:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600"
          
          }
        ]
        },
{user:{
            firstName:"Miki",
            lastName:"Dagi",
            profilePic:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
            
        },
    content:"Simply waste of your time! The photo and the specs of the pc and laptops are not the same.They don’t provide the pc u chose online.",
type:101,
createdTime:"15/10/23",
          attachmentFile:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
          child:[]},
{user:{
            firstName:"Miki",
            lastName:"Dagi",
            profilePic:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
    content:"Simply waste of your time! The photo and the specs of the pc and laptops are not the same.They don’t provide the pc u chose online.",
type:102,
createdTime:"15/10/23",
          attachmentFile:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
          child:[]},
{user:{
            firstName:"Miki",
            lastName:"Dagi",
            profilePic:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
    content:"Simply waste of your time! The photo and the specs of the pc and laptops are not the same.They don’t provide the pc u chose online.",
type:100,
createdTime:"15/10/23",
          attachmentFile:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
          child:[]},
{user:{
            firstName:"Miki",
            lastName:"Dagi",
            profilePic:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
    content:"Simply waste of your time! The photo and the specs of the pc and laptops are not the same.They don’t provide the pc u chose online.",
type:101,
createdTime:"15/10/23",
          attachmentFile:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
          child:[]},
{user:{
            firstName:"Miki",
            lastName:"Dagi",
            profilePic:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
    content:"Simply waste of your time! The photo and the specs of the pc and laptops are not the same.They don’t provide the pc u chose online.",
type:102,
createdTime:"15/10/23",
          attachmentFile:"https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=600",
          child:[]},
      ])
    
  
  return {  
    feedbackData 
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
  