
<template>
  <div class="relative md:flex p-2">
    <div v-if="loading" class="sm:ml-0 flex sm:justify-center items-center  md:flex justify-center md:ml-60 mt-10 h-full">
      <a-space class="self-center">
        <a-spin size="large" />
      </a-space>
    </div>
    <div class=" overflow-hidden sm:block md:hidden">
      <a-carousel arrows autoplay="autoplay" :after-change="handleAfterChange" >
        <!-- <template #prevArrow>
          <div class="custom-slick-arrow" v-if="currentPage != 1" style="left: 10px;"   @click="scrollLeftMobile">
            <left-circle-outlined />
          </div>
        </template> -->
        <template #nextArrow >
          <div class="custom-slick-arrow" v-if="currentPage <= (posts.length / pageSizeMobile) && !loading" style="right:10px" @click="scrollRightMobile">
            <right-circle-outlined />
          </div>
        </template>
       
        <div class=" relative overflow-hidden w-full"  v-for="(post, index) in posts" :key="index">
          <router-link :to="{ name: 'PostDetail', params: { postId: post.id } }">
            <!-- <div class="relative  w-full">

              <img alt="example" class="" :src="baseUrl + '/api/images/' + post.imageUrls[0]?.name"
                v-if="post.imageUrls.length > 0" />
              <div class="absolute bottom-0 left-0 right-0 top-0 z-1 flex flex-col justify-start p-2 bg-opacity-30 bg-gray-100 overflow-hidden w-full">
                <span class="flex justify-start font-normal font-mono text-gray-700  text-2xl mt-20 w-full ">{{ truncateText(post.title, 2) }}</span>


              </div>
            </div> -->
            <a-card hoverable class="h-72 bg-white">
              <template #cover>
                <img alt="example" class="h-52 max-w-fit" :src="baseUrl + '/api/images/' + post.imageUrls[0]?.name"
                  v-if="post.imageUrls.length > 0" />
              </template>
              <span>{{ truncateText(post.title, 2) }}</span>
              <!-- <span class="hidden sm:block">{{ truncateText(post.title, 3) }}</span> -->
              <span class="text-custom_green-100 font-bold">ETB{{
                post.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>
              <!-- <a-card-meta class="font-light" :title="" >
                                  <template #description ><label class="text-green-500 font-bold">{{ post.price }}</label></template>
                                </a-card-meta> -->
                               
                           
            </a-card>
          </router-link>
         
         
           
        </div>
     
       
     
      </a-carousel>
 
    </div>

    <div class="">
      <button v-if="currentPage != 1 && !loading"
        class="hidden sm:block md:p-5 rounded-full bg-gray-50 h-14 w-14 text-2xl text-gray-300 md:flex items-center justify-center mt-20"
        @click="scrollLeft">
        <LeftOutlined />
      </button>
    </div>
    <!-- <div v-if="currentPage != 1"
      class=" bg-gray-50 bg-opacity-80 text-black font-bold text-4xl  rounded-full absolute top-0 left-0 mr-2 h-11 w-11  mt-24 z-10 flex items-center justify-center  md:hidden"
      @click="scrollLeftMobile">
      <LeftOutlined />
    </div> -->

    <div class="  xl:ml-0 md:flex flex-row list">

      <div class="hidden md:block md:p-1 xl:w-56  xl:p-3" v-for="(post, index) in displayedPosts" :key="index">
        <router-link :to="{ name: 'PostDetail', params: { postId: post.id } }">

          <a-card hoverable class="h-60 bg-white">
            <template #cover>
              <img alt="example" class="h-40 max-w-fit" :src="baseUrl + '/api/images/' + post.imageUrls[0]?.name"
                v-if="post.imageUrls.length > 0" />
            </template>
            <span>{{ truncateText(post.title, 2) }}</span>
            <!-- <span class="hidden sm:block">{{ truncateText(post.title, 3) }}</span> -->
            <span class="text-custom_green-100 font-bold">ETB{{
              post.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</span>
            <!-- <a-card-meta class="font-light" :title="" >
                                <template #description ><label class="text-green-500 font-bold">{{ post.price }}</label></template>
                              </a-card-meta> -->
          </a-card>
        </router-link>
      </div>


    </div>

    <div class="">
      <button v-if="currentPage <= (posts.length / pageSize)"
        class="hidden sm:block md:p-5 rounded-full bg-gray-50 h-14 w-14 text-2xl text-gray-300 md:flex items-center justify-center  mt-20 "
        @click="scrollRight">
        <RightOutlined class="items-center justify-center" />
      </button>
    </div>

   


    <!-- <div v-if="currentPage <= (posts.length / pageSizeMobile)"
      class="bg-gray-50  bg-opacity-80 text-black font-bold text-4xl rounded-full absolute top-0 right-0 mr-0 h-12 w-12 mt-24 z-2 flex items-center justify-center md:hidden"
      @click="scrollRightMobile">
      <RightOutlined />
    </div> -->
   
  </div>
</template>

<script>
// import { RouterLink } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import API from '../../views/setting/post.service';
import { FilterField } from '../../modal/filter.model';
import { RightOutlined, LeftOutlined } from "@ant-design/icons-vue";
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    // RouterLink,
    RightOutlined,
    LeftOutlined,
    RightCircleOutlined,
    LeftCircleOutlined
  },
  setup() {
    const baseUrl = process.env.VUE_APP_SERVER_URL;
    const filterField = new FilterField();
    const posts = ref([]);

    const searchValue = ref('');
    const results = ref([]);
    let loading = ref(false);

    let currentPage = ref(1);
    let currentMobilePage = ref(4);
    let pageSize = ref(4);
    let pageSizeMobile = ref(4);





    let hasMore = ref(true);
    let pageIndex = ref(0);




   const truncateText = (text, limit)=> {
      const words = text.split(' ');
      const truncatedWords = [];

      for (let i = 0; i < limit; i++) {
        if (i < words.length) {
          truncatedWords.push(words[i]);
        } else {
          break;
        }
      }

      if (truncatedWords.length < words.length) {
        return truncatedWords.join(' ') + '...';
      }

      return text;
    };

    const displayedPosts = computed(() => {
      let startIndex;
      let endIndex;

      if (window.innerWidth <= 768) {
        startIndex = (currentPage.value - 1) * pageSizeMobile.value;
        endIndex = startIndex + pageSizeMobile.value;
      } else {
        startIndex = (currentPage.value - 1) * pageSize.value;
        endIndex = startIndex + pageSize.value;
      }
      return posts.value.slice(startIndex, endIndex);
    });


    const onSearch = (searchValue) => {
      console.log('use value', searchValue);
      console.log('or use this.value', searchValue);
      filterField.search = searchValue;
      if (searchValue !== '') {
        API.filterProductPost(filterField)
          .then((res) => {
            results.value = res.data;
            console.log('data', res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        results.value = [];
      }
    };
    function getMyPost() {
      loading.value = true;
      filterField.pageSize = 4;
      API.filterProductPost(filterField)
        .then((res) => {
          if (res.data.length == 0) {
            hasMore.value = false;
            loading.value = false;
          }
          posts.value = [...posts.value, ...res.data];
        
          loading.value = false;
          console.log('data', res.data);
        })
        .catch((err) => {
          loading.value = false;
          console.log(err);
        });
    }



    function scrollLeft() {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    }
    function scrollRight() {

      const totalPages = Math.ceil(posts.value.length / pageSize.value);
      if (currentPage.value < totalPages) {
        currentPage.value += 1;
      } else {
        loadMore();
        currentPage.value += 1;
      }


    }
    function scrollLeftMobile() {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    }
    function scrollRightMobile() {

      const totalPages = Math.ceil(posts.value.length / pageSizeMobile.value);
      if (currentPage.value < totalPages) {
        currentPage.value += 1;
      } else {
        loadMore();
        currentPage.value += 1;
      }
 

    }
    function handleAfterChange(currentSlide) {
      console.log("meeee",currentSlide)
    
   
  }
    function loadMore() {
      loading.value = true;
      // Check if the user has scrolled to the bottom
      if (
        hasMore.value
      ) {
        filterField.page = filterField.page + 1;
        // Load more data when the user scrolls to the bottom
        getMyPost(filterField);
      }


    }


    onMounted(() => {
      getMyPost();

    });
    const handleCarouselSlide=(currentSlide) =>{
    // Logic to handle sliding effect
    console.log("Current slide:", currentSlide);
  };

    return {
      baseUrl,
      posts,
      searchValue,
      results,
      pageIndex,
      currentMobilePage,
      truncateText,
      onSearch,
      loadMore,
      scrollRight,
      scrollRightMobile,
      scrollLeftMobile,
      pageSizeMobile,
      displayedPosts,
      scrollLeft,
      currentPage,
      handleAfterChange,
      pageSize,
      loading,
      handleCarouselSlide
    };
  },
};
</script>


<style scoped>
@media (max-width: 767px) {
  .list {
    overflow: hidden;
    display: flex;
    flex-direction: row;

  }
}

::v-deep .ant-card-body {
  display: flex;
  flex-direction: column;
  min-width: 220px;
  min-height: 40vh;
  max-height: 40vh;
  overflow: hidden;
  padding-right: -3px !important;
}
:deep(.slick-slide) {
  text-align: center;
  height: 320px;
  line-height: 160px;
  background: transparent;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: black;
  background-color: white;
  transition: ease all 0.3s;
  opacity: 0.3;
  border-radius: 50px;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: black;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color:black;
}
</style>