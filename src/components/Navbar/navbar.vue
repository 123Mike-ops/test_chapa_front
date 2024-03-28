<!--
 * @Descripttion: 
 * @version: 
 * @Author: Agua Man
 * @Date: 2023-11-14 00:03:28
 * @LastEditors: Agua Man
 * @LastEditTime: 2023-11-14 23:42:13
-->
<template>
  <div
    id="header-sticky"
    class="sticky h-20 overflow-hidden top-0 z-50 bg-custom_green-100 shadow-md flex items-center w-full justify-between"
  >
    
      <div class="mx-2 sm:mx-10 w-full flex justify-between items-center md:px-6">
        <RouterLink :to="{name:'Home'}"  class=" h-16 flex items-center justify-center">
        <img src="../../assets/img/logo.png" alt=""  class="h-16">
       
    
         
        </RouterLink>
        <!---->
        <!---->
        <div class="flex  items-center justify-between">
          <!-- <div class="mr-3 w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center  sm:hidden" @click="showDrawer" ><MenuOutlined class="text-2xl mb-2 text-custom_black-100"/></div> -->
          
          
            <RouterLink :to="{name:'Advert'}" class="mr-7 w-10 h-10 rounded-full bg-white  items-center justify-center  hidden sm:flex">
              <img src="../../assets/notification.png" alt="" class="w-6 h-6">
            </RouterLink>
            
            <RouterLink :to="{name:'Messages'}" class="mr-7 w-10 h-10 rounded-full bg-white  items-center justify-center  hidden sm:flex"> <WechatOutlined class="text-2xl text-custom_black-100 flex items-center justify-center"/></RouterLink>
             <a-dropdown>
              <RouterLink :to="{name:'Advert'}" class="mr-7 w-10 h-10 rounded-full bg-white  items-center justify-center  hidden sm:flex">
                <UserOutlined 
                class="text-2xl text-custom_black-100 flex items-center justify-center"
                v-if="store.state.user?.userData?.imageUrl==='' || store.state.user?.userData?.imageUrl===null || store.state.user?.userData?.imageUrl===undefined " /> 
      <img :src="baseUrl + '/api/images/' + store.state.user?.userData?.imageUrl" alt="" 
      class="w-full h-full bg-white   rounded-full cursor-pointer " @click="showModal" 
      v-if="store.state.user?.userData?.imageUrl!=='' && store.state.user?.userData?.imageUrl!==null && store.state.user?.userData?.imageUrl!==undefined " >
      

              </RouterLink>
          
    <template #overlay>
      <a-menu>
        <a-menu-item v-if="!store.state.user.authenticated">
          <RouterLink :to="{name:'Login'}"  >Login</RouterLink>
            
         
        </a-menu-item>
        <a-menu-item v-if="store.state.user.authenticated" >

          <RouterLink  :to="{ name: 'PersonalDetail' }" >
             <span class="mr-4"> {{ $t('profile.setting') }}</span>
            
        </RouterLink>

        </a-menu-item>
        <a-menu-item  v-if="store.state.user.authenticated">
          <button  @click="logout">Logout</button>
            
        </a-menu-item>
        <a-menu-item>
          <RouterLink :to="{name:'Register'}" v-if="!store.state.user.authenticated">Signup</RouterLink>
            
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
            <RouterLink :to="{name:'PostAd'}" > <Button class="w-20 bg-custom_yellow-100 hover:outline-none hover:bg-secondary">  {{ $t('navbar.button') }}</Button></RouterLink>
              <a-select ref="select" style="width: 120px; padding-left: 20px;" v-model:value="locale">
          <a-select-option v-for="(locale, index) in locales" :key="index" :value="locale.value"
            @click="onClick(locale.value)">
            {{locale.label}}
          </a-select-option>
        </a-select>
            <!-- <RouterLink :to="{name:'Messages'}" class="mr-7 w-12 h-12 rounded-full bg-gray-300  items-center justify-center  hidden sm:flex"> <span class="text-sm text-blue-400"><WechatOutlined class="text-2xl text-white"/></span></RouterLink> -->
            <!-- <RouterLink :to="{name:'PostAd'}" ><Button class="w-20 bg-custom_yellow-100 hover:outline-none hover:bg-secondary">Sell</Button></RouterLink> -->
        </div>

        
       
      </div>
      <!---->
    </div>
</template>


<script>
import { ref, watch, getCurrentInstance,onMounted,computed } from 'vue';
import { Button } from 'ant-design-vue';
import { WechatOutlined, NotificationOutlined, UserOutlined, SaveOutlined, MenuOutlined } from '@ant-design/icons-vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { mapActions } from 'vuex';
import reportService from '@/views/setting/report.service';

export default {
  name: 'NavBar',
  props: ['showDrawer'],
  components: {
    Button,
    WechatOutlined,
    SaveOutlined,
    NotificationOutlined,
    UserOutlined,
    MenuOutlined,
    RouterLink,
  },

  setup() {
    const instance = getCurrentInstance();
    const locale = ref(instance.appContext.config.globalProperties.$i18n.locale);
    const locales = [
      { value: 'Amharic', label: 'አማርኛ' },
      { value: 'en', label: 'English' },
      { value: 'zh-CN', label: 'Chinese Simplified' },
      { value: 'zh-TW', label: 'Chinese Traditional' },
    ];
   

    const onClick = (key) => {
     
      locale.value = key;
    };
    const store = useStore();
    const router = useRouter();
    const baseUrl = process.env.VUE_APP_SERVER_URL;
   

    const logout =()=>{
      localStorage.removeItem('authenticationToken');
    sessionStorage.removeItem('authenticationToken')
      store.commit('user/logout');
        router.push("/")
    }

    watch(locale, (val) => {
      instance.appContext.config.globalProperties.$i18n.locale = val;
    });
  

    onMounted(async () => {
      try {
        await store.dispatch('category/fetchCategoryCount');
       
      } catch (error) {
       
      }
    });
    
  
    

    return {
      locale,
      locales,
      onClick,
      store,
      logout,
      baseUrl
    };
  },
};
</script>