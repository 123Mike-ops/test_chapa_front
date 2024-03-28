<template>
    <div class="container  mt-10 flex flex-col h-full items-center lg:items-start lg:flex-row lg:mx-auto ">
       <SidebarForSetting class="mr-4 mb-6 lg:mb-0"/>
       <div class="flex items-center justify-center w-full">
          <router-view></router-view>
       </div>
      
   
    </div>
  </template>
  
  <script>
import SidebarForSetting from '../../components/setting/s-sidebar/index.vue';

  export default {
    name: 'HomeIndex',
  components: {
    SidebarForSetting
  },
  setup(){

    return{

    }
  }
  };
  </script>