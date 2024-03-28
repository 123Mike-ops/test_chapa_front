
  <template>
   <div class="flex justify-around p-2 bg-gray-50">
      <div  class="clickable-icon">
        <RouterLink :to="{name:'Home'}" >
        <HomeOutlined class="text-secondary" style="font-size: 32px;" />
      </RouterLink>
      </div>
  
      <div class="clickable-icon hover-effect " @click="showDrawer">
        
          <UserOutlined style="font-size: 32px;" />
        
      </div>


   </div>
  </template>
  


  
  <script>
  import {UserOutlined ,HomeOutlined } from '@ant-design/icons-vue';
  export default {
    props: ['showDrawer'],
    components: {
      UserOutlined,
      HomeOutlined
    },
  
  };
  </script>
  <style scoped>
  .clickable-icon {
    cursor: pointer;
  }
  
  .hover-effect:hover {
    background-color: orange;
  }
  
  .hover-effect:active {
    background-color: orange;
  }
  
  .hover-effect:active svg {
    color: red;
  }
  </style>
  
  
  