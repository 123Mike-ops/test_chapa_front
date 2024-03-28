import axios from "../../utils/axios";
  
function createVisitor(body) {
    return axios({
      url: '/visitor',
      method: 'post',
      data: body
    })
  }

  function deleteVisitor(id) {
    return axios({
      url: `/visitor/${id}`,
      method: 'delete',
      
    });
  }
  function getVisitors() {
    return axios({
      url: `/visitor`,
      method: 'get',
    });
  }
  export default {
    createVisitor,
    deleteVisitor,
    getVisitors
    }