<template>
    <div class="container flex  bg-white flex-col" ref="scrollContainer">
     
   
     <div class="w-full flex justify-between items-center h-16  lg:px-5 py-2 shadow-md mb-4 ">
         <div class="text-2xl hidden md:block">Change Phone number</div>
     </div>

     <div class="loading-spinner" v-if="loading"></div>
 
     <a-form @submit.prevent="handleSubmit" class="p-5 md:p-10 lg:p-20">
   
   <a-form-item label="Phone Number" >
     <!-- <div v-if="errors.firstName" class="text-custom_red-100"  >{{ errors.first_name }}</div> -->
     <a-input v-model:value="formData.phone" />
   </a-form-item>
   
   <a-form-item>
     <a-button class="text-custom_green-100"  html-type="submit">Submit</a-button>
     
   </a-form-item>
 </a-form>
 
   </div>
 </template>
 <script>
 

 import accountService from '../../account/account.service';
 import { useStore } from 'vuex';
 import { useRouter } from 'vue-router';
 import { ref, watch, onMounted } from 'vue';
 import { message } from 'ant-design-vue';
 
 
 
 export default {
   components: {
    
  
     
 
     // You can use any name you prefer for the component
   },
 
   setup() {
     
 
  
     const store = useStore();
     const router = useRouter();
     const loading = ref(false);
     const formData = ref({
       currentPassword:'',
       newPassword:'',
       conformPassword:''
     });
     console.log("data ", store.state.user.userData)

     formData.value = store.state.user.userData;
     const errors = ref({
       currentPassword:'',
       newPassword:'',
       conformPassword:''
     });

     
 const handleSubmit = () => {
   console.log("FormData",formData.value)
   formData.value.password = "admin"
   accountService.changePhoneNumber(formData.value).then(res=>{
    message.success('phone number has been updated successfully');
   }).catch(err=>{
    message.error(err.message);
   })

 };



 
     onMounted(() => {
       // Code to run after the component is mounted
 
       
     });
     watch(() => store.state.user.authenticated, (newValue, oldValue) => {
       if (store.state.user.authenticated) {
 
         router.push('/')
       }
     });
 
   
 
     return {
       formData,
       handleSubmit,
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