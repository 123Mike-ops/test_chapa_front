import axios from "../../utils/axios";


 
  function getFieldbySubcategory(subcategoryId) {
    return axios({
      url: '/field/subcategory/'+subcategoryId,
      method: 'get'
    })
  }

  function getValuebyField(fieldId) {
    return axios({
      url: '/value/field/'+fieldId,
      method: 'get'
    })
  }
  function getValidationbyField(fieldId) {
    return axios({
      url: '/validation/field/'+fieldId,
      method: 'get'
    })
  }

  function getCategory() {
    return axios({
      url: '/category',
      method: 'get'
    })
  }
  function getCategoryById(categoryId) {
    return axios({
      url: '/category/'+categoryId,
      method: 'get'
    })
  }

  function getSubCategory(categoryId) {
    return axios({
      url: '/sub-category/category/'+categoryId,
      method: 'get'
    })
  }

  function getRegion() {
    return axios({
      url: '/region',
      method: 'get'
    })
  }

  function getCity(regionId) {
    return axios({
      url: '/city/region/'+ regionId,
      method: 'get'
    })
  }
  
  
 
 
 

  
export default {
  getFieldbySubcategory,
  getValuebyField,
  getCategory,
  getSubCategory,
  getRegion,
  getCity,
  getCategoryById,
  getValidationbyField
  }