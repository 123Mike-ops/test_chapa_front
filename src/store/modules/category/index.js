import reportService  from "@/views/setting/report.service"; 

export default {
  namespaced: true,
  state: {
    numberOfPostByCategory:null,
    numberOfPostBySubCategory:null
  },
  mutations: {
    setCategoryCount(state, numberOfPostByCategory) {
      state.numberOfPostByCategory = numberOfPostByCategory;
    },
    setSubCategoryCount(state, numberOfPostBySubCategory) {
      state.numberOfPostBySubCategory = numberOfPostBySubCategory;
    }
  },
  actions: {
    async fetchCategoryCount({ commit }) {
      try {
        const response = await reportService.getPostCategoryCount();
        const categoryCount = response.data.category;
        const subCategoryCount = response.data.subCategory;
        
        commit('setCategoryCount', categoryCount);
        commit('setSubCategoryCount', subCategoryCount);
      } catch (error) {
        console.error('Error fetching category count:', error);
      }
    }
  }
};
