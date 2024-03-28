<template>
  <div class="container flex  bg-white flex-col">
    
  
<div class="w-full flex justify-between items-center h-16 px-5 py-2 shadow-md mb-4 ">
    <div class="text-2xl">{{ $t('profile.feedback') }}</div>
    <div class="flex items-center justify-between ">
      <button :class="`mr-2 px-3 py-2 hover:bg-custom_green-100 rounded-lg ${selected==1?'bg-custom_green-100':''}`" key="1"  @click="changeKey(1)">Receive</button>
      <button :class="`mr-2 px-3 py-2 hover:bg-custom_green-100 rounded-lg ${selected==2?'bg-custom_green-100':''}`" key="2"  @click="changeKey(2)">Send</button>
    </div>
</div>
<div v-if="selected==1">
 
  <div v-if="feedback.length==0" class="w-full h-full flex justify-center items-center">
    <div class="h-96 w-96 flex flex-col items-center justify-center">
      <WechatOutlined class="text-4xl text-custom_green-100 mb-7 "/>
        <div class="mb-7">
            There are no Feedback yet.
Ask your customers leave feedback about you.
Copy the link and send them.
        </div>
       
</div>
    </div>
       
   
</div>
<div v-if="selected==2">
 
  <div v-if="feedback.length==0" class="w-full h-full flex justify-center items-center">
    <div class="h-96 w-96 flex flex-col items-center justify-center">
      <WechatOutlined class="text-4xl text-custom_green-100 mb-7 "/>
        <div class="mb-7">
            There are no Feedback sent yet.
go to  posted then  leave feedback about the post .
click the follow button  and give feedback.
        </div>
        <button class="w-40 py-3 px-3 bg-custom_green-100 rounded-lg">Follow</button>
</div>
    </div>
</div>



  </div>
</template>
v
<script>
/* eslint-disable */
import {WechatOutlined} from '@ant-design/icons-vue'

export default {
  
name: 'FeedbackPage',
components: {
  WechatOutlined
},
data(){
  return{
    selected:1,
    feedback:[]
  }
},
methods:{
  changeKey(key){
     this.selected = key;
  }
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



</style>