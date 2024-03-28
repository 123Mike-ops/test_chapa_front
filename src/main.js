/*
 * @Descripttion: 
 * @version: 
 * @Author: Agua Man
 * @Date: 2023-11-14 00:03:28
 * @LastEditors: Agua Man
 * @LastEditTime: 2023-11-14 19:51:47
 */
import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import router from './router';
import Antd from 'ant-design-vue';
import Vuex from 'vuex'
// import 'ant-design-vue/dist/antd.css';
import './styles/main.css'
import i18n from './lang';// Import i18n instance
import store from './store';
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import {createMetaManager} from 'vue-meta'
import vue3GoogleLogin from 'vue3-google-login'


const app = createApp(App);
store.dispatch('user/initializeApp');
app.use(createMetaManager());
app.use(router);
app.use(Antd);
app.use(store)
app.use(i18n); // load i18n
app.use(VueViewer);
app.use(vue3GoogleLogin, {
    clientId: '14594716155-4lrb3p088bg8gpin3lguv175kus3orvr.apps.googleusercontent.com'
  })
app.mount('#app');

