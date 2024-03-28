<template>
  <div>
      <div class="bg-custom_gray-800 rounded-lg w-full">
        
          <div class="w-full flex flex-col items-center justify-center bg-custom_yellow-100 border-b-2 border-custom_gray-100 pb-5 pt-3">
            <img src="https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_1280.png" alt="" 
            class="w-24 h-24 bg-white p-3 mb-5 rounded-full cursor-pointer " @click="showModal" >
            
            <h2 class="text-2xl text-white"> {{ user?.firstName }} {{ user?.lastName }}</h2>
          </div>
          <div class="w-full flex flex-col bg-transparent">
            

          </div>
          <a-modal v-model:open="open" title="Add Profile Picture" @ok="handleOk">
            <ProfilePicUpload  @set-url="handelSetUrl" @remove-url="removeUrl"/>
          </a-modal>
        </div>


        <div class="pb-5 p-2 w-full bg-white rounded-md">
            <div class="mt-3"><a-button type="secondary" class=" text-white  font-bold border-2 bg-custom_green-100 w-full" @click="changeShowContact">{{$t('post_detail.show_contact')  }}</a-button></div>
            <div v-if="showContact" class="flex flex-col  bg-white shadow-md w-full p-2">
                  
                  <div v-if="user?.phone"><span><PhoneOutlined /> {{ user?.phone }}</span></div>
                  <div><span><MailOutlined /> {{ user?.email }}</span></div>
                  <div><p class="text-sm text-gray-400">✅ Inform the seller you got their number on Megenagna so they know where you came from</p></div>
            </div>
            <div class="mt-3"><router-link :to="`/user-feedback/${user?.id}`"><a-button type="secondary" class=" border-2 bg-white text-custom_green-800 border-custom_green-100 w-full" ><SmileOutlined class="smile-icon"  />Leave Feedback</a-button></router-link></div> 
        </div>

        <div class="bg-white pl-3 rounded-md mt-3">
            <h3 class="text-gray-400">ABOUT SELLER</h3>
            <p>Selling and delivering authentic products!</p>
        </div>

  <div v-if="store.state.user.authenticated && user?.id!==store.state.user.userData?.id && amIFollowing==false" class="flex flex-col bg-white w-full p-5 rounded-md mt-2">
        <div class="font-bold text-gray-500">Want to know when this seller posts new items ?</div>
        <a-button type="secondary" class=" text-white  font-bold border-2 bg-custom_green-100 w-full mt-3" @click="$emit('follow')"><UserOutlined class="user-icon" />Follow them</a-button>
        <div class="mt-2"><small>{{ followerCount }} Followers</small></div>
  </div>
  <div v-else-if="store.state.user.authenticated  && user?.id!==store.state.user.userData?.id && amIFollowing" class="flex flex-col bg-white w-full p-5 rounded-md mt-2">
        <div class="font-bold text-gray-500">You are following this Seller !</div>
        <a-button type="secondary" class=" text-white  font-bold border-2 bg-custom_green-100 w-full mt-3" @click="$emit('unFollow')"><UserOutlined class="user-icon" />Unfollow</a-button>
        <div class="mt-2"><small>{{ followerCount }} Followers</small></div>
      </div>
</div>

</template>
<style scoped>
.smile-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem; /* Adjust the margin as needed */
}
  
.user-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem; /* Adjust the margin as needed */
}
</style>
<script>
import { RouterLink } from "vue-router";
import {SettingOutlined, WechatOutlined,UnorderedListOutlined,
  MoneyCollectOutlined,InfoCircleOutlined,BarChartOutlined ,NotificationOutlined ,UserAddOutlined,SmileOutlined ,PhoneOutlined,MailOutlined,UserOutlined  } from '@ant-design/icons-vue'
import store from "@/store";
import ProfilePicUpload from '../../../components/profile/profile-pic-upload'
import accountService from "@/views/account/account.service";
import { useRoute } from 'vue-router';
import { useStore } from "vuex";
import { ref,getCurrentInstance,onMounted } from 'vue';
import followerService from '../follower/followers.service.js';


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
    SmileOutlined,
    ProfilePicUpload ,
    PhoneOutlined,
    MailOutlined,
    UserOutlined
  },
  props: {
    post: {},
    postDetail:{},
    user:{},
    followerCount: {
    type: Number,
    default: 0
  },
    amIFollowing: {
    type: Boolean,
    default: false
  }
  },
 setup(props){
  const store = useStore()
  const open = ref(false);
  const imageUrl = ref(null)
  const showContact = ref(false);
  const route = useRoute();


  const baseUrl = process.env.VUE_APP_SERVER_URL;
  const changeShowContact = () => {
      showContact.value = !showContact.value;
    };
  

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
  changeShowContact,
  showContact,
  removeUrl,
  baseUrl,
  }
 }
};
</script>