import axios from "../../utils/axios";
  
function createCompany(body) {
    return axios({
      url: '/company',
      method: 'post',
      data: body
    })
  }
  

  function deleteCompany(id) {
    return axios({
      url: `/company/${id}`,
      method: 'delete',
      
    });
  }
  function getCompanys() {
    return axios({
      url: `/company`,
      method: 'get',
    });
  }
  export default {
    createCompany,
    deleteCompany,
    getCompanys
    }