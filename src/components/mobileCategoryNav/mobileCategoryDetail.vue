<template>
   <div class="flex flex-col w-full relative xl-hidden">
   
        <div class="p-5 mt-2 flex mb-1">
          <div class="mb-3 flex justify-start w-1/6 ">
            <button @click="goBack" class="fixed left-2 top-13 flex justify-center items-center bg-custom_green-100 text-white font-normal text-xl rounded-full h-10 w-10 px-3 z-50 ">
              <LeftOutlined />
            </button>
            </div>
            <!-- <div class="w-5/6">
            <input type="text" placeholder="Find Category ..." class="border-2 p-3 w-full" />
            </div> -->
        </div>
       
         
          <div  v-if="mappedSubCategories.length>0" class="p-2" >
            <router-link v-for="subC in mappedSubCategories" :key="subC.subCategory.id"  :to="{ name: 'SubCategoryDetail', params: { subCategoryId: subC.subCategory.id }, query: { name: subC.subCategory.name,catId:subC.subCategory.category.id } }" class="flex flex-row p-1">
            <div><img :src="baseUrl+'/api/images/' + subC.subCategory.imageUrl" class="h-16 w-16 rounded-3xl" /></div>
            <div class="flex flex-col text-md p-2">
                <div>{{subC.subCategory.name}}</div>
                <div ><span class="text-gray-500">{{subC.numberOfPost}} ads</span></div>
                
            </div>
          </router-link>
          </div>
       

       
        <hr>
       

   </div>
</template>
<script>

import API from '../../views/setting/lookup.service';
import { ref, onMounted,computed,watch } from 'vue';
import { useRoute } from 'vue-router';
import {useStore} from 'vuex';
import {LeftOutlined} from "@ant-design/icons-vue";

export default {
  name: "AddressComponent",
  components: {
    LeftOutlined
  },
  setup() {
    const categories = ref([]);
    const subCategories = ref([]);
    const baseUrl = process.env.VUE_APP_SERVER_URL;
    const subCategoryCount=ref([]);
    const route = useRoute();
    const newSubCat=ref([]);
    const store=useStore();
  

    // const mappedNumberOfPostsBySubCat = computed(() => {
    //   return subCategories.value.map((subCategory) => {
    //     const numberOfPostBySubCat = subCategoryCount.value?.find(
    //       (count) => count.id === subCategory.id
    //     );
    //     return {
    //       subCategory,
    //       numberOfPostBySubCat: numberOfPostBySubCat ? numberOfPostBySubCat.count : 0,
    //     };
    //   });
    // });   
    // watch(store.state.category, () => {
    //       subCategoryCount.value=store.state.category.numberOfPostBySubCategory;
    //  console.log("subhas",store.state.category)
    // });
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
    onMounted(() => {
      const categoryId = route.params.categoryId;
      subCategoryCount.value=store.state.category.numberOfPostBySubCategory;
      API.getSubCategory(categoryId)
        .then((res) => {
          subCategories.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      
    });

    // watch(mappedNumberOfPostsBySubCat, () => {
    //   newSubCat.value=mappedNumberOfPostsBySubCat.value;
        
    //  console.log("hahass",mappedNumberOfPostsBySubCat.value)
    // });
    const goBack = () => {
      window.history.back();// Navigate to the previous route
    };

    return {
      categories,
      subCategories,
      baseUrl,
      subCategoryCount,
      newSubCat,
      mappedSubCategories,
      goBack
      
    };
  },
  methods: {},
};
</script>
