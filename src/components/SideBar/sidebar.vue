<!--
 * @Descripttion: 
 * @version: 
 * @Author: Agua Man
 * @Date: 2023-11-14 00:03:28
 * @LastEditors: Agua Man
 * @LastEditTime: 2023-11-14 22:28:18
-->
<template>
  <a-drawer :open="open" @update:open="updateOpen" class="relative bg" root-class-name="root-class-name"
    style="display: flex;width:300px;" placement="left" @after-open-change="afterOpenChange" @close="showDrawer">
    <template #extra>
      <a-space class="text-secondary font-bold">
        <h2 class="text-xl">Online Shopping</h2>
      </a-space>
    </template>
    <div class="flex flex-col items-start w-full p-3">
      <RouterLink :to="{ name: 'Advert' }" @click="showDrawer">

        <div class="flex  flex-row justify-between w-32">
          <div class="p-2">
            <label>Notifications</label>
          </div>
          <div class="flex justify-end">
            <img src="../../assets/notification.png" alt="" class="w-6 h-6">
          </div>

          
        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'Messages' }" @click="showDrawer">
        <div class="flex flex-row justify-between w-32">
          <div class="p-2">
            <label>Messages</label>
          </div>
          <div class="flex justify-end">
            <WechatOutlined class=" text-custom_black-100  " style="font-size: 32px;" />
          </div>
        
        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'Advert' }" @click="showDrawer">
        <div class="flex flex-row justify-between w-32 ">
          <div class="p-2">
            <label>Dashboard</label>
          </div>
          <div class="flex justify-end">
            <UserOutlined class="  text-custom_black-100 " style="font-size: 32px;" />
          </div>
        
        </div>
      </RouterLink>
    </div>
    <div class="flex flex-col p-5 items-center">
     <RouterLink v-if="!store.state.user.authenticated"  class="font-bold p-2 text-xl w-full flex justify-center  bg-secondary text-white rounded-lg" :to="{name:'Login'}"  @click="showDrawer"  >Login</RouterLink>
      <div class="mt-3" v-if="!store.state.user.authenticated">Or</div>
       <RouterLink v-if="!store.state.user.authenticated"  class="font-bold p-2 text-xl w-full flex justify-center rounded-lg border-2" :to="{name:'Register'}" @click="showDrawer" >Signup</RouterLink>
       <button v-if="store.state.user.authenticated" class="font-bold p-2 text-xl w-full flex justify-center rounded-lg border-2" @click="showDrawer(); logout()">Logout</button>

    </div>
    
    
            
         

         
   
     
            
       
 
  </a-drawer>
</template>
<style scoped>
</style>
<script>
//  import Address from "../Address/AddressComponent.vue" 
import { UserOutlined, WechatOutlined } from '@ant-design/icons-vue';
import { ref, watch, getCurrentInstance } from 'vue';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: "NavBar",
  props: [
    'open', 'showDrawer'
  ],
  components: {
    UserOutlined,
    WechatOutlined
  },
  setup() {
    const instance = getCurrentInstance();
    const locale = ref(instance.appContext.config.globalProperties.$i18n.locale);
    const locales = [
      { value: 'Amharic', label: 'Amharic' },
      { value: 'en', label: 'English' },
      { value: 'zh-CN', label: 'Chinese Simplified' },
      { value: 'zh-TW', label: 'Chinese Traditional' },
    ];

    const onClick = (key) => {
      console.log(`Click on item `, key);
      locale.value = key;
    };
    const store = useStore();
    const router = useRouter();

    const logout =()=>{
      localStorage.removeItem('authenticationToken');
    sessionStorage.removeItem('authenticationToken')
      store.commit('user/logout');
      if(router.currentRoute.value.path !=="/"){
        router.push("/")
      }
    }

    const updateOpen=()=>{

    }

    const afterOpenChange =()=>{

    }

    watch(locale, (val) => {
      instance.appContext.config.globalProperties.$i18n.locale = val;
    });

    return {
      locale,
      locales,
      onClick,
      store,
      logout,
      updateOpen,
      afterOpenChange
    };
  },
};
</script>
  
  