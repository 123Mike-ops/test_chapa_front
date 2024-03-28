<template>
    <div class="container  mt-10 flex flex-col h-full items-center lg:items-start lg:flex-row lg:mx-auto ">
       <ProfileSidebar class="mr-4 mb-6 lg:mb-0"/>
       <router-view></router-view>
       <!-- <button class="chat-box p-12 bg-custom_green-100 rounded-full h-16 w-16 "><MessageFilled  class="text-white text-3xl"/><label class="text-white">Support</label></button> -->
     <SupportComponent class="chatContainer"/>
    </div>
  </template>
  <style>
  .container {
    position: relative;
  }
  
  .chatContainer {
    position: fixed;
    bottom: 5%;
    right: 3%;
 
  
  }
  </style>
  <script>
import ProfileSidebar from '../../components/profile/profile-sidebar.vue';

import SupportComponent from '../../components/SupportContact/SupportComponent.vue';

  export default {
    name: 'HomeIndex',
  components: {
    ProfileSidebar,

    SupportComponent
  },
  setup(){

    return{

    }
  }
  };
  </script>