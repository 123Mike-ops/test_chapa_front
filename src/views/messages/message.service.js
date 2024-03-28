import axios from "../../utils/axios";


 
 

  function getMessage(id,postId,page) {
    return axios({
      url: `/messages/${id}/${postId}?page=${page} `,
      method: 'get'
    })
  }
  
  function viewMessage(body) {
    return axios({
      url: `/view`,
      method: 'post',
      data:body
    })
  }
  
 

  
function sendMessage(body) {
    return axios({
      url: '/send-message',
      method: 'post',
      data:body
    })
  }

function getUserMessages(page) {
    return axios({
      url: `/user-messages/?page=${page}`,
      method: 'get'
    })
  }
 

  function deleteMessage(id) {
    return axios({
      url: `/product-posts/${id}`,
      method: 'delete'
    });
  }
  
  function getMessageUsesID(ownerId,postId){
    return axios({
      url: `/messages-user-id/${ownerId}/${postId}`,
      method: 'get'
    });
  }
 

  export default {
    sendMessage,
    getMessage,
    deleteMessage,
    viewMessage,
    getUserMessages,
    getMessageUsesID
    }