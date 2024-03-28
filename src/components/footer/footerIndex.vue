<template>
    <div class="flex flex-col bg-gray-50 p-10 mt-10 bg-gradient-to-r from-gray-100 w-full">
        <div class=" md:flex flex-wrap justify-between">
            <div class="flex flex-col">
                <div class="font-bold text-lg mb-5">
                    <h2 class="text-custom_green-100">{{$t('footer.megenagna')}}</h2>
                </div>
                <div>
                    <p class="max-w-sm">{{$t('footer.empower')}}</p>
                </div>
                <div class="flex  flex-row justify-left mt-5 text-lg">
                    <div class="  ">
                        <FacebookOutlined class="text-3xl mr-5 text-custom_green-100" />
                    </div>
                    <div class="">
                        <TwitterOutlined class="text-3xl mr-5 text-custom_green-100" />
                    </div>
                    <div class="  ">
                        <LinkedinOutlined class="text-3xl mr-5 text-custom_green-100" />
                    </div>
                    <div class="  ">
                        <InstagramOutlined class="text-3xl mr-5 text-custom_green-100"/>
                    </div>
                </div>
            </div>
            <div class=" flex flex-col items-start mt-5  md:ml-10 md:mt-0 ">
                <div class="font-bold text-lg mb-5">
                    <h3 class="text-custom_green-100">{{$t('footer.helpSupport')}}</h3>
                </div>
                <div>
                    <span>. {{$t('footer.postAdvert')}}</span>
                </div>
                <div class="mt-1">
                    <span>. {{$t('footer.browseItems')}}</span>
                </div>
                <div class="mt-1">
                    <span>. {{$t('footer.addToWishList')}}</span>
                </div>
                <div class="mt-1">
                    <span>. {{$t('footer.browseSellers')}}</span>
                </div>
                <div class="mt-1">
                    <span>. {{$t('footer.giveReport')}}</span>
                </div>
               
            </div>
            <div class="flex flex-col items-start  mt-5  md:ml-10  md:mt-0 ">
                <div class="font-bold text-lg mb-5">
                    <h3 class="text-custom_green-100">{{$t('footer.information')}}</h3>
                </div>
                <div>
                    <span>. {{$t('footer.ourStory')}}</span>
                </div>
                <div class="mt-1">
                    <span>. {{$t('footer.carriers')}}</span>
                </div>
                <!-- <div class="mt-1">
                    <span>. Privacy Policy</span>
                </div>
                <div class="mt-1">
                    <span>. Terms &amp; Conditions</span>
                </div> -->
         
                <!-- <div class="mt-1">
                    <span>. Contact Us</span>
                </div> -->
                <RouterLink class="" :to="{ name: 'Frequently' }">
        
        <span>. {{ $t('profile.frequenctly-question') }}</span>
      </RouterLink>
            </div>
            <div class="flex flex-col items-start mt-5  md:ml-10 md:mt-0">
                <div class="font-bold text-lg mb-5">
                    <h3 class="text-custom_green-100">{{$t('footer.contactus')}}</h3>
                </div>
                <div>
                    <small>{{$t('footer.gotQue')}}? {{$t('footer.callUs')}}</small>
                </div>
                <div class="font-bold text-lg mb-5">
                    <span>+251-912-742370</span>
                </div>
                <div>
                    <MailOutlined />
                    <span class="ml-2">office@megenagna.et</span>
                </div>
                <div>
                   
                    <p>.24 {{$t('footer.megenagna')}},{{$t('footer.location')}}</p>
                </div>
            </div>
        </div>
        <div class="mt-5">
            <hr />
        </div>
        <div class="flex justify-between flex-row mt-3">
            <div>
                <span>Copyright 2018-2023 © Deepland.All Rights Reserved.</span>
            </div>
           
        </div>
    </div>
</template>
<script>

import { FacebookOutlined,TwitterOutlined,LinkedinOutlined,InstagramOutlined,MailOutlined,CaretDownOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    'FacebookOutlined': FacebookOutlined,
    'TwitterOutlined': TwitterOutlined,
    'LinkedinOutlined':LinkedinOutlined,
    'InstagramOutlined':InstagramOutlined,
    'MailOutlined':MailOutlined,
    'CaretDownOutlined':CaretDownOutlined
   

    // You can use any name you prefer for the component
  },
}
</script>