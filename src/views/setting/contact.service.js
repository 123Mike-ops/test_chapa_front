import axios from "../../utils/axios";

  function sendMessage(body) {
    return axios({
      url: '/contact',
      method: 'post',
      data:body
    })
  }

  function findBySender(id) {
    return axios({
      url: '/contact/'+id,
      method: 'get',
    })
  }

  export default {
    sendMessage,
    findBySender

  }