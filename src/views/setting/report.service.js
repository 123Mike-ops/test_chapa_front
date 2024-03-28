import axios from "../../utils/axios";


 
  function getPostCategoryCount() {
    return axios({
      url: '/categoryCount',
      method: 'get'
    })
  }
  function getSellerDataCount(userId) {
    return axios({
      url: '/seller-data/'+userId,
      method: 'get'
    })
  }

  export default {
    getPostCategoryCount,
    getSellerDataCount

  }