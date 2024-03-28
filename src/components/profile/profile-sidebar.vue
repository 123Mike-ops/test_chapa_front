<template>
  <div class="bg-custom_gray-800 w-80 rounded-lg  ">
    <div class="w-80 flex items-center justify-end bg-custom_yellow-100 pr-3 py-4 text-white">
      <RouterLink  :to="{ name: 'PersonalDetail' }" class="flex items-center justify-center">
         <span class="mr-4"> {{ $t('profile.setting') }}</span>
         <SettingOutlined />
      </RouterLink>
    </div>
    <div class="w-full flex flex-col items-center justify-center bg-custom_yellow-100 border-b-2 border-custom_gray-100 pb-5">
      <img src="https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_1280.png" alt="" 
      class="w-24 h-24 bg-white p-3 mb-5 rounded-full cursor-pointer " @click="showModal" 
      v-if="store.state.user?.userData?.imageUrl==='' || store.state.user?.userData?.imageUrl===null || store.state.user?.userData?.imageUrl===undefined ">
      <img :src="baseUrl + '/api/images/' + store.state.user?.userData?.imageUrl" alt="" 
      class="w-24 h-24 bg-white  mb-5 rounded-full cursor-pointer "
       @click="showModal" 
        v-if="store.state.user?.userData?.imageUrl!=='' && store.state.user?.userData?.imageUrl!==null && store.state.user?.userData?.imageUrl!==undefined " >
      <h2 class="text-2xl text-white">{{ store.state.user.userData?.login}}</h2>
    </div>
    <div class="w-full flex flex-col bg-transparent">
      <RouterLink :class="`w-full bg-white h-14 mb-3 flex items-center justify-start pl-3 ${this.$route.path =='/profile/my-save'?'text-custom_green-100':''}`" :to="{ name: 'MySave' }">
        <MoneyCollectOutlined class="mr-3" />
        <span>{{ $t('profile.my-save') }}</span>
      </RouterLink>
      <RouterLink :class="`w-full bg-white h-14 mb-3 flex items-center justify-start pl-3 ${this.$route.path =='/profile/advert'?'text-custom_green-100':''}`" :to="{ name: 'Advert' }">
        <UnorderedListOutlined class="mr-3" />
        <span> {{ $t('profile.advert') }}</span>
      </RouterLink>
      <!-- <RouterLink :class="`w-full bg-white h-14 mb-3 flex items-center justify-start pl-3 ${this.$route.path =='/profile/performance'?'text-custom_green-100':''}`" :to="{ name: 'Performance' }">
        <BarChartOutlined  class="mr-3" />
        <span> {{ $t('profile.performance') }}</span>
      </RouterLink>
      <RouterLink :class="`w-full bg-white h-14 mb-3 flex items-center justify-start pl-3 ${this.$route.path =='/profile/notification'?'text-custom_green-100':''}`" :to="{ name: 'Notification' }">
        <NotificationOutlined  class="mr-3" />
        <span> {{ $t('profile.notification') }}</span>
      </RouterLink> -->
      <RouterLink :class="`w-full bg-white h-14 mb-3 flex items-center justify-start pl-3 ${this.$route.path =='/profile/follower'?'text-custom_green-100':''}`" :to="{ name: 'Follower' }">
        <UserAddOutlined  class="mr-3" /> 
        <span> {{ $t('profile.follower') }}</span>
      </RouterLink>

      <RouterLink :class="`w-full bg-white h-14 mb-3 flex items-center justify-start pl-3 ${this.$route.path =='/profile/feedback'?'text-custom_green-100':''}`" :to="{ name: 'Feedback' }">
        <WechatOutlined class="mr-3"/>
        <span> {{ $t('profile.feedback') }}</span>
      </RouterLink>
      
      
    </div>
    <a-modal v-model:open="open" title="Add Profile Picture" @ok="handleOk">
      <ProfilePicUpload  @set-url="handelSetUrl" @remove-url="removeUrl"/>
    </a-modal>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import {SettingOutlined, WechatOutlined,UnorderedListOutlined,
  MoneyCollectOutlined,InfoCircleOutlined,BarChartOutlined ,NotificationOutlined ,UserAddOutlined   } from '@ant-design/icons-vue'
import store from "@/store";
import ProfilePicUpload from './profile-pic-upload.vue'
import accountService from "@/views/account/account.service";
import { useStore } from "vuex";
import { ref } from 'vue';
export default {
  name: "ProfileSideBar",
  components: {
    RouterLink,
    UserAddOutlined,
    SettingOutlined,
    WechatOutlined ,
    UnorderedListOutlined,
    MoneyCollectOutlined,
    InfoCircleOutlined ,
    BarChartOutlined ,
    NotificationOutlined ,
    ProfilePicUpload 
  },
 setup(){
  const store = useStore()
  const open = ref(false);
  const imageUrl = ref(null)
 
  const baseUrl = process.env.VUE_APP_SERVER_URL;
  

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  if(imageUrl !=null){
    accountService.changeProfilePic(imageUrl.value).then((res)=>{
      accountService.retrieveAccount();
  open.value = false;     
 }).catch(err=>{

 })
  }
 
  
};
const handelSetUrl=(data)=>{
 
  imageUrl.value = data
 
}
const removeUrl=()=>{
  imageUrl.value = null
  
}


  return{
  store,
  showModal,
  open,
  handleOk,
  handelSetUrl,
  imageUrl,
  removeUrl,
  baseUrl
  }
 }
};
</script>
