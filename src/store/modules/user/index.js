import accountService from "@/views/account/account.service";

export default {
    namespaced: true,
    state: {
      userData: {
      
      },
      authenticated:false // Array state to hold your items
     
    },
    mutations: {
      // Mutation to add an item to the array
      addUser(state, user) {
         state.userData = {...user}
       
      },
      removeUser(state) {
       state.userData = {}
      },
      retrieveAccount(state){
        return state.userData;
      },
      setAuthenticated(state) {
        state.authenticated = true
      },
     
      logout(state) {
        state.userData = null;
        state.authenticated = false;
      },
    },
    actions: {
      // Action to trigger the mutation and add an item
      addUser({ commit }, addProduct) {
        commit('addUser', addProduct);
      },
      removeUser({ commit }) {
        commit('removeUser');
      },
      retrieveAccount({ commit }) {
        commit('retrieveAccount');
      },
      setAuthenticated({ commit }) {
        commit('setAuthenticated');
      },
     
      logout({ commit }) {
        commit('logout');
      },
      initializeApp({ commit }) {
        const storedToken = localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken');
        if (storedToken) {
          // Assuming you have an API endpoint to fetch user data based on the token
         accountService.retrieveAccount();
        }
      },
     
    },
  }
  