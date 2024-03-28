<template>
  <div class="bg-custom_gray-800 w-80 rounded-lg  ">
    <div class="w-full flex flex-col bg-transparent">
      <RouterLink :class="`w-full bg-white h-14 mb-3 flex items-center justify-start pl-3 ${this.$route.path =='/settings/personal-detail'?'text-custom_green-100':''}`" :to="{ name: 'PersonalDetail' }">
        <ProfileOutlined  class="mr-3" />
        <span>Personal details</span>
      </RouterLink>


      <a-dropdown>
        <button class="w-full bg-white h-14 mb-3 flex items-center justify-start pl-3" >
        <UnorderedListOutlined class="mr-3" />
        <span> Business details</span>
        </button>
          
    <template #overlay>
      <a-menu>
        
        <a-menu-item  >
          <RouterLink  :to="{ name: 'CompanyDetail' }" class="mr-4 w-full bg-white h-8 mb-3 flex items-center justify-between pl-3">
            <MacCommandOutlined />
             <span >Company</span>
            
        </RouterLink>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>



      
    
      <RouterLink :class="`w-full bg-white h-14 mb-3 flex items-center justify-start pl-3 ${this.$route.path =='/settings/change-email'?'text-custom_green-100':''}`" :to="{ name: 'ChangeEmail' }">
        <NotificationOutlined  class="mr-3" />
        <span> Change email</span>
      </RouterLink>
      <RouterLink :class="`w-full bg-white h-14 mb-3 flex items-center justify-start pl-3 ${this.$route.path =='/settings/change-phone-number'?'text-custom_green-100':''}`" :to="{ name: 'ChangePhoneNumber' }">
        <UserAddOutlined  class="mr-3" /> 
        <span> Change Phone Number</span>
      </RouterLink>


      <RouterLink :class="`w-full bg-white h-14 mb-3 flex items-center justify-start pl-3 ${this.$route.path =='/settings/change-password'?'text-custom_green-100':''}`" :to="{ name: 'ChangePassword' }">
        <WechatOutlined class="mr-3"/>
        <span>Change password</span>
      </RouterLink>
      
      <!-- <RouterLink :class="`w-full bg-white h-14 mb-3 flex items-center justify-start pl-3 ${this.$route.path =='/setting/feedback'?'text-custom_green-100':''}`" :to="{ name: 'Feedback' }">
        <WechatOutlined class="mr-3"/>
        <span>Delete my account permanently</span>
      </RouterLink> -->

      <button :class="`w-full bg-white h-14 mb-3 flex items-center justify-start pl-3 `" @click="logout" >
        <WechatOutlined class="mr-3"/>
        <span>Log out</span>
      </button>
      
      
    </div>
    <a-modal v-model:open="open" title="Add Profile Picture" @ok="handleOk">
      <ProfilePicUpload  @set-url="handelSetUrl" @remove-url="removeUrl"/>
    </a-modal>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import {SettingOutlined, WechatOutlined,UnorderedListOutlined,
  MoneyCollectOutlined,InfoCircleOutlined,BarChartOutlined ,
  NotificationOutlined ,UserAddOutlined,ProfileOutlined, MacCommandOutlined   } from '@ant-design/icons-vue'
import store from "@/store";
import accountService from "@/views/account/account.service";
import { useStore } from "vuex";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: "S_SideBar",
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
    ProfileOutlined,
    MacCommandOutlined

  },
 setup(){
  const store = useStore()
  const open = ref(false);
  const imageUrl = ref(null)
 
  const baseUrl = process.env.VUE_APP_SERVER_URL;
  const router = useRouter();
  

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

const logout =()=>{
      localStorage.removeItem('authenticationToken');
    sessionStorage.removeItem('authenticationToken')
      store.commit('user/logout');
        router.push("/")
    }


  return{
  store,
  showModal,
  open,
  handleOk,
  handelSetUrl,
  imageUrl,
  removeUrl,
  baseUrl,
  logout
  }
 }
};
</script>
