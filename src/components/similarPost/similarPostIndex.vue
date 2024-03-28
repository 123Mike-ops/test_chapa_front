<template>
  <div class="flex flex-wrap xl:ml-10 p-5 max-w-5xl">



    <a-divider orientation="left">{{ $t('post_detail.similar_ads') }}</a-divider>


    <div v-for="(post, index) in posts" :key="index" @click="navigateToPostDetail(post.id)" class="overflow-hidden">
      <div class="w-80 sm:overflow-hidden xl:w-56 p-3 overflow-hidden">
        <a-card hoverable class="h-60 overflow-hidden">
          <template #cover>
            <img alt="example" class="h-40 max-w-fit" :src="baseUrl + '/api/images/' + post.imageUrls[0]?.name" />
          </template>
          <div  class="flex flex-col overflow-hidden">
            <span class="">{{ truncateText(post.title, 2) }}</span>
          
            <span class="text-custom_green-100 font-bold">ETB{{ post.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}}</span>
          </div>

        </a-card>
      </div>
    </div>







  </div>
</template>
<style scoped>

::v-deep .ant-card-body {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  min-height: 20vh;
  max-height: 20vh;
  overflow: hidden;
  padding-right: -5px !important;
}
</style>
<script>

import API from "../../views/setting/post.service";
import { FilterField } from "@/modal/filter.model";


export default {
  props: ['subCategoryId'],
  components: {
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_SERVER_URL,
      filterField: new FilterField(),
      posts: [],


    }
  },
  mounted() {
    this.filterField.subCategory = this.subCategoryId;
    API.filterProductPost(this.filterField).then((res) => {
      this.posts = res.data;
      console.log("data", res.data)
    }).catch(err => {
      console.log(err)

    })
  },
  methods: {
    truncateText (text, limit) {
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
    },
    navigateToPostDetail(postId) {
      this.scrollToTop();
      this.$router.push({ name: 'PostDetail', params: { postId } });
    },
    scrollToTop() {
      // Using JavaScript scroll method
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: Add smooth scrolling animation
      });

      // Using Vue.js $refs
      // Uncomment the line below if you have a main scrollable element with a ref attribute
      // this.$refs.mainScroll.scrollTop = 0;
    }

  }
}
</script>