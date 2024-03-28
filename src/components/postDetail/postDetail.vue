<template>
  <div class="flex flex-col">
    <div>
      
      <div class="flex  flex-col" v-viewer>
        <div class="flex items-center justify-center w-full">
          <img 
         class="cursor-pointer  "
         :src="baseUrl+'/api/images/' + (post?.imageUrls?.length > 0 ? post?.imageUrls[0].name : '')"  
         @click="showModal()" />
        </div>
        
       <div class="flex flex-row mr-2 mt-4 max-h-32 overflow-hidden">
          <div v-for="(src,index) in post.imageUrls" :key="index" >
          <img v-if="index > 0" class="w-32 mr-3 cursor-pointer"
          :src="baseUrl+'/api/images/' + src.name"  @click="showModal()" />
          
        </div>
       </div>
        
     
    </div>
    </div>
    <div class="p-5">
      <div class="flex justify-between flex-row">
        <div>
          <label class="font-bold text-2xl text-gray-600">{{
            post.title
          }}</label>
        </div>
        <div>
          <component :is="savePost === null ? 'TagOutlined' : 'TagFilled'" class="text-xl text-custom_green-100"
           @click="getMySavedPost({ post: post })" />
        
        </div>
      </div>
      <div class="flex flex-wrap xl:flex justify-between flex-row p-3">
        <div class="flex flex-row">
          <div><ClockCircleOutlined /></div>
          <div class="p-1">
            <span class="text-gray-400">{{
              formatCreateTime(post.createTime)
            }}</span>
          </div>
          <div class="ml-10 flex flex-row">
            <div><SketchOutlined /></div>
            <div class="p-1">
              <label class="text-gray-400"
                >{{ post.region?.name }}, {{ post.city?.name }}</label
              >
            </div>
          </div>
        </div>

        <div>
          <div class="flex flex-row "><div><EyeOutlined /></div><div class="p-1"><label class="text-gray-400">{{post.countViews }} {{$t('post_detail.views')}}</label></div> </div> 
        </div>
      </div>
    </div>
    <hr />
    <div class="flex items-center justify-between p-3 md:hidden"><label class="font-bold text-2xl">ETB {{ post.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}}</label>
      <div v-if="post.isAvailable">
            <a-button type="secondary" class=" text-green-500 w-40 font-bold border-2 border-green-500 ">{{ $t('post_detail.available') }}</a-button>
        </div>
        <div v-if="!post.isAvailable">
            <a-button type="secondary" class=" text-red-500 w-40 font-bold border-2 border-red-500 ">{{ $t('post_detail.unavailable') }}</a-button>
        </div>
    </div>
    <div class="sm:flex flex-wrap md:grid grid-cols-2 gap-2 p-3">
      <div
        v-for="detail in postDetail"
        :key="detail.field?.name"
        class="flex flex-col items-start p-2"
      >
        <div>
          <label class="">{{ detail.field?.name }}</label>
        </div>
        <div>
          <label class="text-gray-600 font-thin">{{ detail.value }}</label>
        </div>
      </div>
    </div>
    
    <hr />
   
    <hr />
    <div class="flex flex-col p-5">
      <div>
        <label class="font-light">{{ post.description }}</label>
      </div>
      <div class="xl:p-5">
        <a-button
          type="secondary"
          class="bg-custom_green-100 text-white w-60 font-bold"
          @click="changeShowContact"
          >{{ $t('post_detail.show_contact') }}</a-button>
      </div>
      <div v-if="showContact" class="flex flex-col p-5 bg-white shadow-md">
                     <div v-if="post.user?.phone"><span><PhoneOutlined /> {{ post.user?.phone }}</span></div>
                      <div><span><MailOutlined /> {{ post.user?.email }}</span></div>
                      <div><p class="text-sm text-gray-400">✅ Inform the seller you got their number on Megenagna so they know where you came from</p></div>
      </div>
    </div>
    <hr />
    <div class="flex justify-evenly flex-row p-5">
      <div v-if="post.user?.telegramLink" class="text-custom_green-100">
        <a :href="post.user?.telegramLink" class="text-custom_green-100"
          ><img src="../../assets/telegram.png" class="h-10 w-10"
        /></a>
      </div>
      <div v-if="post.user?.whatsappLink" class="">
        <a :href="post.user?.whatsappLink"
          ><WhatsAppOutlined class="text-4xl text-custom_green-100"
        /></a>
      </div>
      <div v-if="post.user?.facebookLink">
        <a :href="post.user?.facebookLink"
          ><FacebookOutlined class="text-4xl text-custom_green-100"
        /></a>
      </div>
      <div v-if="post.user?.instagramLink">
        <a :href="post.user?.instagramLink"
          ><InstagramOutlined class="text-4xl text-custom_green-100"
        /></a>
      </div>
    </div>
   
   </div>
</template>
<script>
import { defineComponent } from "vue";
import {
  TagOutlined,
  ClockCircleOutlined,
  SketchOutlined,
  EyeOutlined,
  InstagramOutlined,
  FacebookOutlined,
  WhatsAppOutlined,
  TagFilled ,
  PhoneOutlined,
  MailOutlined
} from "@ant-design/icons-vue";
import mySaveService from "@/views/profile/my-save/my-save.service";
import { onMounted,ref } from "vue";
import { useRoute } from 'vue-router';
import ImageView from "./imageView.vue";
export default defineComponent({
  components: {
    TagOutlined,
    ClockCircleOutlined,
    SketchOutlined,
    EyeOutlined,
    InstagramOutlined,
    FacebookOutlined,
    WhatsAppOutlined,
    TagFilled,
    PhoneOutlined,
    ImageView ,
    MailOutlined
  },
  props: {
    post: {},
    postDetail: {},
  },
  setup() {

    const open = ref(false);
    const baseUrl =process.env.VUE_APP_SERVER_URL;
    const route = useRoute();
    let savePost = ref(null)
      const  showContact = ref(false)
    function getMySavedPost(data){
      console.log("save post ", savePost)
     if(savePost.value==null){
    
      mySaveService.savePost(data).then(res=>{
           savePost.value = res.data
      
      }).catch(err=>{
        console.log(err)
         
      })
     }else{
      console.log("data ",savePost.value.id)
      mySaveService.removeFromSave(savePost.value.id).then(res=>{
        getByUserIdAndPostId()
          
      }).catch(err=>{
        console.log(err)
         
      })
     

    }
    }
    function getByUserIdAndPostId(){
      mySaveService.getByUserIdAndPostId(route.params.postId).then(res=>{
           savePost.value = res.data
      
          
      }).catch(err=>{
        console.log(err)
      })
    }

   

   function handleMouseOver(event) {
      event.target.style.transform = 'scale(1.5)';
    }
   function handleMouseLeave(event) {
      event.target.style.transform = 'scale(1)';
    }
    function formatCreateTime(timestamp) {
      const date = new Date(timestamp);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    }
   function changeShowContact() {
      showContact.value = !showContact.value;
    }
    
    onMounted(() => {
     
      getByUserIdAndPostId()
 
   });

   const showModal = () => {
        open.value = true;
      };
  
      const handleCancel = () => {
       
        open.value = false;
      };

    return {
      changeShowContact,
      formatCreateTime,
      handleMouseLeave,
      handleMouseOver,
      getMySavedPost,
      baseUrl,
      savePost,
      showContact,
      open,
      showModal,
      handleCancel
    };
  }
})
</script>
<style scoped>
/* For demo */
:deep(.slick-dots) {
  position: relative;
  height: auto;
}
:deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
:deep(.slick-arrow) {
  display: none !important;
}
:deep(.slick-thumb) {
  bottom: 0px;
}
:deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}
:deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  display: block;
}
:deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
