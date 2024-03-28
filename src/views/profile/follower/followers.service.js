import axios from "../../../utils/axios";
  
function follow(body) {
    return axios({
      url: '/follow',
      method: 'post',
      data:body,
    })
  }
  
  function unfollow(id) {
    return axios({
      url: `/followers/${id}` ,
      method: 'delete',
    });
  }

  function getFollowers(pageNumber,login) {
    return axios({
      url: `/followers?pageNumber=${pageNumber}&&login=${login}` ,
      method: 'get',
    });
  }
  function getFollowing(pageNumber,login) {
    return axios({
      url: `/following?pageNumber=${pageNumber}&&login=${login}`,
      method: 'get',
    });
  }
  function isFollowing(body) {
    return axios({
      url: `/isFollwing`,
      method: 'post',
      data:body,
    });
  }
  function deleteFollowing(body) {
    return axios({
      url: `/deleteFollowing`,
      method: 'post',
      data:body,
    });
  }

  function getFollowersCount(userId) {
    return axios({
      url: `/followersCount/${userId}`,
      method: 'get',
      
    });
  }

  export default {
    follow,
    unfollow,
    getFollowers,
    getFollowing,
    getFollowersCount,
    isFollowing,
    deleteFollowing
    }