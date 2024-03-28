import axios from "../../utils/axios";
import store from '../../store/index'


function login(body) {
    return axios({
      url: '/authenticate',
      method: 'post',
      data:body
    })
  }
 
 
  const retrieveAccount = () => {
    return new Promise(resolve => {
      axios
        .get('/account')
        .then(response => {
          const account = response.data;
          if (account) {
           
            store.commit("user/addUser", account)
              store.commit("user/setAuthenticated")
          } else {
            store.commit('user/logout');
            if (this.router.currentRoute.path !== '/') {
              this.router.push('/');
            }
            sessionStorage.removeItem('requested-url');
          }
        //  this.translationService.refreshTranslation(this.store.getters.currentLanguage);
          resolve(true);
        })
        .catch(() => {
         // this.store.commit('logout');
          resolve(false);
        });
    });
  };
  
  function registerAccount(body) {
    return axios({
      url: '/register',
      method: 'post',
      data:body
    })
  }

  function updateAccount(body) {
    return axios({
      url: '/users',
      method: 'put',
      data:body
    })
  }

  function changePhoneNumber(body) {
    return axios({
      url: '/change-phone-number',
      method: 'put',
      data:body
    })
  }

  function changeEmail(body) {
    return axios({
      url: '/change-email',
      method: 'put',
      data:body
    })
  }
  
  function changeProfilePic(body){
    return axios({
      url:'/users/profile-pic',
      method:'put',
      data:body
    })
  }

  function changePassword(body) {
    return axios({
      url: '/account/change-password',
      method: 'post',
      data:body
    })
  }
 
  function googleSignIn(code){
    return axios({
      url:'/oauth2/token',
      method:'post',
      data:code
    })
  }

  
  

  
export default {
    login,
    retrieveAccount,
    registerAccount,
    changeProfilePic,
    googleSignIn,
    updateAccount,
    changePassword,
    changePhoneNumber,
    changeEmail
  }