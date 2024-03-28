<template>
  <div class="p-2 md:flex flex-col w-full">

    <div class="md:p-4">

      <label v-if="subCName" class="text-md sm:text-md md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-700 font-bold">{{ subCName }} in Ethiopia</label>
      <label v-else class="text-md sm:text-md md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-700 font-bold">{{ category.name }} in Ethiopia</label>
    </div>
    <!-- <div class="sm:flex flex-col  bg-white rounded-md md:hidden">
      <div class="flex flex-wrap">
        <div class="p-3"><button class="p-3 bg-gray-200 h-15 text-gray-700 rounded-lg"><span> &lt; ETB 500K </span>
          </button></div>
      </div>
      <div class="flex justify-evenly flex-wrap p-6">
        <div class="flex flex-col items-center">
          <div><img src="../../assets/toyota.jpeg" height="40" width="40"></div>
          <div><label>Toyota</label></div>
        </div>

      </div>

    </div> -->
    <div class="p-0 md:p-5 flex justify-between flex-row">

      <div class="sm:mt-0 sm:block flex felx-row  md:flex flex-row mt-5 ">
        <div><button @click="setLayout('row')">
            <TableOutlined class="text-xl text-gray-500" />
          </button></div>
        <div class="ml-2"><button @click="setLayout('col')">
            <UnorderedListOutlined class="font-bold text-xl text-gray-500" />
          </button></div>


      </div>

      <div class="flex flex-row">
        <div class="hidden sm:block md:mr-3"> <button @click="clearForm('sort')" class=" text-custom_green-100 font-bold ">Clear Filter</button>
        </div>
        <div class=""><label class="text-gray-500">Sort by:</label></div>
        <div class="ml-2">
          <SortDescendingOutlined />
        </div>
        <div>
          <a-space class="bg-gray-100">
            <a-select ref="select" v-model:value="value1" style="width: 120px" @focus="focus" @change="handleChangeSort1">

              <a-select-option value="lowPriceFirst">Lowset Price First</a-select-option>
              <a-select-option value="newFirst">Newest Post First</a-select-option>


            </a-select>


          </a-space>
        </div>
        <!-- <div class="ml-2 mr-2">
                    <label>[]</label>
                </div> -->
        <!-- <div class="mr-2">
                    <ClockCircleOutlined class="text-green-400" />
                </div> -->
        <!-- <div>
                    <a-space class="bg-gray-100">
                        <a-select ref="select" v-model:value="value1" style="width: 120px" @focus="focus"
                            @change="handleChangeSort2">
                            <a-select-option value="anytime">Any Time</a-select-option>
                            <a-select-option value="forday">+8 For Day</a-select-option>

                        </a-select>


                    </a-space>
                </div> -->
      </div>

    </div>
    <div class="">  <a-divider  orientation="left">On This Category</a-divider></div>

    <div v-if="layout === 'row'" class="p-0 grid grid-cols-2 gap-2 md:flex flex-wrap w-full ">

    
      <div class="flex items-center justify-center w-full mt-32" v-if="loading">
        <div class="loading-spinner "></div>
      </div>

      
        <div  v-for="post in posts" :key="post.id" class="ml-0 sm:w-1/2 h-64 p-0  md:w-80 md:h-full xl:p-4 2xl:ml-3">
          <router-link :to="{ name: 'PostDetail', params: { postId: post.id } }">
            <a-card hoverable class="h-full w-full p-0 overflow-hidden md:h-96 md:w-72">
              <template #cover>
                <img alt="post" class="h-36 overflow-hidden max-w-full md:block md:h-56 max-w-fit " :src="baseUrl + '/api/images/' + post.imageUrls[0]?.name" />
              </template>
              <div class="sm:p-0 flex flex-col">
              <label class="text-custom_green-100 font-bold ">ETB {{ post.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',') }}</label>
              <label>{{ truncateText(post.title, 2) }}</label>
              <label class="hidden sm:inline md:text-md text-gray-500 mt-2">{{ truncateText(post.description, 10) }}</label>
              <label class="mt-2 text-gray-500 text-xs mb-2 mr-2">{{ post.region?.name }}, {{  truncateText(post.city?.name, 1)  }}</label>
            </div>
              <!-- <div class="flex flex-row">
                            <div class="bg-gray-300 p-1 rounded-md">Ethiopia Used</div>
                            <div class="ml-3 bg-gray-300 p-1 rounded-md">Automatic</div>
                        </div> -->
            </a-card>
          </router-link>
        </div>
     
   








    </div>
    <div  v-if="layout === 'col' && posts?.length>0" class="flex flex-col w-full ">
     
      <div class="flex items-center justify-center w-full mt-32" v-if="loading">
        <div class="loading-spinner "></div>
      </div>

      <div v-for="post in posts" :key="post.id" class="p-1 md:w-full ml-3 md:p-3">
        <router-link :to="{ name: 'PostDetail', params: { postId: post.id } }">
          <a-card hoverable class="h-40  md:h-60 w-full flex flex-row">

            <div class="flex h-full md:flex flex-row">
              <div class="w-1/2 md:w-1/4 xl:w-2/6">
                <img alt="post" :src="baseUrl + '/api/images/' + post.imageUrls[0]?.name" class="h-32 w-full md:h-52 " />

              </div>
              <div class="p-1 flex flex-col w-3/4 md:p-3">
                <div class=""> <label class="font-bold text-lg">{{ truncateText(post.title, 3) }}</label></div>
                <div class=" hidden sm:block md:mt-5"> <label class="text-md text-gray-500 mt-2">{{ truncateText(post.description,
                  30) }}</label></div>
                <div class="mr-0"><label class="text-custom_green-100 font-bold">ETB {{ post.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}}</label></div>

                <!-- <div class="flex flex-row mt-5">
                                    <div class="bg-gray-300 p-1 rounded-md">Ethiopia Used</div>
                                    <div class="ml-3 bg-gray-300 p-1 rounded-md">Automatic</div>
                                </div> -->
                <div class="mt-1"> <label class="mt-2 text-gray-500 text-xs mb-2">{{ post.region?.name }}, {{ post.city?.name }}</label>
                </div>

              </div>
            </div>

          </a-card>
        </router-link>
      </div>

    </div>


  </div>
</template>
<script>
import { UnorderedListOutlined, TableOutlined, SortDescendingOutlined, ClockCircleOutlined } from "@ant-design/icons-vue";
import { FilterField } from "@/modal/filter.model";

export default {
  name: "ContentComponent",
  components: {
    UnorderedListOutlined,
    TableOutlined,
    SortDescendingOutlined,
    ClockCircleOutlined,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
    category: {},
    loading: false,
  },
  data() {
    return {
      layout: "row", // Initial layout preference
      baseUrl: process.env.VUE_APP_SERVER_URL,
      filterField: new FilterField(),
      subCName: '',
      lastScrollTop:0,
      scrollContainer:null,
      hasMore:true



    };
  },

  mounted() {
    console.log("dataaa", this.posts);

    this.subCName = this.$route.query.name;
    console.log("name22", this.subCName);
    window.addEventListener("scroll", this.loadMore);
  },

  watch: {
    posts: {
      handler(newPosts, oldPosts) {
        // Handle the change in posts and perform any necessary actions
        console.log("Posts changed:", newPosts);
        // You can trigger any methods or logic here to update the component
      },
      immediate: true, // Trigger the handler immediately when the component is created
    },
  },
  methods: {
    setLayout(layout) {
      // Switch between 'grid' and 'column'
      this.layout = layout;
    },
    truncateText (text, limit) {
      const words = text.split(' ');
      const truncatedWords = [];

      for (let word of words) {
    
          truncatedWords.push(word);
          if (truncatedWords.length === limit) {
            break;
          }
        
      }

      if (truncatedWords.length < words.length) {
        return truncatedWords.join(' ') + '...';
      }

      return text;
    },
    loadMore() {
      const scrollContainer = document.documentElement;
      const currentScrollTop = scrollContainer.scrollTop;

      // Check if the user has scrolled to the bottom
      console.log("hi",currentScrollTop > this.lastScrollTop &&
        currentScrollTop + window.innerHeight >=
          scrollContainer.scrollHeight - 500 )
      if (
        currentScrollTop > this.lastScrollTop &&
        currentScrollTop + window.innerHeight >=
          scrollContainer.scrollHeight - 500 
      ) {
        // this.filterField.page = this.filterField.page + 1;
        // Load more data when the user scrolls to the bottom4
        this.$emit('loadCat');
       
      }

      this.lastScrollTop = currentScrollTop;
    },
    handleChangeSort1(selectedValue) {

      if (selectedValue == "lowPriceFirst") {
        this.$emit('submit', 'sortBy', 'price');
        this.$emit('submit', 'sortType', 'ASC');

      } else if (selectedValue == "newFirst") {
        this.$emit('submit', 'sortBy', 'create_time');
        this.$emit('submit', 'sortType', 'DESC');
      }

    },
    clearForm(value) {
      console.log("before", this.selectedCity, this.selectedRegion)


      if (value == 'sort') {

        this.filterField.sortBy = null;
        this.filterField.sortType = null;
        this.filterField.category=this.category.id;
        this.$emit('refresh', this.filterField, 'content');
      }else{
        this.filterField.category=this.category.id;
        this.$emit('refresh', this.filterField, 'content');
      }



    },
  },
};
</script>
<style scoped>
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
  z-index: 1000;
  /* Ensure the spinner appears on top */
  align-items: center;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

::v-deep .ant-card-body {
  display: flex;
  flex-direction: column;
  min-width: 320px;
  min-height: 40vh;
  max-height: 40vh;
  overflow: hidden;
  
}





</style>
