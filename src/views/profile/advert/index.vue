<template>
    <div class="container flex  bg-white flex-col" ref="scrollContainer">
      
    
  <div class="w-full flex justify-between items-center h-16  lg:px-5 py-2 shadow-md mb-4 ">
      <div class="text-2xl hidden md:block">{{ $t('profile.advert') }}</div>
      <div class="flex items-center justify-between ">
        <button :class="`mr-2 px-3  py-2 hover:bg-custom_green-100 rounded-lg ${selected==1?'bg-custom_green-100':''}`" 
        key="1" @click="changeKey(1)" >Active ({{ posts.length }})</button>
        <!-- <button :class="`mr-2 lg:px-3 py-2 text-[10px] lg:text-lg hover:bg-custom_green-100 rounded-lg ${selected==2?'bg-custom_green-100':''}`" key="2"  @click="changeKey(2)">Reviewing (0)</button> -->
        <!-- <button :class="`mr-2 lg:px-3 py-2 text-[10px] lg:text-lg hover:bg-custom_green-100 rounded-lg ${selected==3?'bg-custom_green-100':''}`" key="3"  @click="changeKey(3)">Declined (0)</button>
        <button :class="`mr-2 lg:px-3 py-2 text-[10px] lg:text-lg hover:bg-custom_green-100 rounded-lg ${selected==4?'bg-custom_green-100':''}`" key="4"  @click="changeKey(4)">Draft (0)</button>
        <button :class="`mr-2 lg:px-3 py-2 text-[10px] lg:text-lg hover:bg-custom_green-100 rounded-lg ${selected==5?'bg-custom_green-100':''}`" key="5"  @click="changeKey(5)">Close (0)</button>
        <button :class="`mr-2 lg:px-3 py-2 text-[10px] lg:text-lg hover:bg-custom_green-100 rounded-lg ${selected==6?'bg-custom_green-100':''}`" key="6"  @click="changeKey(6)">All ({{ adverts.length }})</button> -->
      </div>
  </div>
  <div v-if="selected==1"  class="flex flex-col " >
    <MyPostsCard v-for="advert in posts" :advert="advert" 
    :updateAvailablity="updateAvailablity" :key="advert.id"
    :updateHideUnHide="updateHideUnHide"/>
      
    <a-space   class='self-center ' v-if="loading" >
    <a-spin size="large" />
  </a-space>
  </div>
  <div v-if="selected==2">
   
    
    
  </div>
  <div v-if="selected==3">
    
    
    
  </div>
  <div v-if="selected==4">
    
    
     
  </div>
  <div v-if="selected==5">
    
    <!-- <MyPostsCard v-for="advert in adverts" :advert="advert" :key="advert.id"/> -->
    
  </div>
  <div v-if="selected==6">
    
    <!-- <MyPostsCard v-for="advert in adverts" :advert="advert" :key="advert.id"/> -->
    
  </div>
    </div>
  </template>
  v
  <script>

  import postService from '../../../views/setting/post.service';
  import MyPostsCard from '../../../components/profile/my-posts-list.vue'
  import { FilterField } from '../../../modal/filter.model'
  import { onMounted,ref } from 'vue';
  import {CameraOutlined,CloseOutlined} from '@ant-design/icons-vue'
  import visitorService from '../../setting/visitor.service';
    export default {
      
      name: 'MySavePage',
    components: {
     CameraOutlined,
     CloseOutlined,
     MyPostsCard
    },
    
    setup() {
      
      let selected = ref(1);
    
    let filterField = new FilterField();
    let posts = ref([]);
    const scrollContainer = ref(null)
    let lastScrollTop = 0;
    let hasMore = ref(true);
    let loading = ref(false);


   
      // Your component logic here
     function changeKey(key){
         selected.value = key;
      }
     function getMyProductPost(filter){
      loading.value = true;
       postService.myProductPost(filter).then(res=>{
        if(res.data.length<=0){
          hasMore.value = false;
        }
        posts.value =[...posts.value, ...res.data]
        loading.value = false;
       
       }).catch(err=>{
         loading.value = false;
       })
     }

  const updateAvailablity=(id)=>{
     posts.value = posts.value.filter((item)=>{
         if(item.id===id){
            if(item.isAvailable){
              item.isAvailable = false
            }else{
              item.isAvailable = true;
            }
         }
         return item;
    })
  }

  const updateHideUnHide=(id)=>{
     posts.value = posts.value.filter((item)=>{
         if(item.id===id){
            if(item.isHide){
              item.isHide = false
            }else{
              item.isHide = true;
            }
         }
         return item;
    })
  }

     function loadMore() {
      const scrollContainer = document.documentElement;
      const currentScrollTop = scrollContainer.scrollTop;

// Check if the user has scrolled to the bottom
if (currentScrollTop > lastScrollTop &&
        currentScrollTop + window.innerHeight >=
  scrollContainer.scrollHeight - 700 && hasMore.value && !loading.value
) {
  filterField.page = filterField.page + 1;
  // Load more data when the user scrolls to the bottom
  getMyProductPost(filterField);
}

lastScrollTop = currentScrollTop;

     
     }
      onMounted(() => {
        getMyProductPost(filterField)

        
      


      
      window.addEventListener('scroll', loadMore);
    
      });
  
      return {
      selected,
      changeKey,
      posts,
      scrollContainer,
      loading,
      updateAvailablity,
      updateHideUnHide
    };
    },
   
  
      
    
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
:deep(.ant-tabs-nav-wrap){
  padding: 8px 0px;
  width: 100% !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  
}
:deep(.ant-tabs-tab) {
 
  margin-right: 3px !important;
 border: none !important;
 box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

 
}
:deep(.ant-tabs-tab-active) {
  color: green;
  font-weight: bold;
}
:deep(.ant-spin .ant-spin-dot-item) {
  background-color: rgb(249, 172, 24) !important;
}




</style>