<template>
  <div class="h-screen flex flex-col items-center">
    <div class="w-full mt-4 shadow-lg flex relative" style="height: 80%">
      <div
        class="left-0  top-0 w-full lg:w-96 lg:min-w-96 flex flex-col bg-white"
        style="box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      >
        <listUserWithLastMessage :getMessages="getMessages"  />
      </div>
      <div class="bg-gray-100 w-full lg:w-3/4 relative">
        <div
          class="w-full relative bg-white flex items-center justify-between border-solid border-b-2 px-4 py-2"
          v-if="messages.length > 0"
        >
          <div
            class="w-10 h-10 bg-custom_green-100 flex items-center justify-center rounded-full mr-3"
          >
            <UserOutlined />
          </div>
          <div>
            <h3
              class="font-serif text-3xl font-medium"
              v-if="messages[0].sender.id == store.state.user.userData.id"
            >
              {{ messages[0].receiver.login }}
            </h3>
            <h3
              class="font-serif text-3xl font-medium"
              v-if="messages[0].sender.id != store.state.user.userData.id"
            >
              {{ messages[0].sender.login }}
            </h3>
          </div>
          <div class="flex items-center">
            <FlagOutlined
              class="text-custom_green-100 mr-1 text-xl cursor-pointer"
            />
            <MoreOutlined
              class="text-custom_green-100 text-xl cursor-pointer"
            />
          </div>
        </div>

        <div
          class="w-full relative bg-white flex items-center justify-between b px-4 py-1"
          v-if="messages.length > 0"
        >
          <RouterLink
            :to="{
              name: 'PostDetail',
              params: { postId: messages[0].post.id },
            }"
            class="cursor-pointer flex items-center"
          >
            <a-carousel
              autoplay
              class="w-14 bg-custom_green-100 rounded-lg mr-2"
            >
              <img
                :src="baseUrl + '/api/images/' + post.name"
                v-for="post in posts?.imageUrls"
                class="h-12 rounded-lg"
              />
            </a-carousel>
            <div>
              <h3>{{ messages[0].post.title }}</h3>
              <p class="text-custom_green-100">ETB {{ messages[0].post.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</p>
            </div>
          </RouterLink>
          <div>
            <button
              class="font-bold flex items-center justify-center text-custom_green-100 border-2 border-custom_green-100 hover:bg-custom_green-100 px-3 py-1 rounded-lg hover:text-white"
              @click="showContact"
              v-if="!showCon"
            >
              Show Contact
            </button>
            <p v-if="showCon" class="text-custom_green-100">
              {{ messages[0].post.user.phone }}
            </p>
          </div>
        </div>
        <a-space class="absolute top-1/2 left-1/2" v-if="loading">
          <a-spin size="large" />
        </a-space>
        <div
          class="absolute bottom-3 w-full z-0 h-3/4 flex flex-col justify-end"
          v-if="messages.length > 0"
        >
          <div class="px-4 overflow-y-scroll h-full  mb-2" ref="scrollContainer">
            <div v-for="message in messages" class="px-4 flex flex-col">
              <div
                class="w-96 bg-custom_green-200 py-2 relative px-4 mt-2 flex items-center self-end justify-between rounded-lg"
                v-if="message.sender.id == store.state.user.userData.id"
              >
                <span class="">{{ message.content }}</span>

                <span
                  class="text-xs justify-self-end text-custom_gray-300 absolute bottom-1 right-2"
                  >{{ formatDateTime(message.createdTime) }}</span
                >
              </div>
              <div
                class="bg-white w-96 py-2 px-4 mt-2 flex items-center relative self-start justify-between rounded-lg"
                v-if="message.sender.id != store.state.user.userData.id"
              >
                <span class="">{{ message.content }}</span>

                <span
                  class="text-xs justify-self-end text-custom_gray-300 absolute bottom-1 right-2"
                  >{{ formatDateTime(message.createdTime) }}</span
                >
              </div>
            </div>
          </div>
          <div class="w-full px-3 sticky bottom-0 flex items-center">
            <textarea
              type="text"
              class="h-12 px-4 rounded-tl-lg rounded-bl-lg py-2 w-full border-2 border-custom_green-100 outline-none"
              v-model="content"
            >
            </textarea>
            <div
              class="w-16 bg-custom_green-100 text-white h-12 rounded-tr-lg rounded-br-lg py-2 ml-[-20px] border-2 border-custom_green-100 flex items-center justify-center"
              @click="sendMessage"
              :disabled="content === '' || !sendLoading"
            >
              <SendOutlined class="text-3xl" />
            </div>
          </div>
        </div>

        <div
          class="flex h-full items-center justify-center flex-col relative overflow-hidden"
          v-if="messages.length <= 0 && !loading"
        >
          <div class="flex justify-center items-center">
            <div class="h-full flex items-center justify-center flex-col">
              <div class="h-lh-em-1_8 text-center">
                <div>You have no messages yet.</div>
                <div><a>Find things</a> to discuss or sell something</div>
              </div>

              <div class="h-text-center h-mt-15">
                <!-- <Button class="w-20 bg-custom_yellow-100 hover:outline-none hover:bg-secondary">POST AD</Button> -->
                <RouterLink :to="{ name: 'PostAd' }">
                  <a-button
                    class="bg-custom_green-100 text-black"
                    type="primary"
                    size="Large"
                    >POST AD</a-button
                  ></RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  MenuOutlined,
  UserOutlined,
  FlagOutlined,
  MoreOutlined,
  SendOutlined,
} from "@ant-design/icons-vue";

import { Dropdown, Menu, message } from "ant-design-vue";
import { io } from "socket.io-client";
import { onMounted,nextTick,ref,watch } from "vue";
import messageService from "./message.service";
import listUserWithLastMessage from "../../components/messages/listUserWithLastMessage";
import { useStore } from "vuex";
import postService from "../setting/post.service";


export default {
  name: "MessagesPage",
  components: {
    MenuOutlined,
    "a-dropdown": Dropdown,
    "a-menu": Menu,
    "a-menu-item": Menu.Item,
    listUserWithLastMessage,
    UserOutlined,
    FlagOutlined,
    MoreOutlined,
    SendOutlined,
  },
  setup() {
    
    const messages = ref([]);
    const store = useStore();
    const page = ref(0);
    const content = ref("");
    const messageContainer = ref(null);
    const posts = ref(null);
    const baseUrl = process.env.VUE_APP_SERVER_URL;
    const showCon = ref(false);
    const loading = ref(false);
    const receiverId = ref(null);
    const sendLoading = ref(false);
    const postId = ref(null);
    const messageId = ref(null);
    const scrollContainer = ref(null);

    /*
const wsServer = "https://localhost:8080/"; 
const wsEndpoint = "/websocket/tracker";

// Access token 
const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOIiwiZXhwIjoxNzA1MTUyNzEwfQ.eR7NU6dwJQ_AJcTPG69_yXDsbb9Myz__1HyGBWRphfp9sJWk7itRU-FcxFDu8ppHCcYJDW4BXr4b4kVQYd-Pog&t=1702645984271";  

// Create Socket.IO instance 
const socket = io(wsServer, {

  transports: ["websocket"],

  path: wsEndpoint ,

  autoConnect: false,

  auth: {
    token: accessToken
  },

  rejectUnauthorized: true

});

// Handle events
socket.on("connect", () => {
  console.log("Connected!");
});

socket.on("connect_error", (err) => {
  console.log("Connection error: ", err);  
});

// Connect 
socket.connect(); 
*/

   

    const handleMenuClick = (info) => {
      console.log("Clicked on menu item", info);
      // Add any additional handling logic here
    };
    const getMessages = (id, pId,mId) => {
      messages.value = [];
      loading.value = true;
      receiverId.value = id;
      postId.value = pId;
      messageId.value = mId

      messageService
        .getMessage(id, pId, page.value)
        .then((res) => {
          messages.value = [...res.data.reverse(), ...messages.value];
          getPosts(res.data[0].post.id);
        nextTick(scrollToBottom());
          loading.value = false;
        })
        .catch((err) => {
          loading.value = false;
          console.log(err);
        });
    };

    

    const getPosts = (id) => {
      postService
        .getProductPost(id)
        .then((res) => {
          posts.value = res.data;
        })
        .catch((err) => {});
    };
    
    onMounted(() => {
     nextTick(scrollToBottom())
    });

    const sendMessage = () => {
      let receiver =
        store.state.user.userData.id === messages.value[0].sender.id
          ? messages.value[0].receiver
          : messages.value[0].sender;
      const data = {
        content: content.value,
        post: posts.value,
        receiver: receiver,
        messageId:messageId.value
      };
      sendLoading.value = true;
      messageService
        .sendMessage(data)
        .then((res) => {
          content.value = "";
          sendLoading.value = false;
          getMessages(receiverId.value, postId.value,messageId.value);
        })
        .catch((err) => {
          sendLoading.value = false;
        });
    };

    const formatDateTime = (timestamp) => {
      const options = {
        day: "numeric",
        month: "numeric",
        hour: "numeric",
        minute: "numeric",

        hour12: true,
      };

      // Parse the timestamp and format it
      const formattedDateTime = new Date(timestamp).toLocaleString(
        "en-US",
        options
      );

      return formattedDateTime;
    };
    const showContact = () => {
      console.log(showCon.value);
      showCon.value = true;
    };
   

    const scrollToBottom = () => {
 console.log("value",scrollContainer.value)
      nextTick(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
        }
      });
  
} 

return {
    
      
      handleMenuClick,
      messages,
      store,
      getMessages,
      content,
      messageContainer,
      formatDateTime,
      baseUrl,
      posts,
      showContact,
      showCon,
      loading,
      sendLoading,
      sendMessage,
      scrollContainer,
      
    };
  },
};
</script>
<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: rgb(249, 172, 24);
  border: 0px none rgb(249, 172, 24);
  border-radius: 0px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgb(249, 172, 24);
}
::-webkit-scrollbar-thumb:active {
  background: rgb(249, 172, 24);
}
::-webkit-scrollbar-track {
  background: transparent;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: transparent;
}
::-webkit-scrollbar-track:active {
  background: transparent;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
::v-deep .ant-spin .ant-spin-dot-item {
  background-color: rgb(249, 172, 24) !important;
}
</style>
