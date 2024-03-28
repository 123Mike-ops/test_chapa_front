<template>
  <div class="container mx-auto  flex flex-row">
    <div class="hidden xl:flex m-auto mt-10">


      <CategoryDropDown />

      <Browse />

    </div>
    <div class="flex flex-col w-full mt-1 xl:hidden">
      <div class="flex justify-center p-3 md:hidden" style="height: 60px;">

        <a-input-search v-model:value="searchValue" :placeholder="$t('browser.searchInput')" class="w-full" size="large"
          @search="onSearch" />



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
      <div v-if="searchValue==''">
      <MobileCategoryindex />
    </div>
      <Browse />
    </div>



  </div>
</template>
<style scoped>
::v-deep .ant-spin .ant-spin-dot-item {
  background-color: rgb(249, 172, 24) !important;
}
</style>

<script>

import Browse from '../../components/browse/browseIndex.vue';
import MobileCategoryindex from '../../components/mobileCategoryNav/mobileCategoryindex.vue';
import CategoryDropDown from '../../components/categoryDropDown';
import { ref } from 'vue';
import { FilterField } from '../../modal/filter.model';
import API from '../../views/setting/post.service';


export default {
  name: 'HomeIndex',
  components: {
    Browse,
    CategoryDropDown,
    MobileCategoryindex,
  },
  setup() {

    const baseUrl = process.env.VUE_APP_SERVER_URL;
    const filterField = new FilterField();


    const searchValue = ref('');
    const results = ref([]);
   
    let notFounded = ref(false);
    let loadingR = ref(false);


    // let currentPage = ref(1);
    // let pageSize = ref(4);




    // let pageIndex = ref(0);

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
        loadingR.value = false;
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
      onSearch,
       baseUrl,
       searchValue,
       results,
       truncateText,
       notFounded,
       loadingR,
       filterField

    };
  },

};
</script>
