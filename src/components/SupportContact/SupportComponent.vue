<template>
    <div>
      <button class="chat-box p-12 bg-custom_green-100 rounded-full h-16 w-16 " @click="showDrawer"><MessageFilled  class="text-white text-3xl"/><label class="text-white">Support</label></button>
   
 
  <a-drawer
    title="Contact us For Support"
    :placement="placement"
    :closable="true"
    :open="open"
    @close="onClose"
    @afterVisibleChange="handleDrawerVisibleChange"
  >
  <div class="flex flex-col md:h-full">
    <div v-if="contact!=null" class="chatSection  overflow-y-auto max-h-72 " ref="chatSection">
            <div v-for="cot in contact" :key="cot.id"  :class="cot.replyBy ? 'mb-3 flex justify-start' : 'mb-3 flex justify-end' ">
              <div class="flex flex-col">
                <label :class="cot.replyBy ? 'border-2 rounded-lg p-2 ' : 'border-2 rounded-lg p-2 bg-custom_green-100 text-white'" class=" ">{{ cot.message }} </label>
                <small class="flex justify-end"> {{ formattedTime(cot.createdTime) }}</small>
              </div>
                
            </div>
       
           
          
    </div>
    <hr class="mt-3"/>

        <div class="mb-2">
        <small class="text-gray-500">Send us your feed back !</small>
        </div>
  

    <div class="">
    <a-textarea v-model:value="message" class="h-full"  :maxlength="100" />
    </div>
    <div class="flex flex-row mt-2 justify-end">
    <a-space>
      <a-button type="dashed" @click="sendMessage">Send</a-button>
    </a-space>
    </div>


  </div>
    
  </a-drawer>
    </div>
  </template>

<script setup>
import { watch,onMounted, ref,computed,nextTick} from 'vue';
import { MessageFilled  } from "@ant-design/icons-vue";
import { useRoute } from 'vue-router';
const placement = ref('right');
const chatSection = ref(null); 

import contactService from '@/views/setting/contact.service';
import { useStore } from 'vuex';

const message = ref('');
const open = ref(false);
const store = useStore();
const route = useRoute();
const contact=ref({});

const showDrawer =async () => {

  open.value = true;
};
const onClose = () => {
  open.value = false;
};
const handleDrawerVisibleChange = async (visible) => {
  if (visible) {
    await scrollToBottom();
  }
};
const sendMessage=async ()=>{

  if(message.value !=''){
    const contact = {
        sender: { id: store.state.user.userData.id },
        message:message.value
      };
    await contactService.sendMessage(contact).then(res=>{
      console.log(res.data);
      message.value=''
    }).catch(err=>console.log(err))

  }
  await checkMessages();

}

const scrollToBottom = () => {
  nextTick(() => {
    const chatSection = document.querySelector('.chatSection');
    if (chatSection) {
      chatSection.scrollTop = chatSection.scrollHeight;
    }
  });
};

watch(contact, () => {
  scrollToBottom();
});
const checkMessages= ()=>{

  contactService.findBySender(store.state.user.userData?.id).then((res)=>{
    contact.value=res.data;
  }).catch(err=>{console.log(err)})
 
}

onMounted(async() => {

  await checkMessages();
      });
    
    const formattedTime=computed(() =>{
      return (createdTime) => {
        const currentTime = new Date();
        const messageTime = new Date(createdTime);

        const timeDiff = currentTime - messageTime;
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

        if (hoursDiff >= 24) {
          return messageTime.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        } else {
          return messageTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
        }
      };
    },);
  
</script> 

  <style scoped>
    .chat-box {
   
    display: flex;
    flex-direction: column;
  align-items: center;
  justify-content: center;
  
  }
  .chatSection {
  max-height: 500px; /* Adjust the height as per your requirement */
}
 
.chatSection::-webkit-scrollbar {
  width: 0.5em;
  background-color: transparent;
}

.chatSection::-webkit-scrollbar-thumb {
  background-color: transparent;
}
    </style>