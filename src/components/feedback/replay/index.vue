<template>
   
    <a-form @submit.prevent="handleSubmit">
      <a-form-item >
        <div v-if="errors.content" class="text-custom_red-100"  >{{ errors.content }}</div>
        <a-input v-model:value="formData.content" />
      </a-form-item>
      <a-form-item >
        <a-upload 
        v-model:file-list="fileList"
       
        @preview="handlePreview"
        @change="handleChange"
        :before-upload="beforeUpload"
        >
         
            <a-button  v-if="fileList.length < 1">
      <upload-outlined></upload-outlined>
      Click to Upload
    </a-button>
        </a-upload>
       
      </a-form-item>
      <a-form-item v-if="formData.content != ''">
        <a-button class="bg-custom_green-100" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form> 
  </template>
  
  <script>
  import {
    WechatOutlined
  } from "@ant-design/icons-vue";
  
  import { ref } from 'vue';
  
  import FileService from '@/views/setting/file.service.js'
  import feedbackSerive from "@/views/setting/feedback.serivec.js";
  import { useRoute,useRouter  } from 'vue-router';
  import {
   
    UploadOutlined,
  } from "@ant-design/icons-vue";
  
  
  
  export default {
    name: "FeedbackReplay",
    components: {
      UploadOutlined
    },
    props: ["parentData","setShowReplay"],

    setup(props, {emit}) {
  
      const route = useRoute()
      const router = useRouter()
    const formData = ref({
      type: props.parentData.type,
      content: '',
      fileUrl:'',
      parent:{
        id:props.parentData.id
      },
      receiver:{
        id: parseInt(route.params.userId)
      }
    });
  
    const fileList = ref([]);
    const errors = ref({});
    let url = ref(null);
  
    const handleSubmit = () => {
      console.log("FormData",formData.value)
      errors.value = {}; // Clear previous validation errors
  
      // Validate the "category" field
      
  
      // Validate the "content" field
      if (!formData.value.content) {
        errors.value.content = 'Please enter the content';
      }
  
    
  
      // Check if there are any validation errors
      if (Object.keys(errors.value).length === 0) {
        // Form is valid, proceed with submission
        feedbackSerive.createFeedback(formData.value).then(res=>{
          props.setShowReplay(null)
         emit('replay-create')
        }).catch(err=>{
  
        })
        
      } else {
        // Form validation failed, handle errors
        console.error('Form validation failed:', errors.value);
      }
    };
  
    const handleChange = (info) => {
    console.log(info)
          if (info.file.status === 'removed') {
            FileService.deleteFile(url.value)
              .then((res) => {
               
              })
              .catch((err) => {});
          }
        };
    
        const beforeUpload = (file) => {
          const token = localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken');
    
          // Manually set headers for the request
          file.headers = {
            Authorization: 'Bearer ' + token,
            // Other headers...
          };
    
          const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
          if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
          }
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
          }
          if (isJpgOrPng && isLt2M) {
            const formDataFile = new FormData();
            formDataFile.append('file', file);
            
  
            FileService.createFile(formDataFile)
              .then((res) => {
                formData.value.fileUrl = res.data.fileName
               
              })
              .catch((err) => {
               
              });
          }
    
          return false;
        };
    
        const handlePreview = (file) => {
          // Handle image preview if needed
         
        };
  
    return {
      formData,
      errors,
      handleSubmit,
      handleChange,
      handlePreview,
      beforeUpload,
      fileList
    };
  }
  };
  </script>
  <style scoped>
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(249, 172, 24);
    border: 0px none rgb(249, 172, 24);
    border-radius: 0px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(249, 172, 24);
  }
  ::-webkit-scrollbar-thumb:active {
    background: rgb(249, 172, 24);
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    border: 0px none #ffffff;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-track:hover {
    background: transparent;
  }
  ::-webkit-scrollbar-track:active {
    background: transparent;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  ::v-deep .ant-spin .ant-spin-dot-item {
    background-color: rgb(249, 172, 24) !important;
  }
  </style>
  