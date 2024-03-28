<template>
  <div class="flex justify-center p-15 relative">
    <div class="flex flex-col shadow-lg sm:w-200px md:w-400px p-10 bg-white ">
      <div class="flex flex-col">
        <div><span class="font-bold text-3xl">{{ $t('auth.login') }}</span></div>
      </div>
      <div class="flex flex-col mt-10">
        <div><span class="font-semibold text-xl"> Log in to Megnagna</span></div>
        <div class="mt-2">
          <span class="text-sm"> {{ $t('auth.Dont you have an account ?') }}</span>
          <router-link to="Register">
            <span class="text-sm text-blue-400 font-bold">{{ $t('auth.Create free account') }}</span>
          </router-link>
        </div>
      </div>
      <div class="mt-5 ">
        <span class="font-light text-sm text-custom_gray-500">---{{ $t('auth.or Sign in with Email') }}----</span>
      </div>
      <div class="flex flex-col mt-3 relative"> <!-- Add relative positioning here -->
        <form @submit.prevent="submitForm">
          <div class="flex flex-col ">
            <div>
              <a-input v-model:value="formData.username" :placeholder="$t('auth.username')" class="w-80">
                <template #prefix>
                  <user-outlined />
                </template>
                <template #suffix>
                  <a-tooltip title="Extra information">
                    <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
                  </a-tooltip>
                </template>
              </a-input>
            </div>
            <br />
            <div>
              <a-input-password v-model:value="formData.password" :placeholder="$t('auth.password')" class="w-80">
                <template #iconRender="v">
                  <EyeTwoTone v-if="v"></EyeTwoTone>
                  <EyeInvisibleOutlined v-else></EyeInvisibleOutlined>
                </template>
              </a-input-password>
            </div>
          </div>
          <div class="flex justify-center flex-row mt-5">
            <div>
              <input type="checkbox" v-model="formData.rememberMe" class="" />
              <label class="text-sm m-1 ">{{ $t('auth.Remember me') }}</label>
            </div>
            <div>
              <span class="text-sm text-blue-400 ml-10">{{ $t('auth.Forgot Password?') }}</span>
            </div>
          </div>
          <div class="mt-5 flex justify-center">
            <button type="submit" class="w-60 h-10 bg-black text-white hover:bg-gray-700">
              <template>
                <DownloadOutlined />
              </template>
              {{ $t('auth.login') }}
            </button>
            <!-- Place the loading spinner here -->
            <div class="loading-spinner" v-if="loading"></div>
          </div>
        </form>
      </div>
      <div class="flex justify-center p-15">
        <div class="flex justify-between mt-5 ">
          <div class="">
            <button class="google-signin-btn" @click="login">
              <google-icon class="text-white-500" />
              <span class="ml-2">{{ $t('auth.Sign in with Google') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, watch, onMounted } from 'vue';
import { GoogleOutlined, FacebookOutlined,UserOutlined, InfoCircleOutlined, EyeTwoTone, EyeInvisibleOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import accountService from '../account.service';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { googleSdkLoaded } from "vue3-google-login";
import axios from "axios";

export default {
  components: {
    'google-icon': GoogleOutlined,
    'facebook-icon': FacebookOutlined,
    'user-outlined': UserOutlined,
    'info-circle-outlined': InfoCircleOutlined,
    'EyeTwoTone': EyeTwoTone,
    'EyeInvisibleOutlined': EyeInvisibleOutlined,
    'DownloadOutlined': DownloadOutlined,
  },
  methods:{
    async login() {
      this.loading = true;
      const google = await this.googleSdkLoaded();
      google.accounts.oauth2
        .initCodeClient({
          client_id: "14594716155-4lrb3p088bg8gpin3lguv175kus3orvr.apps.googleusercontent.com",
          scope: "email profile openid",
          redirect_uri: "http://localhost:3000/auth/callback",
          callback: response => {
            if (response.code) {
         
              this.sendCodeToBackend(response.code);
            }
          }
        })
        .requestCode();
    },
    googleSdkLoaded() {
      return new Promise((resolve, reject) => {
        // Load Google SDK script dynamically
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = () => {
          resolve(window.google);
        };
        script.onerror = () => {
          this.loading=false
          reject(new Error("Failed to load Google SDK."));
        };
        document.head.appendChild(script);
      });
    },
  
    
    sendCodeToBackend(code){
     
     accountService.googleSignIn(code).then(result =>{
      const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          this.loading = false;
          const jwt = bearerToken.slice(7, bearerToken.length);
          sessionStorage.setItem('authenticationToken', jwt);
            localStorage.removeItem('authenticationToken');
        }
        this.authenticationError = false;
        accountService.retrieveAccount()
        this.$router.push('/')
     }).catch(err =>{
      console.log(err)
      this.loading = false;
      this.authenticationError=true
     })
    }
  },


  setup() {
    const formData = ref({
      username: '',
      password: '',
      rememberMe: '',
    });
    const loading = ref(false);

    const authenticationError = ref(false);
    const store = useStore();
    const router = useRouter();

  
    onMounted(() => {
      // Code to run after the component is mounted
 
      if (store.state.user.authenticated) {

        router.push('/')
      }
    });
    watch(() => store.state.user.authenticated, (newValue, oldValue) => {
      if (store.state.user.authenticated) {

        router.push('/')
      }
    });
   
    const callback = (response) => {

  console.log("Handle the response", response)
}
    const submitForm = () => {
  
      loading.value = true;
      accountService.login(formData.value).then(result => {
        const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          loading.value = false;
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (formData.value.rememberMe) {
            localStorage.setItem('authenticationToken', jwt);
            sessionStorage.removeItem('authenticationToken');
          } else {
            sessionStorage.setItem('authenticationToken', jwt);
            localStorage.removeItem('authenticationToken');
          }
        }
        authenticationError.value = false;
        accountService.retrieveAccount()
        this.$router.push('/')

      })
        .catch(() => {
          authenticationError.value = true;
        });
    };

    const resetForm = () => {
      formData.value.username = '';
      formData.value.password = '';
    };

    return {
      formData,
      authenticationError,
      submitForm,
      resetForm,
      loading
    };
  },
};
</script>
<style scoped>
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #db8234;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  position: absolute; /* Position relative to the parent with relative positioning */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  margin-top: -16px; /* Half of the height */
  margin-left: -16px; /* Half of the width */
  z-index: 999; /* Ensure the spinner appears on top */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.google-signin-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 40px;
  border-radius: 3px;
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.google-signin-btn:hover {
  background-color: #357ae8;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  z-index: 999; /* Ensure it appears on top of other elements */
}
</style>