<template>
    <div class="flex flex-col w-full">
        <div class="hidden sm:block md:flex flex-col p-5">
          <div class="flex items-center justify-between"><label class="font-bold text-2xl">ETB {{ post.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}}</label>
              <div v-if="post.isAvailable">
                    <a-button type="secondary" class=" text-green-500 w-40 font-bold border-2 border-green-500 ">{{ $t('post_detail.available') }}</a-button>
                </div>
                <div v-if="!post.isAvailable">
                    <a-button type="secondary" class=" text-red-500 w-40 font-bold border-2 border-red-500 ">{{ $t('post_detail.unavailable') }}</a-button>
                </div>
            </div>

        </div>
        <div class="p-5 flex flex-col">
            <div class="flex flex-row">
                <div class="p-2">
                  <UserOutlined 
                  class="bg-custom_green-100 text-white justify-center items-center text-4xl p-3" 
                  v-if="post.user?.imageUrl==='' || post.user?.imageUrl===null || post.user?.imageUrl===undefined " />
    
                  <img :src="baseUrl + '/api/images/' + post.user?.imageUrl" alt="" 
      class="w-16 h-16 bg-white  mb-5 rounded-full cursor-pointer " @click="showModal" 
      v-if="post.user?.imageUrl!=='' && post.user?.imageUrl!==null && post.user?.imageUrl!==undefined " >
    
    
                </div>
                <div class="flex flex-col ml-5">
                   <div > <router-link :to="{ name: 'Dashboard', params: { userId: String(post.user?.id) } }"><span> {{ post.user?.firstName }}   {{ post.user?.lastName }}</span></router-link></div>
                   <div> <label class="text-gray-400 text-sm">  {{ $t('post_detail.replies_a_day') }}</Label></div>
                   <div>
                    <UserOutlined /> <span class="text-gray-400 text-sm">{{initUserTime(post.user?.createdDate)}}  on Connection</span></div>

                </div>

            </div>
            <div class="p-3 mt-5">
                <div class="mt-3"><a-button type="secondary" class=" text-white  font-bold border-2 bg-custom_green-100 w-full" @click="changeShowContact">{{$t('post_detail.show_contact')  }}</a-button></div>
                <div v-if="showContact" class="flex flex-col p-5 bg-white shadow-md">
                     
                      <div v-if="post.user?.phone"><span><PhoneOutlined /> {{ post.user?.phone }}</span></div>
                      <div><span><MailOutlined /> {{ post.user?.email }}</span></div>
                      <div><p class="text-sm text-gray-400">✅ Inform the seller you got their number on Megenagna so they know where you came from</p></div>
            </div>


            </div>
            <div class="p-3">
                <div class="" v-if="!isShowChat"><a-button type="secondary"  
                  class="font-bold text-custom_green-100 border-2
                   border-custom_green-100 flex items-center justify-center
                    hover:bg-custom_green-100 hover:text-white  w-full" 
                    @click = "showChat(true)"><MessageOutlined class="" />{{ $t('post_detail.start_chat') }}</a-button></div>
                 <div class="relative" v-if="isShowChat">
                    <div class="flex items-center justify-between">
                        <p>{{ $t('post_detail.your_message') }}</p>
                    <CloseOutlined class="hover:scale-150 cursor-pointer text-sm" @click = "showChat(false)" />
                    </div>
                    <div class="w-full">
                        <textarea type="text" 
                        class="h-32 px-4 rounded-lg py-2 my-2 w-full border-2
                         border-custom_green-100  outline-none"
                         v-model="message"
                         > </textarea>
                    </div>
                    <div class="w-full ">
                        <a-button type="secondary" 
                        class="font-bold flex items-center justify-center text-custom_green-100 border-2
                         border-custom_green-100 hover:bg-custom_green-100
                          hover:text-white  w-full " :disabled="message===''"
                          @click="sendMessage"><MessageOutlined class="" />{{ $t('post_detail.start_chat') }}</a-button>
              
                    </div>
                    <a-space   class="absolute top-1/2 left-1/2" v-if="loading" >
    <a-spin size="large" />
  </a-space>
                 </div>
            </div>
          

        </div>
        <div class="flex flex-col p-5">
            <div class=""><span class="font-bold text-xl">{{ $t('post_detail.safety_tips') }}</span></div>
            <div class="flex flex-col">
                <div class="p-1"><span>. {{ $t('post_detail.safety_tips_1') }}</span></div>
                <div  class="p-1"><span>.{{ $t('post_detail.safety_tips_2') }}</span></div>
                <div  class="p-1"><span>. {{ $t('post_detail.safety_tips_3') }}</span></div>
                <div  class="p-1"><span>. {{ $t('post_detail.safety_tips_4') }}</span></div>

            </div>
                
        </div>
        <!-- <div>
            <div class="flex  xl:flex justify-evenly flex-row p-5">
                <div>
                    <a-button type="secondary" class=" text-blue-300 w-40 font-bold border-2 border-blue-300 ">{{ $t('post_detail.mark_unavailable') }}</a-button>
                </div>
                <div>
                    <a-button type="secondary" 
                    class=" text-red-300 w-40 font-bold border-2 border-red-300 ">{{ $t('post_detail.report_abuse') }}</a-button>
                </div>

            </div>
        </div> -->
        <div class="p-5 xl:p-20">
            <RouterLink :to="{name:'PostAd'}" >       <a-button type="secondary" class=" text-custom_green-100 w-60 xl:w-60 h-14 text-xl font-bold border-2 border-custom_green-100 hover:bg-custom_green-100 hover:text-white">{{ $t('post_detail.post_add_like')}}</a-button></RouterLink>
        </div>
    </div>
</template>

<script>
import { ref,onMounted,watch } from 'vue';
import { UserOutlined, MessageOutlined, CloseOutlined,MailOutlined,PhoneOutlined} from '@ant-design/icons-vue';
import MessageService from '../../views/messages/message.service'
import { useStore } from "vuex";
import { RouterLink } from 'vue-router';

export default {
  components: {
    UserOutlined,
    MessageOutlined,
    CloseOutlined,
    MailOutlined,
    PhoneOutlined,
    RouterLink,
   
},
  props: {
    post: {},
    postDetail:{},
  },
  setup(props) {
    const showContact = ref(false);
    let isShowChat = ref(false);
    let message = ref('');
    const loading = ref(false)
    const unique =ref({});
    const baseUrl = process.env.VUE_APP_SERVER_URL;
    const store = useStore();
    const changeShowContact = () => {
      showContact.value = !showContact.value;
    };
 
  

    watch(
  () => props.post,
  (newPost, oldPost) => {
    if (newPost) {
      // Data is available, make the API call
      MessageService.getMessageUsesID(newPost.user?.id, newPost.id)
        .then(res => {
          unique.value = res.data;
        })
        .catch(err => {
          // Handle errors
        });
    }
  }
);

    const sendMessage=()=>{
      const messages={
        content:message.value,
        post:props.post,
        receiver:props.post.user,
        messageId:unique.value.messageId
      }
loading.value = true
       MessageService.sendMessage(messages).then(res=>{
         message.value ='';
         isShowChat.value = false;
         loading.value = false
       }).catch(err=>{
         loading.value = false
       })
    }

    const initUserTime = (time) => {
      const givenDate = new Date(time);
      const currentDate = new Date();
      const timeDifference = currentDate - givenDate;

      const years = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
      const months = Math.floor((timeDifference % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
      const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      const hours = Math.floor(timeDifference / (60 * 60 * 1000));

      let result;
      if (years > 0) {
        result = `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''} ${days} day${days > 1 ? 's' : ''}`;
      } else if (months > 0) {
        result = `${months} month${months > 1 ? 's' : ''} ${days} day${days > 1 ? 's' : ''}`;
      } else if (days > 0) {
        result = `${days} day${days > 1 ? 's' : ''}`;
      } else {
        result = `${hours} hour${hours > 1 ? 's' : ''}`;
      }
      

      return result;
    };
    const showChat = (isShow)=>{
    isShowChat.value = isShow;
    }

    return {
      showContact,
      changeShowContact,
      initUserTime,
      MessageOutlined,
      CloseOutlined,
      isShowChat,
      showChat,
      message,
      sendMessage,
      loading,
      baseUrl,
      store,
    
    };
  },
};
</script>

