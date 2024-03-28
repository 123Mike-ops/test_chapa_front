import axios from "../../../utils/axios";
  
function savePost(body) {
    return axios({
      url: '/save-posts',
      method: 'post',
      data:body,
    })
  }
  
  function removeFromSave(id) {
    return axios({
      url: `/save-posts/${id}` ,
      method: 'delete',
    });
  }

  function getByUserIdAndPostId(id) {
    return axios({
      url: `/save-posts-user-post/${id}` ,
      method: 'get',
    });
  }
  function getMySavedPost(body) {
    return axios({
      url: `/my-save-posts`,
      method: 'post',
      data:body,
    });
  }
  export default {
    savePost,
    removeFromSave,
    getMySavedPost,
    getByUserIdAndPostId
    }