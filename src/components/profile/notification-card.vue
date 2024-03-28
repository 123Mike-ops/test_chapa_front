<template>
    <div>
    <RouterLink to="/" @mouseover="showElement" @mouseout="hideElement" class="bg-white rounded-sm bottom-4 mt-4
     border-black  mx-6 relative flex items-center justify-between shadow-md hover:shadow-2xl sm:px-5  ">
        <div class="flex items-center justify-between ">
          <img :src="notification.img" alt="" class="h-16 w-16 mr-1 sm:mr-3">
          <div class="flex flex-col ">
             <h2>{{ notification.title }}</h2>
             <span class="text-sm text-custom_gray-300">{{ notification.create_time }}</span>
          </div>
        </div>
        <div>
            <a-dropdown placement="left">
    <a class="ant-dropdown-link" @click.prevent>
     
      <MoreOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item class="w-28">
          <a href="javascript:;">Mark as read</a>
        </a-menu-item>
       
      </a-menu>
    </template>
</a-dropdown>
        </div>
    </RouterLink>
</div>
  </template>
  
  <script>
  import { RouterLink } from "vue-router";
  import {MoreOutlined} from '@ant-design/icons-vue'
  

   export default {
    props:['notification'],
    name: "NotificationCard",
    components: {
      RouterLink,
      MoreOutlined 
       
    },
    data() {
    return {
      isHovered: false,
    };
  },
    methods: {
    showElement() {
      this.isHovered = true;
    },
    hideElement() {
      this.isHovered = false;
    },
  },
  };
  </script>
  