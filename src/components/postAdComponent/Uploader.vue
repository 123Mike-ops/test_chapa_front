<template>
   <a-upload
      v-model:file-list="fileList"
      list-type="picture-card"
      @preview="handlePreview"
      @change="handleChange"
      :before-upload="beforeUpload"
      :multiple="true"

    >
      <div v-if="fileList.length < 10">
       
        <div style="margin-top: 8px">Upload</div>
      </div>
    </a-upload>
</template>

<script>
/* eslint-disable */ 
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import FileService from '../../views/setting/file.service'
import {Validation} from '../../modal/validation.model'
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  props:['imageUrl'],
  name: 'UploaderComponent',
  data() {
    return {
      fileList: [],
      loading: false,
      validation:new Validation(),
      imageCounter:0
    
      
    };
  },
  
  methods: {
    handleChange(info) {
      console.log("info",info.fileList.length);
  console.log("info", info.file.status);
console.log(this.imageUrl)
     this.imageCounter=info.fileList.length;
     this.$emit('updateImageCounter',this.imageCounter);
     if(info.file.status == "removed"){
      this.imageUrl.map(img=>{
        if(img.id==info.file.uid){
          FileService.deleteFile(img).then(res=>{
       // this.imageUrl = this.imageUrl.filter(img=>img.id !=info.file.uid);
       this.$emit('remove-image', img.id);
      }).catch(err=>{

      })
        }
      })
   
     
     }
},
    beforeUpload(file) {
console.log('Bearer ' , (localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken')))

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
      if(isJpgOrPng && isLt2M){
        const formData = new FormData();
        formData.append("file",file)
        this.imageCounter=this.imageCounter + 1;
        console.log("image at uploader",this.imageCounter )
        
          FileService.createFile(formData).then(res=>{
          this.imageUrl.push({
            id:file.uid,
            fileName:res.data.fileName,
            fileUrl:res.data.fileUrl
          })

            console.log("data ", this.imageUrl)
        }).catch(err=>{
          console.log(err)
        })

       
      }
      return false;
    },
    handlePreview(file) {
      // Handle image preview if needed
      console.log('Preview:', file);
    },
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
