import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/home-index.vue";
import LoginPage from "../views/account/login/loginPage.vue";
import RegisterPage from "../views/account/registration/registerIndex.vue";
import Profile from "../views/profile";
import Advert from "../views/profile/advert";
import Feedback from "../views/profile/feedback";
import Follower from "../views/profile/follower";
import MobileCategoryDetail from "../components/mobileCategoryNav/mobileCategoryDetail.vue";
import PostDetail from "../views/post/postIndex.vue";
import MessagePage from "../views/messages/index.vue";
import Notification from "../views/profile/notification";
import Performance from "../views/profile/performance";
import Frequently from "../views/frequenctly-question";
import CategoryDetail from "../views/categoryDetail/categoryDetailIndex.vue";
import PostAdPage from "../views/postAd/index.vue";
import PostAdEdit from "../views/editAd/index.vue";
import MySave from "../views/profile/my-save";
import store from "../store/index";
import AddPostAdPage from '../views/formSubmit';
import UserFeedBack from '../views/userFeedback'
import Settings from '../views/settings'

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home/home-index.vue"),
    meta: {
      title: 'Home Megenagna Shopping',
          content: "Home  Megenagna Shopping  has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: {
      title: 'Login Megenagna Shopping',
          content: " Login Megenagna Shopping Megenagna has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
    ,
  },

  {
    path: "/about",
    name: "Aboutus",
    component: () => import("../views/aboutus/aboutusIndex.vue"),
    meta: {
      title: 'About Megenagna Shopping',
          content: "About  Megenagna Shopping  has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
  },

  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
    meta: {
      title: 'Register Megenagna Shopping',
    
          content: "Register Megenagna Shopping  has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
      
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: { requiresAuth: false,
      title: 'Setting Megenagna Shopping',
          content: "Profile Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        },
    children: [
      {
        path: "/personal-detail",
        name: "PersonalDetail",
        component: () => import("../views/settings/personal-detail/index.vue"),
        meta: {requiresAuth: true,
          title: 'Personal Detail Megenagna Shopping',
              content: "Home  Megenagna Shopping  has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
            }
      },
      {
        path: "/change-password",
        name: "ChangePassword",
        component: () => import("../views/settings/change-password/index.vue"),
        meta: {requiresAuth: true,
          title: 'Change Password Megenagna Shopping',
              content: "Home  Megenagna Shopping  has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
            }
      },
      {
        path: "/change-phone-number",
        name: "ChangePhoneNumber",
        component: () => import("../views/settings/change-phone-number/index.vue"),
        meta: {requiresAuth: true,
          title: 'Change Phone Number',
              content: "Change  Phone Shopping  has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
            }
      },
      {
        path: "/change-email",
        name: "ChangeEmail",
        component: () => import("../views/settings/change-email/index.vue"),
        meta: {requiresAuth: true,
          title: 'Change Email',
              content: "Change Email Shopping  has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
            }
      },
      {
        path: "/company",
        name: "CompanyDetail",
        component: () => import("../views/settings/company/index.vue"),
        meta: {
          // requiresAuth: true,
          title: 'Company',
              content: "Company Shopping  has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
            }
      },
     
    ]
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true,
      title: 'Profile Megenagna Shopping',
          content: "Profile Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        },
    children: [
      {
        path: "advert",
        name: "Advert",
        component: ()=>import('../views/profile/advert'),
         meta: { requiresAuth: true,
           title: 'Advert Megenagna Shopping',
           content: "Advert Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
          }
      },
      {
        path: "feedback",
        name: "Feedback",
        component: ()=>import('../views/profile/feedback'),
        meta: { requiresAuth: true,
          title: 'Feedback Megenagna Shopping',
              content: "Feedback Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
            }
      },
      {
        path: "follower",
        name: "Follower",
        component: ()=>import('../views/profile/follower'),
        meta: { requiresAuth: true,
          title: 'Follower Megenagna Shopping',
              content: "Follower Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
            }
      },
      
      {
        path: "my-save",
        name: "MySave",
        component: ()=>import('../views/profile/my-save'),
        meta: { requiresAuth: true,
        title: 'MySave Megenagna Shopping',
            content: "MySave Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
          }
        
      },
      {
        path: "performance",
        name: "Performance",
        component: ()=>import('../views/profile/performance'),
        meta: { requiresAuth: true,
          title: 'Performance Megenagna Shopping',
        
              content: "Performance Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
            }
          
      },
      {
        path: "notification",
        name: "Notification",
        component: ()=>import('../views/profile/notification'),
        meta: { requiresAuth: true,
          title: 'Notification Megenagna Shopping',
      
              content: "Notification Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
            }
      },
    
    ],
  },
  {
    path: "/dashboard/:userId",
    name: "Dashboard",
    component: ()=>import('../views/profile/dashboard/dashboard-index'),
    meta: { 
      title: 'Seller Dashboard Megenagna Shopping',
  
          content: " Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
  },
  {
    path: "/mobile-cat-detail/:categoryId",
    name: "MobileCat",
    component: MobileCategoryDetail,
    meta: {
      title: 'Category Megenagna Shopping',
          content: "Category Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
      
    
  },
  {
    path: "/profile-messages",
    name: "Messages",
    component: MessagePage,
    meta: { requiresAuth: true,
      title: 'Chat Megenagna Shopping',
          content: "Chat Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
  },

  {
    path: "/user-feedback",
    name: "UserFeedback",
    component: UserFeedBack,
    meta: {
      title: 'User Feedback',
          content: "Chat Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        },

        children: [
          {
            path: ":userId",
            name: "FeedbackList",
            component: ()=>import('../views/userFeedback/feedback-list'),
             meta: { requiresAuth: false,
               title: 'Feedback List',
               content: "Feedback List Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
              }
          },

          {
            path: ":userId/create",
            name: "FeedBackAdd",
            component: ()=>import('../views/userFeedback/feedback-add'),
             meta: { requiresAuth: false,
               title: 'Feedback Add',
               content: "Feedback List Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
              }
          },
        ]
  },
  {
    path: "/post-detail/:postId",
    name: "PostDetail",
    component: PostDetail,
    meta: {
      title: 'Post Detail Megenagna Shopping',
          content: "Post Detail Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
  },
  {
    path: "/frequenctly-question",
    name: "Frequently",
    component: Frequently,
    meta: {
      title: 'Fqa Megenagna Shopping',
          content: "Fqa Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
  },
  {
    path: "/category-detail/:categoryId",
    name: "CategoryDetail",
    component: CategoryDetail,
    meta: {
      title: 'Category Megenagna Shopping',
          content: "Category Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
  },
  {
    path: "/category-detail/subCategory/:subCategoryId",
    name: "SubCategoryDetail",
    component: CategoryDetail,
    props: (route) => ({ subCategoryId: route.params.subCategoryId, ...route.query }),
    meta: {
      title: 'Category Megenagna Shopping',
          content: "Category Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
  },
{
    path: '/post-Ad',
    name: 'PostAd',
    component:PostAdPage,
    meta: { 
      requiresAuth: true,
      title: 'PostAd Megenagna Shopping',
          content: "PostAd Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
  },
  {
    path: '/post-Ad/:id',
    name: 'postAdEdit',
    component:PostAdEdit,
    meta: { 
      requiresAuth: true,
      title: 'PostAd Edit Megenagna Shopping',
          content: "PostAd Megenagna Shopping has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
  },
  
  {
    path: '/:catchAll(.*)',
    component: ()=>import('../views/page-not-found'),
    meta: { 
     
      title: 'Page not Found',
          content: "Megenagna has quickly become a popular online marketplace in Ethiopia, connecting buyers and sellers across categories like real estate, electronics, and more. Home buyers can browse apartment and house listings on Megenagna, with options to filter by location, price, size and other attributes. Real estate sellers can create listings with photos and descriptions to advertise properties for sale or rent to prospective buyers. The electronics category showcases the latest gadgets and tech products available to purchase online and have delivered anywhere in Ethiopia. Electronics sellers also use Megenagna for setting up online storefronts and managing orders. With competitive pricing and reliable shipping, Megenagna makes it easy for Ethiopians to buy or sell real estate like apartments and homes, electronics like smartphones and laptops, as well as fashion items, home goods, books, and more. The user-friendly website and apps provide convenience to buyers and sellers, contributing to the rapid adoption of ecommerce and online shopping in Ethiopia. By facilitating transactions for high-demand categories like real estate and electronics, Megenagna has become a trusted online marketplace platform."
        }
  },
];

const router = createRouter({
  history: createWebHistory(),
  base:'/',
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  console.log(to.path, store.state.user.authenticated);
  document.title = to.meta.title || 'Default Title'
  const metaDescriptionTag = document.querySelector('meta[name="content"]')
  if (metaDescriptionTag) {
    metaDescriptionTag.setAttribute('content', to.meta.content || 'Default Description')
  }
  if (requiresAuth && !store.state.user.authenticated) {
    next("/login");
  } else if (
    (to.path === "/login" || to.path === "/register") &&
    store.state.user.authenticated
  ) {
    // User is already authenticated, redirect to another route
    next("/");
  } else {
    // Continue with the navigation
    next();
  }
});

export default router;
