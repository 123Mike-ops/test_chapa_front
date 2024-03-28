<template>
    <div class="md:flex flex-row w-full">
        <div class="sm:w-full md:w-1/4"><SideBar :user="posts[0]?.user"  :followerCount="followerCount" :amIFollowing="amIFollowing"  @follow="follow" @unFollow="unFollow" /></div>
       
        <div class="flex flex-col md:pl-5 w-full mt-3 ">
            <div class="bg-white md:flex flex-row md:p-5 w-full">
                <button @click="refreshForm(filterField,'selector')" class="  md:border-2 p-5 rounded-lg">
                  <span>({{ countCat }})Ads</span><br />
                  <small>All Categories</small>
                </button>           
                <button  @click="filterByCategory(sellData.id)" v-for="sellData in sellerData" :key="sellData.id" class="p-2 md:border-2 rounded-lg ml-5 md:p-5 md:w-32 md:h-36 shadow-md overflow-hidden sm:w-24 sm:p-3" :class="{ 'bg-custom_green-100 text-white font-bold': selected === sellData.id }">
    
                    <img  src="https://static.thenounproject.com/png/101469-200.png" alt="" 
                    class="hidden md:block md:w-15 h-15 bg-white  rounded-full cursor-pointer "
                    v-if="sellData?.imgUrl==='' || sellData?.imgUrl===null || sellData?.imgUrl===undefined ">
                    <img :src="baseUrl + '/api/images/' + sellData?.imgUrl" alt="image" 
                    class="hidden md:block md:w-15 h-15 bg-white rounded-full cursor-pointer "
                      v-else-if="sellData?.imgUrl!=='' && sellData?.imgUrl!==null && sellData?.imgUrl!==undefined && isImageLoaded" @error="handleImageError">
                      <img :src="baseUrl + '/api/images/' + sellData?.imgUrl" alt="unable to load image" 
                    class="hidden md:block md:w-15 h-15 bg-white rounded-full cursor-pointer"
                      :v-else="isImageLoaded==false" @error="handleImageError">
           
                  <span class="text-sm ">{{truncateText(sellData.name,3) }}</span><br />
                    <span class=" text-sm"  :class="{ ' text-gray-500 font-bold': selected === sellData.id }">({{ sellData.count }}) Ads</span>
                </button>
                
              </div>
           
            <div class="w-full">
              <Content :posts="posts" :category="category" :loading="loading" @submit="submitForm" @refresh="refreshForm" @loadCat="loadCat" :user="posts[0]?.user" :followerCount="followerCount" :amIFollowing="amIFollowing" @follow="follow" @unFollow="unFollow"/>
            </div>
        </div>
      </div>
   
 
</template>
<script>
import { RouterLink } from "vue-router";
import SideBar from './sideBar.vue';
import Content from './content.vue';
import API from '../../setting/lookup.service';
import APIPost from '../../setting/post.service';
import APIReport from '../../setting/report.service';
import { reactive, ref, watch, onMounted, computed } from 'vue';
import { FilterField } from "@/modal/filter.model";
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import followerService from '../follower/followers.service.js'
import user from "@/store/modules/user";
export default {
  name: "ProfileSideBar",
  components: {
    SideBar,
    Content
  },
  setup() {
    const category = ref({});
    const subCategories = ref([]);
    const region = ref([]);
    const posts = ref([]);
    const loading = ref(false);
    const filterField = reactive(new FilterField());
    const route = useRoute();
    const store = useStore();
    const subCategoryCount = ref([]);
    const hasMore=ref(true);
    const sellerData=ref([]);
    const profileData=ref('');
    const followerCount=ref(0);
    const selected=ref('');
    const isImageLoaded=ref(true);
    const baseUrl = process.env.VUE_APP_SERVER_URL;
    const amIFollowing = ref(false);

 

    const updatePosts = (updatedPosts) => {
      posts.value = updatedPosts;
    };

    const submitForm = (fieldName, value) => {
      loading.value = true;
      filterField[fieldName] = value;

      console.log("Query data", filterField);
      filterField.page=0;
      APIPost.filterProductPost(filterField)
        .then((res) => {
          console.log("filterdddd", res.data);
          posts.value = res.data;
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    





 

    const truncateText= (text, limit) =>{
        const words = text.split(' ');
        const truncatedWords = [];
  
        for (let word of words) {
        
            truncatedWords.push(word);
            if (truncatedWords.length === limit) {
              break;
            }
          
        }
  
        if (truncatedWords.length < words.length) {
          return truncatedWords.join(' ') + '...';
        }
  
        return text;
      };

    
  
    const refreshForm = (filterField,comeFrom) => {
      loading.value = true;

      if (comeFrom === 'content') {
        filterField.sortBy = null;
        filterField.sortType = null;
      }else if(comeFrom === 'selector') {
        filterField.sortBy = null;
        filterField.sortType = null;
        filterField.category=null;
        filterField.userId=route.params.userId;
        selected.value=null;
      }

     
      filterField.page=0;
      APIPost.filterProductPost(filterField)
        .then((res) => {
          console.log("refreshed", res.data);
          posts.value = res.data;
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const goBack = () => {
      window.history.back(); // Navigate to the previous route
    };

   

const loadCat=()=>{
  if(hasMore.value && !loading.value){
    filterField.page = filterField.page + 1;

filterProductPost(filterField);
  }



}
const handleImageError=()=> {
     isImageLoaded.value = false;
      // Additional logic when the image fails to load
    }

  
    const filterByCategory=(catId)=>{
      loading.value=true;
      selected.value=catId;
      
      filterField.category=catId;
      filterField.page=0;
      hasMore.value=true;
      APIPost.filterProductPost(filterField)
        .then((res) => {
          if(res.data.length<=0){
            hasMore.value = false;
       
          }
          posts.value =res.data;
          loading.value=false;
        })
        .catch((err) => {
          console.log(err);
        });

    }
    const filterProductPost = (filterField) => {
      loading.value=true;
      APIPost.filterProductPost(filterField)
        .then((res) => {
          if(res.data.length<=0){
            hasMore.value = false;
       
          }
          posts.value = [...posts.value, ...res.data];
          loading.value=false;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const countCat = computed(() => {
      let result = 0;
      for (const sell of sellerData.value) {
        result += sell.count;
      }
      return result;
    });
   
    const checkFollowing = async () => {
      const follower = {
        user: { id: route.params.userId },
        follower: { id: store.state.user.userData?.id }
      };

      try {
        const res = await followerService.isFollowing(follower);
        amIFollowing.value = res.data;
      } catch (error) {
        console.log(error);
      }
    };


    const follow=async ()=>{
      const body={
    user:{id:route.params.userId},
    follower:{id:store.state.user.userData.id}
  }

  await followerService.follow(body).then(res=>{
    console.log(res.data);

  }).catch(err=>{
    console.log(err)
  })
  await checkFollowing();
  await getFollowerCount();
    }


    const unFollow= async ()=>{
      try{
      const body={
    user:{id:route.params.userId},
    follower:{id:store.state.user.userData.id}
  }

  await followerService.deleteFollowing(body).then(res=>{
    console.log(res.data);

  }).catch(err=>{
    console.log(err)
  })
  await checkFollowing();
  await getFollowerCount();
    }catch (err) {
        console.log(err);
      }
    }

    const getFollowerCount=()=>{
      const userId = route.params.userId;
      followerService.getFollowersCount(userId).then(
        (res)=>{
          followerCount.value=res.data;
          
        }
       ).catch((err)=>{
        console.log(err)
       })
    }

    onMounted(() => {
      

      const userId = route.params.userId;
      loading.value=true;

           APIReport.getSellerDataCount(userId).then((res)=>{
            sellerData.value=res.data;
           }).catch(err=>{console.log(err)})
        
          filterField.userId=route.params.userId;
          APIPost.filterProductPost(filterField)
        .then((res) => {
          console.log("filterdddd", res.data);
          posts.value = res.data;
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
       
        getFollowerCount();
       checkFollowing();
         
      });
     
          return {
      category,
      subCategories,
      region,
      posts,
      loading,
      unFollow,
      checkFollowing,
      filterField,
      amIFollowing,
      updatePosts,
      submitForm,
      refreshForm,
      goBack,
      loadCat,
      getFollowerCount,
      hasMore,
      filterProductPost,
      sellerData,
      profileData,
      countCat,
      filterByCategory,
      baseUrl,
      handleImageError,
      isImageLoaded,
      truncateText,
      selected,
      followerCount,
      follow
   
    };
  }

}
</script>