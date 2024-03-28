import axios from "../../utils/axios";
  
function createFeedback(body) {
    return axios({
      url: '/feedback',
      method: 'post',
      data: body
    })
  }
  

  function deleteFeedback(id) {
    return axios({
      url: `/feedback/${id}`,
      method: 'delete',
      
    });
  }
  function getFeedbacks(id) {
    return axios({
      url: `/feedback?page=0&&userId=${id}`,
      method: 'get',
    });
  }
  export default {
    createFeedback,
    deleteFeedback,
    getFeedbacks
    }