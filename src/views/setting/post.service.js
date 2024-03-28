import axios from "../../utils/axios";


 
  function getProductPosts() {
    return axios({
      url: '/product-posts',
      method: 'get'
    })
  }
  function getProductPost(id) {
    return axios({
      url: `/product-posts/${id}`,
      method: 'get'
    })
  }
  function filterProductPost(body) {
    return axios({
      url: `/product-post`,
      method: 'post',
      data:body
    })
  }
  function trendingProductPost(body) {
    return axios({
      url: `/product-posts/trending`,
      method: 'post',
      data:body
    })
  }
  function viewProductPost(body) {
    return axios({
      url: `/view`,
      method: 'post',
      data:body
    })
  }
  function getProductPostField(id) {
    return axios({
      url: `/postField/post/${id}`,
      method: 'get'
    })
  }

  function myProductPost(body){
    return axios({
      url: `/my-product-post`,
      method: 'post',
      data:body
    })
  }

  function markUnavailableOrAvaible(id){
    return axios({
      url: `/mark-available-unavailable/${id}`,
      method: 'put',
    })
  }

  function markHideUnhide(id){
    return axios({
      url: `/hide-unhide/${id}`,
      method: 'put',
    })
  }

  
function createProductPost(body) {
    return axios({
      url: '/product-posts',
      method: 'post',
      data:body
    })
  }


  function replaceProductPost(id, body) {
    return axios({
      url: `/product-posts/${id}`,
      method: 'put',
      data: body
    });
  }

  function deleteProductPost(id) {
    return axios({
      url: `/product-posts/${id}`,
      method: 'delete'
    });
  }
  function updateProductPost(id, body) {
    return axios({
      url: `/product-posts/${id}`,
      method: 'patch',
      data: body
    });
  }
  function deletePostImage(id){
    return axios({
      url: `/deleteImage/${id}`,
      method: 'post',
    });
  }

  export default {
    createProductPost,
    getProductPosts,
    deleteProductPost,
    replaceProductPost,
    deletePostImage,
    updateProductPost,
    getProductPost,
    getProductPostField,
    filterProductPost,
    myProductPost,
    trendingProductPost,
    viewProductPost,
    markUnavailableOrAvaible,
    markHideUnhide
     
    }