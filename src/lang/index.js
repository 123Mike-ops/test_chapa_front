/*
 * @Descripttion:
 * @version:
 * @Author: Agua Man
 * @Date: 2023-11-14 17:30:21
 * @LastEditors: Agua Man
 * @LastEditTime: 2023-11-14 21:43:39
 */

// below only work with i18n v9....
import { createI18n } from 'vue-i18n';

// import the language package
import en from "./locale/en.json";
import Amharic from "./locale/amharic.json";
import zhCN from "./locale/zh-CN.json";
import zhTW from "./locale/zh-TW.json";

// Language packs are classified according to locale
const messages = {
  Amharic,
  en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
};

// Create VueI18n instance with options and export
const i18n = createI18n({
  locale: "en", // Set defualt as English
  messages, // Set locale corresponding information  
  legacy: false, // if compositionAPI be supported, legacy must be 'false';
  globalInjection: true, // Global registration method $t
});

export default i18n;
