<template>
    <a-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      @preview="handlePreview"
      @change="handleChange"
      :before-upload="beforeUpload"
    >
      <div v-if="fileList.length < 1">
        <div style="margin-top: 8px"   v-if="store.state.user?.userData?.imageUrl==='' || store.state.user?.userData?.imageUrl===null || store.state.user?.userData?.imageUrl===undefined " >
     Upload</div>
        <img :src="baseUrl + '/api/images/' + store.state.user?.userData?.imageUrl" alt="" 
        v-if="store.state.user?.userData?.imageUrl!=='' && store.state.user?.userData?.imageUrl!==null && store.state.user?.userData?.imageUrl!==undefined " 
      class="w-24 h-24" >
  
      </div>
    </a-upload>
  </template>
  
  <script>
  /* eslint-disable */
  import { ref, } from 'vue';
  import { message } from 'ant-design-vue';
  import FileService from '../../views/setting/file.service';
  import { Validation } from '../../modal/validation.model';
  import {useStore} from 'vuex'
  export default {
    name: 'ProfilePicUpload',

    setup(props, { emit }) {
      const store = useStore();
      const fileList = ref([]);
      const loading = ref(false);
      const validation = ref(new Validation());
      let imageCounter = ref(0);
      let url = ref(null);
      const baseUrl = process.env.VUE_APP_SERVER_URL;
  
      const handleChange = (info) => {
        imageCounter.value = info.fileList.length;
        emit('updateImageCounter', imageCounter.value);
  
        if (info.file.status === 'removed') {
          FileService.deleteFile(url.value)
            .then((res) => {
             emit('remove-url')
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
          const formData = new FormData();
          formData.append('file', file);
          imageCounter.value = imageCounter.value + 1;
  
          FileService.createFile(formData)
            .then((res) => {
              url.value = res.data
             emit('set-url',url.value)
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
        fileList,
        loading,
        validation,
        imageCounter,
        handleChange,
        beforeUpload,
        handlePreview,
        baseUrl,
        store
      };
    },
  };
  </script>
  
  <style scoped>
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  </style>
  