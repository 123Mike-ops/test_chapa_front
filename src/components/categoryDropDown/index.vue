<template>
  <a-card class="hidden flex-col min-h-3/4 w-72 relative xl:flex ">
    <a-dropdown v-for="category in mappedCategories" :key="category.id" placement="right">

      <RouterLink :to="{ name: 'CategoryDetail', params: { categoryId: category.category.id } }"
        class="ant-dropdown-link flex justify-between items-center py-2 px-5"
        @click="getSubCategory(category.category.id)" @mouseover="getSubCategory(category.category.id)">
        <span class=" h-full flex items-center">
          <span class="flex items-center">
            <div class="flex items-center">
              <div class="mr-3" style="height: 32px; width: 32px">
                <img height="32px" width="32px" :src="baseUrl + '/api/images/' + category.category.imageUrl"
                  alt="Vehicles" class="icon" style=" display: block; height: 100%; width: 100%;" />
              </div>
            </div>

            <span class="flex flex-col">
              <span class="text-sm">
                {{ category.category.name }}
              </span>
              <span v-if="category.numberOfPost" class=""><span>{{ category.numberOfPost }} ads</span></span></span>
          </span>

        </span>
        <RightOutlined />
      </RouterLink>



      <template #overlay>
        <a-card class="flex flex-col h-96 w-72 relative">
          <a-menu v-if="subCategories" class="h-96 custom-dropdown-menu">

            <a-menu-item v-for="sub in mappedSubCategories" :key="sub.subCategory.id">
              <router-link
                :to="{ name: 'SubCategoryDetail', params: { subCategoryId: sub.subCategory.id }, query: { name: sub.subCategory.name, catId: category.category.id } }">
                <span class=" h-full flex items-center w-72">
                  <span class="flex items-center">
                    <div class="flex items-center">
                      <div class="mr-3" style="height: 32px; width: 32px">
                        <img height="32px" width="32px" :src="baseUrl + '/api/images/' + sub.subCategory.imageUrl"
                          alt="subCAtegory" class="icon" style=" display: block; height: 100%; width: 100%;" />
                      </div>
                    </div>

                    <span class="flex flex-col">
                      <span class="text-sm">
                        {{ sub.subCategory.name }}
                      </span>
                      <span  class=""><span> {{ sub.numberOfPost }} ads
                        </span></span></span>
                  </span>

                </span>
              </router-link>
            </a-menu-item>



          </a-menu>
        </a-card>
      </template>

    </a-dropdown>





    <!-- lang test -->





  </a-card>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch,watchEffect  } from 'vue';
import { RightOutlined } from '@ant-design/icons-vue';
import API from '../../views/setting/lookup.service';
  import { useStore } from 'vuex';

export default defineComponent({
  name: 'AddressComponent',
  components: {
    RightOutlined,
  },

  setup() {
    const baseUrl = process.env.VUE_APP_SERVER_URL;
    const categories = ref([]);
    const subCategories = ref([]);
    const store = useStore();
    const categoryCount = ref([]);
    const newCat = ref([]);
    const subCategoryCount = ref([]);
    const newSubCat = ref([]);


    const getCategory = () => {
      API.getCategory()
        .then((res) => {
          categories.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getSubCategory = (id) => {
      API.getSubCategory(id)
        .then((res) => {
          subCategories.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    
    };
  
    const reset = () => {
      subCategories.value = [];
    };

    onMounted( async () => {
    await  getCategory();

    });
    watch(store.state.category, () => {
      categoryCount.value = store.state.category.numberOfPostByCategory;
      subCategoryCount.value =  store.state.category.numberOfPostBySubCategory;
      
    });

   
   const feed=async ()=>{
    categoryCount.value= await store.state.category.numberOfPostByCategory;
    subCategoryCount.value= await store.state.category.numberOfPostBySubCategory;
   

   };
  
    const mapCategory = computed(() => {
    
   
    
      feed();
      let numberOfPost;
      return categories.value.map((category) => {
        if(categoryCount.value!=null){
         numberOfPost = categoryCount.value.find((count) => count.id === category.id);
        }
        return {
          category,
          numberOfPost: numberOfPost ? numberOfPost.count : 0,
        };
      });
    });

    const mapSubCategory = computed(() => {
      feed()
   
     let numberOfPost;
      return subCategories.value.map((subCategory) => {
        if(subCategoryCount.value!=null){
         numberOfPost = subCategoryCount.value.find((count) => count.id === subCategory.id);
        }
      
        return {
          subCategory,
          numberOfPost: numberOfPost ? numberOfPost.count : 0,
        };
      });
    });
    const mappedCategories = computed(() => {
     
      return mapCategory.value;
    });
    watchEffect(async () => {
      await getCategory();
     
    });
    const mappedSubCategories = computed(() => {
      return mapSubCategory.value;
    });
    watchEffect(async () => {
      await getSubCategory();
    
    });
   
   

   





    return {
      baseUrl,
      categories,
      subCategories,
      getCategory,
      mappedCategories,
      getSubCategory,
      mappedSubCategories,
      mapCategory,
      mapSubCategory,
      feed,
      reset,
      newCat,
      subCategoryCount,
      newSubCat,
      store
    };
  }
});
</script>
<style>
.ant-card-body {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  min-height: 70vh;
  max-height: 70vh;
  overflow: hidden;
  padding-right: -5px !important;
}

.ant-dropdown .ant-dropdown-menu {
  position: absolute;
  margin: 0;
  top: 0px;

}

.custom-dropdown-menu {
  position: absolute;
  top: 50px;
  /* Adjust the distance from the top as needed */
  left: 0;
  /* Adjust the left position as needed */
  /* Add other custom styles if necessary */
}
</style>