<template>
  <div class="container flex bg-white flex-col">
    <div
      class="w-full flex justify-between items-center h-16 px-5 py-2 shadow-md mb-4"
      v-if="!isInvite"
    >
      <div class="text-lg sm:text-2xl">{{ $t("profile.my-follower") }}</div>
      <div class="flex items-center justify-between">
        <button
          :class="`mr-2 px-2 sm:px-3 py-2 hover:bg-custom_green-100 rounded-lg ${
            selected == 1 ? 'bg-custom_green-100' : ''
          }`"
          key="1"
          @click="changeKey(1)"
        >
          {{ $t("profile.my-follower") }}
        </button>
        <button
          :class="`mr-2 px-2 sm:px-3 py-2 hover:bg-custom_green-100 rounded-lg ${
            selected == 2 ? 'bg-custom_green-100' : ''
          }`"
          key="2"
          @click="changeKey(2)"
        >
          {{ $t("profile.following") }}
        </button>
      </div>
    </div>
    <div
      class="w-full py-3 sm:p-3 flex items-center justify-center sm:px-10"
      v-if="!isInvite"
    >
      <div class="flex flex-start flex-col w-full">
        <a-input-search
          v-model:value="username"
          placeholder="input search text"
          class="h-20 w-full"
          @search="onSearch"
        />
        <div
          class="flex items-center justify-start cursor-pointer"
          @click="onInviteLink"
        >
          <div
            class="w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-custom_green-100 flex items-center justify-center mr-3"
          >
            <SendOutlined class="text-white text-lg sm:text-2xl mb-2" />
          </div>
          <span class="text-lg sm:text-xl text-custom_green-100"
            >Invite your friends on online shop</span
          >
        </div>

        <div class="" v-if="selected == 1">
          <div
            class="w-full flex items-center justify-between mt-5"
            v-for="follower in followers"
            :key="follower.id"
          >
            <div class="flex items-center">
              <img
                src="https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_1280.png"
                alt=""
                class="w-12 h-12 bg-custom_yellow-100 mr-3 rounded-full"
              />

              <span class="text-xl">{{ follower.follower.login }}</span>
            </div>
          </div>
          <a-space
            class="w-full flex items-center justify-center mt-8"
            v-if="loading"
          >
            <a-spin size="large" />
          </a-space>
        </div>

        <div v-if="selected == 2">
          <div
            class="w-full flex items-center justify-between mt-5"
            v-for="follower in followers"
            :key="follower.id"
          >
            <div class="flex items-center">
              <img
                src="https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_1280.png"
                alt=""
                class="w-12 h-12 bg-custom_yellow-100 mr-3 rounded-full"
              />

              <span class="text-xl">{{ follower.user.login }}</span>
            </div>
            <button
              class="w-20 bg-custom_yellow-100 py-2 px-3 rounded-lg hover:bg-custom_green-100"
              @click="confirm(follower.id,follower.user.login)"
            >
              Unfollow
            </button>
          </div>

          <a-space
            class="w-full flex items-center justify-center mt-8"
            v-if="loading"
          >
            <a-spin size="large" />
          </a-space>
        </div>
      </div>
    </div>
    <!-- Invitation Link -->
    <div class="" v-if="isInvite">
      <div
        class="w-full flex justify-start items-center h-16 px-5 py-2 shadow-md mb-4"
      >
        <LeftOutlined class="text-2xl mr-4" @click="onInviteLink" />
        <h2 class="text-2xl">Invite your friends</h2>
      </div>
      <div class="px-2 sm:px-10 py-10">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <img
                src="../../../assets/whatsapp.png"
                alt=""
                class="w-10 h-10 mr-3"
              />
              WhatsApp
            </div>
            <a
              href="#"
              target="_blank"
              class="px-3 bg-custom_green-100 rounded-2xl"
            >
              <span class=""> Invite </span></a
            >
          </div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <img
                src="../../../assets/twitter.png"
                alt=""
                class="w-10 h-10 mr-3"
              />
              Twitter
            </div>
            <a
              href="#"
              target="_blank"
              class="px-3 bg-custom_green-100 rounded-2xl"
            >
              <span class=""> Invite </span></a
            >
          </div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <img
                src="../../../assets/facebook.png"
                alt=""
                class="w-10 h-10 mr-3"
              />
              Facebook
            </div>
            <a
              href="#"
              target="_blank"
              class="px-3 bg-custom_green-100 rounded-2xl"
            >
              <span class=""> Invite </span></a
            >
          </div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <img
                src="../../../assets/gmail.png"
                alt=""
                class="w-10 h-10 mr-3"
              />
              Gmail
            </div>
            <a
              href="#"
              target="_blank"
              class="px-3 bg-custom_green-100 rounded-2xl"
            >
              <span class=""> Invite </span></a
            >
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img
                src="../../../assets/telegram.png"
                alt=""
                class="w-10 h-10 mr-3"
              />
              Telegram
            </div>
            <a
              href="#"
              target="_blank"
              class="px-3 bg-custom_green-100 rounded-2xl"
            >
              <span class=""> Invite </span></a
            >
          </div>
        </div>
        <div class="fw-card-content-icon"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { SendOutlined, LeftOutlined } from "@ant-design/icons-vue";
import followersService from "./followers.service";
import { FilterField } from "@/modal/filter.model";
import { Modal } from "ant-design-vue";
export default {
  name: "FollowerPage",
  components: {
    SendOutlined,
    LeftOutlined,
  },
  setup() {
    const selected = ref(1);
    const isInvite = ref(false);

    let filterField = new FilterField();
    let followers = ref([]);
    const scrollContainer = ref(null);
    let lastScrollTop = 0;
    let hasMore = ref(true);
    let loading = ref(false);
    let username = ref("")
 

    // Your component logic here
    function changeKey(key) {
      followers.value = [];
      filterField.page = 0;
      selected.value = key;
      hasMore.value = true;
      username.value = ""
      if (selected.value == 1) {
        getFollowers(filterField);
      } else if (selected.value == 2) {
        getFollowing(filterField);
      }
    }
    function getFollowers(filter) {
      loading.value = true;
      followersService
        .getFollowers(filter.page,username.value)
        .then((res) => {
          if (res.data.length <= 0) {
            hasMore.value = false;
          }
          followers.value = [...followers.value, ...res.data];
          loading.value = false;
        })
        .catch((err) => {
          loading.value = false;
        });
    }
    function getFollowing(filter) {
      loading.value = true;
      followersService
        .getFollowing(filter.page,username.value)
        .then((res) => {
          if (res.data.length <= 0) {
            hasMore.value = false;
          }
          followers.value = [...followers.value, ...res.data];
          loading.value = false;
        })
        .catch((err) => {
          loading.value = false;
        });
    }

    function loadMore() {
      const scrollContainer = document.documentElement;
      const currentScrollTop = scrollContainer.scrollTop;

      // Check if the user has scrolled to the bottom
      if (
        currentScrollTop > lastScrollTop &&
        currentScrollTop + window.innerHeight >=
          scrollContainer.scrollHeight - 700 &&
        hasMore.value &&
        !loading.value
      ) {
        filterField.page = filterField.page + 1;
        // Load more data when the user scrolls to the bottom
        if (selected.value == 1) {
          getFollowers(filterField);
        } else if (selected.value == 2) {

          getFollowing(filterField);
        }
      }

      lastScrollTop = currentScrollTop;
    }
    onMounted(() => {
      getFollowers(filterField);

      window.addEventListener("scroll", loadMore);
    });

    const onSearch = () => {
      filterField.page = 0;
      hasMore.value = true
      if (selected.value == 1) {
        followers.value = []
        getFollowers(filterField,username.value);
      } else if (selected.value == 2) {
        followers.value = []
        getFollowing(filterField,username.value);
      }
    };

    const confirm = (id,username) => {
      Modal.confirm({
        title: "Confirm",

        content: `Are You sure you want unfollow ${username}`,
        okText: "Ok",
        cancelText: "Cancle",
        onOk: () => Unfollow(id),
      });
    };

    function Unfollow(id) {
      console.log("id", id);
      followersService
        .unfollow(id)
        .then((res) => {
          followers.value = followers.value.filter(data=>data.id!=id)
        
        })
        .catch((err) => {});
    }

    const onInviteLink = () => {
      isInvite.value = !isInvite.value;
    };

    return {
      selected,
      isInvite,
      changeKey,
      onSearch,
      onInviteLink,
      changeKey,
      followers,
      scrollContainer,
      loading,
      username,
      confirm
    };
  },
};
</script>
<style scoped>
.ant-tabs {
  width: 100%;
}

.ant-tabs-nav-wrap::before {
  height: 100px !important;
  padding: 10px 0;
}
::v-deep .ant-tabs-nav-wrap {
  padding: 8px 0px;
  width: 100% !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
::v-deep .ant-tabs-tab {
  margin-right: 3px !important;
  border: none !important;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
::v-deep .ant-tabs-tab-active {
  color: green;
  font-weight: bold;
}

::v-deep .ant-input-group {
  height: 50px;
}

::v-deep .ant-input-group .ant-input {
  height: 50px;
}

::v-deep .ant-input-search-button {
  height: 50px;
  width: 70px;
}

::v-deep .ant-spin .ant-spin-dot-item {
  background-color: rgb(249, 172, 24) !important;
}
</style>
