import axios from "../../utils/axios";

  function AllFAQ(body) {
    return axios({
      url: '/frequently-asked-questions',
      method: 'get',
    })
  }

  function FAQbyID(id) {
    return axios({
      url: '/frequently-asked-questions/'+id,
      method: 'get',
    })
  }

  function SearchFAQ(searchQuery) {
    return axios({
      url: '/frequently-asked-questions/search',
      method: 'get',
      params: {
        searchTerm : searchQuery
      }
    });
  }

  export default {
    AllFAQ,
    FAQbyID,
    SearchFAQ

  }