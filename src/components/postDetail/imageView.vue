<template>
    <div>
      <a-modal
      v-model:visible="open"
      title="Basic Modal"
      width="100%"
      wrap-class-name="full-modal"
     
      @cancel="handleCancelInModal"
     
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </a-modal>
    </div>
  </template>
  
  <script>
  import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'ImageView',
  props: ["open", "handleCancel"],
  setup(props,{ emit }) {
   

    const handleCancelInModal = () => {
      emit('handleCancel'); // Corrected emit usage
    };

    return {
      handleCancelInModal
    };
  },
});
  </script>
  
  <style scoped>
  .full-modal {
    .ant-modal {
      max-width: 100%;
      top: 0;
      padding-bottom: 0;
      margin: 0;
    }
    .ant-modal-content {
      display: flex;
      flex-direction: column;
      height: calc(100vh);
    }
    .ant-modal-body {
      flex: 1;
    }
}
  </style>
  