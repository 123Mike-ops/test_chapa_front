
import { createStore } from 'vuex';
import user from './modules/user'
import category  from './modules/category';



export default createStore({
  modules: {
    user: user,
    category:category
   
    // Add more modules as needed
  },
});
