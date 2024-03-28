<template>
  <div
    class="bg-white rounded-sm bottom-4 mt-4 border-black mx-6 relative flex flex-col sm:flex-row items-start shadow-md hover:shadow-2xl  sm:py-0"
  >
    <RouterLink
      :to="{ name: 'PostDetail', params: { postId: advert.id } }"
      @mouseover="showElement"
      @mouseout="hideElement"
      class="w-full flex flex-col sm:flex-row items-start shadow-md hover:shadow-2xl py-3 sm:py-0"
    >
      <div class="">
        <img
          :src="baseUrl + '/api/images/' + advert.imageUrls[0]?.name"
          alt=""
          class="w-full sm:h-36 sm:w-52"
        />
      </div>
      <div class="ml-0 md:ml-5 pl-2 md:pl-0 ">
        <h2 class="text-lg mr-0 lg:mr-4 sm:text-xl  text-custom_green-100 mb-6">
          {{ advert.title }}
        </h2>
        <div class="flex items-center mb-6 text-black">
          <span class="font-bold mr-2"
            >ETB
            {{advert.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
          </span>
         |
          <span class="flex items-center ml-2"
            ><EyeOutlined class="mr-1 text-custom_green-100" />
            {{ advert.countViews }}</span
          >
        </div>
        <div class="flex items-center w-full ">
          <div v-if="advert.isAvailable" class="flex items-center justify-center ">
            <p type="secondary" class="text-green-500 pr-2  font-bold">
              {{ $t("post_detail.available") }} 
            </p> |
          </div>
           
          <div v-if="!advert.isAvailable" class="flex items-center  ">
            <p type="secondary" class="text-red-500  pr-2 font-bold">
              {{ $t("post_detail.unavailable")  }} 
            </p> |
          </div>
           
          <div v-if="!advert.isHide" class="flex items-center  ">
            <p type="secondary" class="text-green-500 px-2 font-bold">
              {{ $t("post_detail.unhidden") }} 
            </p> 
          </div>
          
          <div v-if="advert.isHide" class="flex items-center  ">
            <p type="secondary" class="text-red-500  font-bold">
              {{ $t("post_detail.hidden") }}
            </p>
          </div>
        </div>
      </div>
    </RouterLink>
    <div class="absolute top-2 right-2 flex items-center justify-end  w-40">
      <a-dropdown :trigger="['hover']" placement="bottomLeft" class="w-full">
        <a class="ant-dropdown-link w-full flex justify-end" @click.prevent>
         
          <MoreOutlined  class="text-2xl w-full flex justify-end "/>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <div v-if="advert.isHide">
                <a-button
                  type="secondary"
                  class="text-green-500 w-40 font-bold border-2 border-green-500"
                  @click="hide(advert.id)"
                  >{{ $t("post_detail.unhide") }}</a-button
                >
              </div>
              <div v-if="!advert.isHide">
                <a-button
                  type="secondary"
                  class="text-red-500 w-40 font-bold border-2 border-red-500"
                  @click="hide(advert.id)"
                  >{{ $t("post_detail.hide") }}</a-button
                >
              </div>
            </a-menu-item>
            <a-menu-item key="1">
              <div v-if="!advert.isAvailable">
                <a-button
                  type="secondary"
                  class="text-green-500 w-40 font-bold border-2 border-green-500"
                  @click="confirm(advert.id)"
                  >{{ $t("post_detail.mark_available") }}</a-button
                >
              </div>
              <div v-if="advert.isAvailable">
                <a-button
                  type="secondary"
                  class="text-red-500 w-40 font-bold border-2 border-red-500"
                  @click="confirm(advert.id)"
                  >{{ $t("post_detail.mark_unavailable") }}</a-button
                >
              </div>
            </a-menu-item>
            <a-menu-item key="2">
              <div >
                <a-button
                  type="secondary"
                  class="text-yellow-500 w-40 font-bold border-2 border-yellow-500"
                  @click="editConfirm(advert.id)"
                  >{{ $t("post_detail.edit") }}</a-button
                >
              </div>
  
            </a-menu-item>
            
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <a-modal v-model:open="open" :title='$t("post_detail.edit_confirm")'   @ok="handleOk">
     
    </a-modal>
  </div>
</template>

<script>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useRoute,useRouter } from 'vue-router';
import {
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  MoreOutlined,
} from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import PostSerivce from "../../views/setting/post.service";
import { useI18n } from 'vue-i18n';
export default {
  props: ["advert", "updateAvailablity","updateHideUnHide"],
  name: "MyPostsList",
  components: {
    RouterLink,
    EditOutlined,
    DeleteOutlined,
    CloseOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    MoreOutlined,
    Modal,
  },
  setup(props) {
    const isHovered = ref(false);
    const baseUrl = process.env.VUE_APP_SERVER_URL;
    const {t} = useI18n();
    const selectedPost=ref('');
    const showElement = () => {
      isHovered.value = true;
    };

    const hideElement = () => {
      isHovered.value = false;
    };

    const open = ref(false);
    const showModal = () => {
      open.value = true;
    };
    const handleOk = e => {
      console.log(e);
      editAd(selectedPost.value);
      open.value = false;
    };
const router = useRouter();
    
    function markUnavailableOrAvailable(id) {
      PostSerivce.markUnavailableOrAvaible(id)
        .then(() => {
          props.updateAvailablity(id);
        })
        .catch(() => {
          console.log("Error");
        });
    }

    function markHideUnhide(id) {
      PostSerivce.markHideUnhide(id)
        .then(() => {
          props.updateHideUnHide(id);
        })
        .catch(() => {
          console.log("Error");
        });
    }

    function editAd(id) {


      router.push({ name: 'postAdEdit', params: { id: id } });


    }

    const confirm = (id) => {
      let content = props.advert?.isAvailable ? t('post_detail.unavailable_conform') : t('post_detail.available_conform');
      
      Modal.confirm({
        title: "Confirm",
        content: content,
        okText: "Ok",
        cancelText: "Cancel",
        onOk: () => markUnavailableOrAvailable(id),
      });
    };

    const editConfirm = (id) => {
      // let content = t('post_detail.edit_confirm');
      showModal();
      selectedPost.value=id;
  //  Modal.confirm({
  //       title: "Confirm",
  //       content: content,
  //       okText: "Ok",
  //       cancelText: "Cancel",
  //       onOk: () => { editAd(id);    },
  

  //     });
    };

    const hide = (id) => {
      let content = props.advert?.isHide ? t('post_detail.unhide_conform') : t('post_detail.hide_conform');
      
      Modal.confirm({
        title: "Confirm",
        content: content,
        okText: "Ok",
        cancelText: "Cancel",
        onOk: () => markHideUnhide(id),
      });
    };

    return {
      isHovered,
      baseUrl,
      showElement,
      hideElement,
      markUnavailableOrAvailable,
      confirm,
      hide,
      editConfirm,
      selectedPost,
      showModal,
      handleOk,
      open
    };
  },
};
</script>
