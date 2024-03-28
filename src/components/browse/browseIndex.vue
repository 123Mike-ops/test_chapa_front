<template>
  <div class="flex  flex-col ">
    <div class="hidden sm:block md:flex justify-center p-3" style="height: 60px;">
<!-- 
      <a-input-search v-model:value="searchValue" :placeholder="$t('browser.searchInput')" :enter-button="$t('common.search')"
        size="large" @search="onSearch" class="text-xl w-2/3" /> -->
        <a-input-search
        v-model:value="searchValue"
        :placeholder="$t('browser.searchInput')"
        class="w-2/3"
      size="large"
      @search="onSearch"
    />

      

    </div>
    <div class="hidden md:flex flex-row xl:flex w-full ml-5 ">
      <div>    <RouterLink :to="{ name: 'Aboutus' }"><img src="../../assets/banner2.jpg" /></RouterLink></div>
      <RouterLink :to="{ name: 'PostAd' }"
        class="flex flex-col p-5 border-2 ml-2 bg-gradient-to-l  font-bold bg-gradient-to-r from-custom_yellow-100 to-gray-100 ">
        <div class="flex justify-center w-full"> <span>{{ $t('browser.banner-top') }}</span></div>
        <div class=" flex justify-center ">
          <PlusCircleOutlined class="text-6xl" />
        </div>
        <div class=" flex justify-center mt-2 w-full"><span>{{ $t('browser.banner-bottom') }}</span></div>

      </RouterLink>

    </div>
    <div v-if="loadingR" class="flex justify-center mt-10">
      <a-space class="self-center">
        <a-spin size="large" />
      </a-space>
    </div>
    <div v-if="notFounded" class="flex justify-center  mt-10">
      <label>Search Not Found!</label>
    </div>
    <div v-if="results.length > 0">
      <a-divider orientation="left">{{ $t('browser.results') }}</a-divider>
      <div class="flex flex-wrap p-2">
        <div class="md:flex " v-for="(post, index) in results" :key="index">
          <router-link :to="{ name: 'PostDetail', params: { postId: post.id } }">
            <div class="w-80 xl:w-56  p-3">
              <a-card hoverable class="h-60">
                <template #cover>
                  <img alt="example" class="h-40 max-w-fit" :src="baseUrl + '/api/images/' + post.imageUrls[0]?.name"
                    v-if="post.imageUrls.length > 0" />
                </template>
                <span class="">{{ truncateText(post.title, 2) }}</span>
                <span class="text-custom_green-100 font-bold">ETB {{ post.price }}</span>

              </a-card>
            </div>
          </router-link>
        </div>
      </div>



    </div>
    <!-- <div class="flex flex-wrap p-5 max-w-5xl"> -->
    <div class="w-full">
      <div class=" overflow-hidden w-full md:hidden">
        <a-divider orientation="center">{{ $t('browser.divider') }}</a-divider>
      </div>

      <div class="hidden sm:block overflow-hidden w-3/4">
        <a-divider orientation="left">{{ $t('browser.divider') }}</a-divider>
      </div>

      <div class="overflow-hidden">
 
          <NewPosts />
       
      
      </div>


      <div class="md:hidden w-full">
        <a-divider orientation="center">{{ $t('browser.mostTrending') }}</a-divider>
      </div>
      <div class="hidden sm:block w-3/4">
        <a-divider orientation="left">{{ $t('browser.mostTrending') }}</a-divider>
      </div>
      <div class="overflow-hidden">
        <TrendPosts />
      </div>
    </div>

  </div>
</template>
<style scoped>
.max-w-screen-md {
  max-width: 868px;
  /* Adjust the max-width as needed */
  width: 100%;
}

@media screen and (max-width: 640px) {
  .max-w-screen-md {
    max-width: 100%;
    /* Adjust for small screens */
  }
}


::v-deep .ant-spin .ant-spin-dot-item {
  background-color: rgb(249, 172, 24) !important;
}
</style>
<script>
import { RouterLink } from 'vue-router';
import { ref,watch } from 'vue';
import API from '../../views/setting/post.service';
import { FilterField } from '../../modal/filter.model';
import { PlusCircleOutlined } from "@ant-design/icons-vue";
import NewPosts from './newPosts.vue';
import TrendPosts from './trendPosts.vue';

export default {
  components: {
    RouterLink,
    PlusCircleOutlined,
    NewPosts,
    TrendPosts
  },
  props: {
    searchValueMobile: {
      type: String,
      default: ''
    },
  },
  setup() {
    const baseUrl = process.env.VUE_APP_SERVER_URL;
    const filterField = new FilterField();
    const posts = ref([]);

    const searchValue = ref('');
    const results = ref([]);
    let loading = ref(false);
    let notFounded = ref(false);
    let loadingR = ref(false);


    let currentPage = ref(1);
    let pageSize = ref(4);
  



    let pageIndex = ref(0);
  







    const onSearch = (searchValue) => {
      loadingR.value = true;
      notFounded.value = false;
      console.log('use value', searchValue);
      console.log('or use this.value', searchValue);
      filterField.search = searchValue;
   
      if (searchValue != '') {
        API.filterProductPost(filterField)
          .then((res) => {
            results.value = res.data;
            loadingR.value = false;
            if (res.data.length == 0) {
              notFounded.value = true;
            } else {
              notFounded.value = false
            }

            console.log('data', res.data);
          })
          .catch((err) => {
            loadingR.value = false;
            console.log(err);
          });
      } else {
        results.value = [];
        loadingR.value= false;
      }
    };




    const truncateText = (text, limit) => {
      const words = text.split(' ');
      const truncatedWords = [];

      for (let word of words) {
        if (word.length <= 6) {
          truncatedWords.push(word);
          if (truncatedWords.length === limit) {
            break;
          }
        }
      }

      if (truncatedWords.length < words.length) {
        return truncatedWords.join(' ') + '...';
      }

      return text;
    };






    return {
      baseUrl,
      posts,
      searchValue,
      results,
      pageIndex,
      truncateText,
      onSearch,
      loadingR,
      notFounded,

      currentPage,
      pageSize,
      loading
    };
  },
};
</script>

