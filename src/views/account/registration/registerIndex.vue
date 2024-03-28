<template>
  <div class="flex justify-center p-15 ">
    <div class="loading-spinner" v-if="loading"></div>

    <div class="flex flex-col shadow-lg sm:w-200px md:w-400px p-10 bg-white ">
      <div class="flex flex-col">
        <div><span class="font-bold text-3xl">{{ $t('auth.Register') }}</span></div>



      </div>
      <div class="flex flex-col mt-10">
        <div><span class="font-semibold text-xl"> Sign up to Megenagna</span></div>
        <div class="mt-2"><span class="text-sm">{{ $t('auth.Already have an account ?') }}</span><router-link
            to="Login"><span class="text-sm text-blue-400"> {{ $t('auth.Sign in') }}</span></router-link></div>

      </div>


      <div class="mt-5 "><span class="font-light text-sm text-custom_gray-500">---{{ $t('auth.or Sign in with Email')
      }}----</span></div>
      <div class="flex flex-col mt-3">
        <form @submit.prevent="submitForm">
          <div class="flex flex-col ">

            <div>
              <a-input v-model:value="formData.login" :placeholder="$t('auth.your name')" class="w-80">
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
              <a-input v-model:value="formData.email" :placeholder="$t('auth.email')" class="w-80">
                <template #prefix>
                  <MailOutlined />
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

            <br />
            <div>
              <a-input-password v-model:value="formData.confirmPassword" :placeholder="$t('auth.comfirm-password')"
                class="w-80">
                <template #iconRender="v">
                  <EyeTwoTone v-if="v"></EyeTwoTone>
                  <EyeInvisibleOutlined v-else></EyeInvisibleOutlined>
                </template>
              </a-input-password>
            </div>

            <div class="flex justify-center flex-row  mt-5">
              <div> <input type="checkbox" class="" /></div>
              <div class="ml-2"><label class="text-sm ">{{ $t('auth.policy') }}</label></div>

            </div>



          </div>

          <div class="mt-5 flex justify-center">

            <button type="submit" class="w-60 h-10 bg-black text-white hover:bg-gray-700">
              <template>
                <DownloadOutlined />
              </template>
              {{ $t('auth.Register') }}
            </button>
          </div>

        </form>
      </div>
      <!-- <div class="flex justify-center mt-5  ">
        <div class=""><button class="border-2 p-2"><google-icon class="text-red-300" /><label class="ml-2">{{
          $t('auth.Sign in with Google') }}</label></button></div>

      </div> -->

    </div>





  </div>
</template>
<script>
import { GoogleOutlined } from '@ant-design/icons-vue';
import { UserOutlined, InfoCircleOutlined,MailOutlined} from '@ant-design/icons-vue';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons-vue';
import { DownloadOutlined } from '@ant-design/icons-vue';
import accountService from '../account.service';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';




export default {
  components: {
    'google-icon': GoogleOutlined,
    'user-outlined': UserOutlined,
    'info-circle-outlined': InfoCircleOutlined,
    'EyeTwoTone': EyeTwoTone,
    'EyeInvisibleOutlined': EyeInvisibleOutlined,
    'DownloadOutlined': DownloadOutlined,
    'MailOutlined':MailOutlined,

    // You can use any name you prefer for the component
  },

  setup() {
    const formData = ref({
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const authenticationError = ref(false);
    const store = useStore();
    const router = useRouter();
    const loading = ref(false);


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

    const submitForm = () => {
      loading.value = true;

      accountService.registerAccount(formData.value).then(result => {

        router.push('/login')

      })
        .catch(() => {
          authenticationError.value = true;
        });
    };

    const resetForm = () => {
      formData.value.login = '';
      formData.value.password = '';
      formData.value.confirmPassword = '';
      formData.value.email = '';
    };

    return {
      formData,
      authenticationError,
      submitForm,
      resetForm,
      loading
    };
  },
}
</script>
<style>
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #db8234;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  position: absolute;
  margin-top: 100px;
  /* Half of the height */
  margin-left: -16px;
  /* Half of the width */
  z-index: 999;
  /* Ensure the spinner appears on top */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}</style>