<template>
    <div class="flex flex-col relative">
      <div class="mb-2 flex justify-start ">
      <button @click="goBack" class="fixed left-1 top-20 flex justify-center items-center bg-transparent text-white font-bold text-xl rounded-full h-10 w-10 px-3 z-50 ">
        <LeftOutlined />
      </button>
      </div>
      <!-- <button @click="goBack" class="absolute left-0 top-0 flex items-center bg-gray-50 rounded-md px-4 py-2 z-10">
        <a-icon type="left" class="mr-1" />
        
      </button> -->
        <div class="xl:flex flex-row">
            <div class="w-full xl:w-2/3 bg-white"><PostDetail :post="post" :postDetail="postDetail" /></div>
            <div class="w-full  xl:w-1/3 bg-white xl:ml-2"><PostContactInfo :post="post" :postDetail="postDetail" /></div>

        </div>
        <div class=" w-full bg-white xl:w-2/3 mt-2" v-if="post.id!=null">
            <SimilarPostIndex :subCategoryId="post.subCategory.id" />
            
        </div>

        <div v-if="loading" class=" sm:block md:flex justify-center ml-60 mt-10 absolute inset-0 flex items-center z-10">
          <a-space class="self-center">
            <a-spin size="large" />
          </a-space>
        </div>

    </div>
</template>
<style scoped>
::v-deep .ant-spin .ant-spin-dot-item {
  background-color: rgb(249, 172, 24) !important;
}
</style>
<script>
import PostDetail from '../../components/postDetail/postDetail.vue';
import PostContactInfo from '../../components/postDetail/postContactInfo.vue';
import SimilarPostIndex from '../../components/similarPost/similarPostIndex.vue';
import API from "../../views/setting/post.service";
import {LeftOutlined} from "@ant-design/icons-vue";


export default {
  beforeRouteUpdate(to, from, next) {
    if (to.params.postId !== from.params.postId) {
      this.loading=true;
      // The route parameters are different, update the component
      // You can perform any necessary logic here, such as fetching data based on the new postId
        API.getProductPost(to.params.postId).then( res =>{
     this.post=res.data;
     next();
     console.log("data",this.posts);
    }).catch( err =>{
      console.error(err)
      next(false);
    })
    API.getProductPostField(to.params.postId).then(res =>{
      this.postDetail=res.data;
      this.loading=false;
      next();
      console.log("dataDetail",this.postDetail);
    }).catch( err =>{
      console.error(err)
      next(false);
    })
    const post={
      id:to.params.postId
    }
    API.viewProductPost(post).then(res=>{
      console.log("viewed",to.params.postId,res.data)
      next();
    }).catch( err =>{
      console.error(err)
      next(false);
    })
    } else {
      // The route parameters are the same, don't perform any update
      next(false);
    }
  },
  components: {
    PostDetail,
    PostContactInfo,
    SimilarPostIndex,
    LeftOutlined
   

    // You can use any name you prefer for the component
  },
  data(){
    return{
      post:{},
      postDetail:{},
      loading:false,

    }
  },
  mounted(){
    this.loading=true;
    const postId = this.$route.params.postId;
    API.getProductPost(postId).then( res =>{
    
     this.post=res.data;
     console.log("datass",this.post.user.id);

    }).catch( err =>{
      console.log(err)
    })
    API.getProductPostField(postId).then(res =>{
      this.postDetail=res.data;
      this.loading=false;
      console.log("dataDetail",this.postDetail);
    }).catch( err =>{
      console.log(err)
    })
    const post={
      id:postId
    }
    API.viewProductPost(post).then(res=>{
      console.log("viewed",postId,res.data)
    }).catch( err =>{
      console.log(err)
    })

  },
  methods:{
    goBack(){
      window.history.back();// Navigate to the previous route
    }
  }
}
</script>
