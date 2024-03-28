<template>
  <div class="flex flex-wrap xl:hidden">

    <div v-for="category in categories" :key="category.id"
      class="flex justify-center flex-col p-2 border-1 ml-2  font-normal text-sm h-28">
      <router-link :to="{ name: 'MobileCat', params: { categoryId: category.id } }">
        <div> <img :src="baseUrl + '/api/images/' + category.imageUrl" class="h-14 w-14" /></div>
        <div class="mt-1"><span>{{ truncateText(category.name, 1) }}</span></div>
      </router-link>
    </div>




  </div>
</template>
<script>

import API from '../../views/setting/lookup.service';


export default {
  name: "AddressComponent",
  components: {

  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_SERVER_URL,
      categories: [],
      subCategories: []
    }
  },
  mounted() {
    API.getCategory().then((res) => {
      this.categories = res.data;
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    handeSubCategory(id) {

      API.getSubCategory(id).then((res) => {
        this.subCategories = res.data;
      }).catch(err => {
        console.log(err)
      })

    },
    reset() {
      this.subCategories = null;
    },
    truncateText(text, limit) {
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
    }


  }
};
</script>