<template>
  <div class="container flex bg-white flex-col">
    <div
      class="w-full flex justify-between items-center h-16 px-5 py-2 shadow-md mb-4 "
    >
      <div class="text-2xl">{{ $t("profile.my-save") }}</div>
      <div class="flex items-center justify-between">
        <button
          :class="`mr-2 px-3 py-2 hover:bg-custom_green-100 rounded-lg ${
            selected == 1 ? 'bg-custom_green-100' : ''
          }`"
          key="1"
        >
          adverts ({{ savePosts.length }})
        </button>
        <!-- <button :class="`mr-2 px-3 py-2 hover:bg-custom_green-100 rounded-lg ${selected==2?'bg-custom_green-100':''}`" key="2"  @click="changeKey(2)">searches (0)</button> -->
      </div>
    </div>
    <div
      class="bg-white rounded-sm bottom-4 mt-4 border-black mx-6 relative flex flex-col sm:flex-row items-start shadow-md hover:shadow-2xl py-3 sm:py-0"
      v-for="savePost in savePosts"
      :key="savePost.id"
      @mouseover="showElement(savePost.id)"
    >
      <RouterLink
        :to="{ name: 'PostDetail', params: { postId: savePost.post.id } }"
        class="w-full flex flex-col sm:flex-row items-start shadow-md hover:shadow-2xl py-3 sm:py-0"
      >
        <div class="relative">
          <img
            :src="baseUrl + '/api/images/' + savePost.post.imageUrls[0].name"
            alt=""
            class="w-80 sm:h-36 sm:w-52"
          />
          <span
            class="absolute bottom-0 left-2 text-white font-bold flex items-center"
          >
            <CameraOutlined class="mr-2" />{{
              savePost.post.imageUrls.length
            }}</span
          >
        </div>
        <div class="ml-5">
          <h2 class="text-lg sm:text-xl text-custom_green-100 mb-6">
            {{ savePost.post.title }}
          </h2>
          <div class="flex items-center mb-6 text-black">
            <span class="font-bold">{{savePost.post.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} birr</span>
            <span>{{
              savePost.post.isNegotiable == 1 ? " | Negotiable" : ""
            }}</span>
          </div>
          <div class="flex items-center">
            <span
              >{{ savePost.post.city.region.name }},
              {{ savePost.post.city.name }}</span
            >
          </div>
        </div>
      </RouterLink>
      <CloseOutlined
        class="absolute top-2 right-2 text-gray-400 hover:scale-110 z-[100000]"
        @click="confirm(savePost.id)"
      />
    </div>
    <a-space class="self-center" v-if="loading">
      <a-spin size="large" />
    </a-space>
  </div>
</template>
v
<script>
import mySaveService from "./my-save.service";
import { FilterField } from "../../../modal/filter.model";
import { onMounted, ref } from "vue";
import { Modal } from "ant-design-vue";
import { CameraOutlined, CloseOutlined } from "@ant-design/icons-vue";
export default {
  name: "MySavePage",
  components: {
    CameraOutlined,
    CloseOutlined,
  },

  setup() {
    let selected = ref(1);
    let baseUrl = ref(process.env.VUE_APP_SERVER_URL);
    let filterField = new FilterField();
    let savePosts = ref([]);
    let loading = ref(false);
    let isHovered = ref(null);
    const scrollContainer = ref(null);
    let lastScrollTop = 0;
    let hasMore = ref(true);

    // Your component logic here
    function changeKey(key) {
      selected.value = key;
    }
    function showElement(id) {
      isHovered.value = id;
    }
    function hideElement() {
      isHovered.value = null;
    }
    function removeFromSave(id) {
      console.log("id", id);
      mySaveService
        .removeFromSave(id)
        .then((res) => {
          savePosts.value=[]
          getMySavedPost();
        })
        .catch((err) => {});
    }
    function getMySavedPost() {
      loading.value = true;
      mySaveService
        .getMySavedPost(filterField)
        .then((res) => {
          if(res.data.length<=0){
            hasMore.value = false;
          }
          savePosts.value = [...savePosts.value, ...res.data];
          loading.value = false;
        })
        .catch((err) => {
          loading = false;
        });
    }

    function loadMore() {
      const scrollContainer = document.documentElement;
      const currentScrollTop = scrollContainer.scrollTop;

      // Check if the user has scrolled to the bottom
      if (
        currentScrollTop > lastScrollTop &&
        currentScrollTop + window.innerHeight >=
          scrollContainer.scrollHeight - 500 &&
        hasMore.value &&
        !loading.value
      ) {
        filterField.page = filterField.page + 1;
        // Load more data when the user scrolls to the bottom
        getMySavedPost(filterField);
      }

      lastScrollTop = currentScrollTop;
    }

    const confirm = (id) => {
      Modal.confirm({
        title: "Confirm",

        content: "Are You sure you want delete this post form wishlist ",
        okText: "Ok",
        cancelText: "Cancle",
        onOk: () => removeFromSave(id),
      });
    };
    onMounted(() => {
      getMySavedPost();

      window.addEventListener("scroll", loadMore);
    });

   
    return {
      selected,
      changeKey,
      loading,
      savePosts,
      baseUrl,
      hideElement,
      showElement,
      isHovered,
      removeFromSave,
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

::v-deep .ant-spin .ant-spin-dot-item {
  background-color: rgb(249, 172, 24) !important;
}
</style>
