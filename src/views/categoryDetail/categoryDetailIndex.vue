<template>
  <div class="relative">
    <div class="mb-2 flex justify-start ">
      <button @click="goBack" class="fixed left-1 top-20 flex justify-center items-center bg-transparent text-white font-bold text-xl rounded-full h-10 w-10 px-3 z-50 ">
        <LeftOutlined />
      </button>
      </div>
    
    <div class="flex flex-col md:flex md:flex-row">

      <div class="md:w-1/4">
        <Filter :category="category" :subCategories="mappedSubCategories" :region="region" :posts="posts" @submit="submitForm"
          @refresh="refreshForm" />
      </div>

      <div class="p-0 w-full ml-0 md:w-3/4">
        <Content :posts="posts" :category="category" :loading="loading" @submit="submitForm" @refresh="refreshForm" @loadCat="loadCat" />
      </div>

    </div>
  </div>
</template>
<script>
import Filter from '../../components/categoryDetail/filter.vue';
import Content from '../../components/categoryDetail/content.vue';
import API from '../../views/setting/lookup.service';
import APIPost from '../../views/setting/post.service';
import { reactive, ref, watch, onMounted, computed } from 'vue';
import { FilterField } from "@/modal/filter.model";
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import {LeftOutlined} from "@ant-design/icons-vue";

export default {
  name: 'CatDetailIndex',
  components: {
    Filter,
    Content,
    LeftOutlined
  },
  setup() {
    const category = ref({});
    const subCategories = ref([]);
    const region = ref([]);
    const posts = ref([]);
    const loading = ref(false);
    const filterField = reactive(new FilterField());
    const route = useRoute();
    const store = useStore();
    const subCategoryCount = ref([]);
    const hasMore=ref(true);

    const updatePosts = (updatedPosts) => {
      posts.value = updatedPosts;
    };

    const submitForm = (fieldName, value) => {
      loading.value = true;
      filterField[fieldName] = value;

      console.log("Query data", filterField);
      filterField.page=0;
      APIPost.filterProductPost(filterField)
        .then((res) => {
          console.log("filterdddd", res.data);
          posts.value = res.data;
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    watch(store.state.category, () => {
      subCategoryCount.value = store.state.category.numberOfPostBySubCategory;
      console.log("i am on watch",subCategoryCount.value)

    });

    const feed = async () => {

      subCategoryCount.value = await store.state.category.numberOfPostBySubCategory;
      console.log("i am on feed",subCategoryCount.value)

    };

    const mapSubCategory = computed(() => {
   
        feed()
      
    
      console.log("i am on mapCategory",subCategoryCount.value)
      let numberOfPost;
      return subCategories.value.map((subCategory) => {
        if (subCategoryCount.value != null) {
          numberOfPost = subCategoryCount.value.find((count) => count.id === subCategory.id);
        }
        console.log("i am on mapCategory wanaw",subCategory,numberOfPost);

        return {
          subCategory,
          numberOfPost: numberOfPost ? numberOfPost.count : 0,
        };
      });
    });
    const mappedSubCategories = computed(() => {
      return mapSubCategory.value;
    });
    const refreshForm = (filterField,comeFrom) => {
      loading.value = true;

      if (comeFrom === 'content') {
        filterField.sortBy = null;
        filterField.sortType = null;
      }
     
 filterField.page=0;
      APIPost.filterProductPost(filterField)
        .then((res) => {
          console.log("refreshed", res.data);
          posts.value = res.data;
          loading.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const goBack = () => {
      window.history.back(); // Navigate to the previous route
    };

    const getSubCategory = (categoryId) => {
      API.getSubCategory(categoryId)
        .then((res) => {
          subCategories.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getCategoryById = (categoryId) => {
      API.getCategoryById(categoryId)
        .then((res) => {
          category.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };
const loadCat=()=>{
  if(hasMore.value && !loading.value){
    filterField.page = filterField.page + 1;

filterProductPost();
  }



}
    const filterProductPost = () => {
      loading.value=true;
      APIPost.filterProductPost(filterField)
        .then((res) => {
          if(res.data.length<=0){
            hasMore.value = false;
       
          }
          posts.value = [...posts.value, ...res.data];
          loading.value=false;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {

      if (route.params.categoryId) {
        const categoryId = route.params.categoryId;
        filterField.category = categoryId;
        getCategoryById(categoryId);
        getSubCategory(categoryId);
        filterProductPost(filterField);
      } else if (route.params.subCategoryId) {
        const subCategoryId = route.params.subCategoryId;
        const catId = route.query.catId;
        getCategoryById(catId);
        getSubCategory(catId);
        filterField.subCategory = subCategoryId;
        filterProductPost(filterField);
      }

      API.getRegion()
        .then((res) => {
          region.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return {
      category,
      subCategories,
      region,
      posts,
      loading,
      filterField,
      updatePosts,
      mapSubCategory,
      submitForm,
      refreshForm,
      goBack,
      loadCat,
      getSubCategory,
      getCategoryById,
      hasMore,
      filterProductPost,
      mappedSubCategories
    };
  },
};
</script>
<style>
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #db8234;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  position: absolute;
  margin-top: -16px;
  /* Half of the height */
  margin-left: -16px;
  /* Half of the width */
  z-index: 999;
  /* Ensure the spinner appears on top */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}</style>