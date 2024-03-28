<!--
 * @Descripttion: 
 * @version: 
 * @Author: Agua Man
 * @Date: 2023-11-14 00:03:28
 * @LastEditors: Agua Man
 * @LastEditTime: 2023-11-14 23:42:13
-->
<template>

 <div>
  <div class="bg-gray-10 h-full flex flex-col">
    <div class="border-solid border-b-2 p-4 flex items-center justify-between">
      <h6 class="text-md font-bold font-extravagant text-custom_green-100">
        My Messages: Archive
      </h6>
      <a-dropdown
        placement="bottomLeft"
        :open="dropdownVisible"
        @open-change="handleDropdownVisibleChange"
      >
        <template #overlay>
          <a-menu :style="{ width: '150px' }" @click="handleMenuClick">
            <a-menu-item key="1">Archive</a-menu-item>
            <a-menu-item key="2">Spam</a-menu-item>
            <a-menu-item key="3">Add Archive</a-menu-item>
          </a-menu>
        </template>

        <MenuOutlined :style="{ fontSize: '18px' }" @click="toggleDropdown" />
      </a-dropdown>
    </div>
    <img
      class="max-h-40 sm:max-h-60 mt-20 overflow-hidden max-w-full"
      src="../../assets/img/message/messenger-man.svg"
      v-if="usersMessage.length <= 0"
    />
    <div v-if="usersMessage.length > 0" class="h-full overflow-y-scroll">
      <div class="p-2" v-for="user in usersMessage ">
        <div class="flex items-center justify-between relative cursor-pointer"
         @click="getMessages(user.sender.id===store.state.user.userData.id?user.receiver.id:user.sender.id,user.post.id,user.messageId)">
          <div class="flex items-center justify-start">
            <div class="w-14 h-14 bg-custom_green-100 flex items-center justify-center rounded-full mr-3">
              <UserOutlined class="text-3xl "/>
            </div>
           
            <div class="flex flex-col">

               <h3 class="font-serif text-sm" v-if="user.sender.id==store.state.user.userData.id">{{user.receiver.login}}</h3>
               <h3 class="font-serif text-sm" v-if="user.sender.id!=store.state.user.userData.id">
                {{user.sender.login}}</h3>
                <h3 class="font-semibold font-serif">{{user.post.title}}</h3>
                <p class="font-serif text-sm">{{user.content}}</p>
            </div>
          </div>
          <div class="text-xs justify-self-end text-custom_gray-300 absolute top-1 right-2">
           {{formatDateTime(user.createdTime)}}
          </div>
        </div>
      </div>
    </div>
  </div>
   
 </div>
  

</template>

<script>
import { onMounted, ref, watch } from "vue";
import messageService from "../../views/messages/message.service";
import { MenuOutlined, UserOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";

export default {
  name: "NavBar",
  props: ["showDrawer","getMessages"],
  components: {
    MenuOutlined,
    UserOutlined,
  },

  setup() {
    const usersMessage = ref([]);
    const store = useStore()
    const page = ref(0)
    const dropdownVisible = ref(false);
   const formatDateTime=(timestamp)=> {
      const options = {
   
        day: 'numeric',
        month: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
       
        hour12: true,
       
      };


      
      // Parse the timestamp and format it
      const formattedDateTime = new Date(timestamp).toLocaleString('en-US', options);
      
      return formattedDateTime;
    }

    const toggleDropdown = () => {
      dropdownVisible.value = !dropdownVisible.value;
    };

    const handleDropdownVisibleChange = (visible) => {
      dropdownVisible.value = visible;
    };
    onMounted(() => {
      messageService
        .getUserMessages(page.value)
        .then((res) => {
          console.log(res.data);
          usersMessage.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return {
      usersMessage,
      formatDateTime,
      store,
      dropdownVisible,
      toggleDropdown,
      handleDropdownVisibleChange,
      
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

