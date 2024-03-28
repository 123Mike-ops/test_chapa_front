<template>
    <div class="container flex  bg-white flex-col" ref="scrollContainer">
     
   
     <div class="w-full flex justify-between items-center h-16  lg:px-5 py-2 shadow-md mb-4 ">
         <div class="text-2xl hidden md:block">Personal Detail</div>
     </div>

     <div class="loading-spinner" v-if="loading"></div>
 
     <a-form @submit.prevent="handleSubmit" class="p-5 md:p-10 lg:p-20">
   
   <a-form-item label="current password" >
     <!-- <div v-if="errors.firstName" class="text-custom_red-100"  >{{ errors.first_name }}</div> -->
     <a-input-password v-model:value="formData.currentPassword">
        <template #iconRender="v">
            <EyeTwoTone v-if="v"></EyeTwoTone>
            <EyeInvisibleOutlined v-else></EyeInvisibleOutlined>
        </template>
     </a-input-password>
   </a-form-item>
   <a-form-item label="new password " >
     <!-- <div v-if="errors.lastName" class="text-custom_red-100"  >{{ errors.first_name }}</div> -->
     <a-input-password v-model:value="formData.newPassword">
        <template #iconRender="v">
            <EyeTwoTone v-if="v"></EyeTwoTone>
            <EyeInvisibleOutlined v-else></EyeInvisibleOutlined>
        </template>
     </a-input-password>
   </a-form-item>
   <a-form-item label="conform password name" >
      <div v-if="errors.conformPassword" class="text-custom_red-100"  >{{ errors.conformPassword }}</div> 
     <a-input-password v-model:value="formData.conformPassword" >
        <template #iconRender="v">
                  <EyeTwoTone v-if="v"></EyeTwoTone>
                  <EyeInvisibleOutlined v-else></EyeInvisibleOutlined>
                </template>
    </a-input-password>
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
 import {  EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons-vue';
 import { message } from 'ant-design-vue';
 
 
 
 export default {
   components: {
    
    'EyeTwoTone': EyeTwoTone,
    'EyeInvisibleOutlined': EyeInvisibleOutlined,
     
 
     // You can use any name you prefer for the component
   },
 
   setup() {
     
 
  
     const store = useStore();
     const router = useRouter();
     const loading = ref(false);
     const formData = ref({
       
     });

     const errors = ref({});

     const reset =()=>{
        formData.value = {}
     }
     
 const handleSubmit = () => {
   errors.value = {}

       // Validate the "content" field
       if (formData.value.newPassword !== formData.value.conformPassword) {
      errors.value.conformPassword = 'password not match';
    }

  

    // Check if there are any validation errors
    if (Object.keys(errors.value).length === 0) {
      // Form is valid, proceed with submission
      loading.value = true;
      accountService.changePassword(formData.value).then(res=>{
         loading.value = false
         message.success('the password has been changed successfully');
         reset()
      }).catch(err=>{
        loading.value = false;
        message.error(err.message);
      })
      
    } else {
      // Form validation failed, handle errors
    
    }
 

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
       loading,
       errors
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