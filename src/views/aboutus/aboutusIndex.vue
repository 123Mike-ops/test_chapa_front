<template>
    <div class="flex flex-col " >
        <div  class="flex flex-col  md:flex md:flex-row justify-center w-full" >
            <div class=" w-full  flex flex-col md:w-1/2 p-5" >
                <div><h3 class="font-bold text-xl">Megenagna is the best place to sell anything to real people.</h3></div> 
                <div class="mt-5"><p class="text-gray-600 text-lg">It is the biggest free online classified with an advanced security system. We provide a simple hassle-free solution to sell and buy almost anything.</p></div>
                <div class="flex flex-col justify-start mt-5 toc">
                    <small class="text-gray-400">Table of Contents</small>
                    <a href="#1" class="flex flex-row w-full  justify-between p-3 items-center bg-gray-200 mt-2" >
                       <div><label>How to sell on Megenagna?</label></div>
                       <div><DownOutlined /></div>
                    </a>
                    <a  href="#2" class="flex flex-row w-full  justify-between p-3 items-center bg-gray-200 mt-2" >
                       <div><label>How to buy on Megenagna?</label></div>
                       <div><DownOutlined /></div>
                    </a>
                    <a href="#3" class="flex flex-row w-full  justify-between p-3 items-center bg-gray-200 mt-2" >
                       <div><label>Safety</label></div>
                       <div><DownOutlined /></div>
                    </a>
                    <a  href="#4" class="flex flex-row w-full  justify-between p-3 items-center bg-gray-200 mt-2" >
                       <div><label>Sell like a pro!</label></div>
                       <div><DownOutlined /></div>
                    </a>
                </div>

            </div>
            <div class="w-full p-5 md:w-1/2">
                <img  class="" src="../../assets/shopOnline.png"/>
            </div>

        </div>
        <div class="content pt-5">

                    <div id="1" class="flex flex-col  md:flex md:flex-row justify-center w-full" >
                        <div class="w-full p-5 md:w-1/2">
                            <img  class="" src="../../assets/sale.png"/>
                        </div>

                        <div class="w-full  flex flex-col md:w-1/2 p-5" >
                            <div><h3 class="font-bold text-3xl">How to sell on Megenagna?</h3></div> 
                            <div><h3 class="font-bold text-lg mt-3 text-green-500">1. Register</h3></div>
                            <div class="mt-2"><p class="text-gray-600 text-lg">
                                Register using your e-mail and phone number (or do it via Facebook or Google). Make sure you’re entering a correct phone number, so your clients could reach you!.
                            </p></div>
                            <div><h3 class="font-bold text-lg mt-3 text-gray-700">2. Make photos of your item.</h3></div>
                            <div class="mt-2"><p class="text-gray-600 text-lg">
                                Feel free to make a lot of photos using your smartphone. Make sure they show your item in the best light.
                                            </p></div>
                            <div><h3 class="font-bold text-lg mt-3 text-gray-700">3. Press <span class="text-lg  text-green-500">POST .</span></h3></div>
                            <div class="mt-2"><p class="text-gray-600 text-lg">
                                Feel free to make a lot of photos using your smartphone. Make sure they show your item in the best light.
                                            </p></div>
                            <div><h3 class="font-bold text-lg mt-3 text-gray-700">4. Answer the messages and calls from your clients!</h3></div>
                            <div class="mt-2"><p class="text-gray-600 text-lg">
                                If everything is ok with your advert, it’ll be on Jiji in a couple of hours after sending to moderation. We’ll send you a letter and notification when your advert goes live. Check your messages and be ready to earn money!
                                                            </p></div>

                                            
                            <div class=" mt-5 p-3 bg-custom_green-100 rounded-lg w-52" >
                                <router-link :to="{ name: 'PostAd' }"  class="flex justify-center font-bold text-white">
                                    POST
                                </router-link>
                                
                            </div>

                        </div>
                    
                    </div>

                    <div id="2" class="flex flex-col  md:flex md:flex-row justify-center w-full" >
                    

                        <div class="w-full  flex flex-col md:w-1/2 p-5" >
                            <div><h3 class="font-bold text-3xl">How to buy on Megenagna?</h3></div> 
                            <div><h3 class="font-bold text-lg mt-3 ">1. Search for the item.</h3></div>
                            <div class="mt-2"><p class="text-gray-600 text-lg">
                                Find what you need using search panel and filters. We have over a million adverts, choose exactly what you are looking for..
                            </p></div>
                            <div><h3 class="font-bold text-lg mt-3 text-gray-700">2. Contact a seller.</h3></div>
                            <div class="mt-2"><p class="text-gray-600 text-lg">
                                You may use chat on Jiji or call them via phone. Discuss all the details, negotiate about the price.
                                            </p></div>
                            <div><h3 class="font-bold text-lg mt-3 text-gray-700">3. Take your item or order a delivery.</h3></div>
                            <div class="mt-2"><p class="text-gray-600 text-lg">
                                We check our sellers carefully, but it’s always better to check twice, right? Meet a seller in public place and be sure to pay only after collecting your item.
                                            </p></div>
                            <div><h3 class="font-bold text-lg mt-3 text-gray-700">4. Leave your feedback about the seller.</h3></div>
                            <div class="mt-2"><p class="text-gray-600 text-lg">
                                Feel free to tell us about your purchase. Your feedback will be published online on the seller’s page and will be very helpful for other buyers. Let’s build a safe and professional business community together!
                                                                            </p></div>

                                            
                            <div class=" mt-5 p-3 bg-custom_green-100 rounded-lg w-52" >
                                <router-link :to="{ name: 'Home' }"  class="flex justify-center font-bold text-white">
                                    Go Shoping
                                </router-link>
                                
                            </div>

                        </div>

                        <div class="w-full p-5 md:w-1/2">
                            <img  class="mt-5" src="../../assets/buy.jpg"/>
                        </div>
                    
                    </div>
                
                    <div id="3" class="flex flex-col  md:flex md:flex-row justify-center w-full" >
                    
                        <div class="w-full p-5 md:w-1/2 ">
                        <img  class="mt-5" src="../../assets/security.png"/>
                    </div>
                    <div class="w-full flex flex-col md:w-1/2 p-5" >
                        <div><h2 class="font-bold text-3xl">Safety</h2></div> 
                        <div><h3 class="font-bold text-lg mt-3 ">1. General.</h3></div>
                        <div class="mt-2"><p class="text-gray-600 text-lg">
                            We are highly focused on the security and can solve any issues in short-terms. That’s why we ask you, kindly, to leave a review after purchasing. If you run into any problems with a seller, you can report us and Jiji Team will check this seller as soon as possible..
                        </p></div>
                        <div><h3 class="font-bold text-lg mt-3 text-gray-700">2. Personal safety tips.</h3></div>
                        <div class="mt-2 flex flex-col">
                            <div class="text-gray-600 text-lg">- Do not pay in advance, even for the delivery</div>
                            <div class="text-gray-600 text-lg">- Try to meet at a safe, public location</div>
                            <div class="text-gray-600 text-lg">- Check the item BEFORE you buy it</div>
                            <div class="text-gray-600 text-lg">- Pay only after collecting the item</div>
                            
                        </div>
                        

                    </div>

                    
                    
                </div>
                <div id="4" class="flex flex-col  md:flex md:flex-row justify-center w-full" >
                    
                    
                    <div class="w-full flex flex-col md:w-1/2 p-5" >
                        <div><h2 class="font-bold text-3xl">Sell like a pro!</h2></div> 
                        <div><h3 class="font-bold text-lg mt-3 ">1. Pay attention to the details.</h3></div>
                        <div class="mt-2"><p class="text-gray-600 text-lg">
                            Make good photos of your goods, write clear and detailed description.              </p></div>
                        <div><h3 class="font-bold text-lg mt-3 text-gray-700">2. Answer quickly.</h3></div>
                        <div class="mt-2 flex flex-col">
                        <div class="text-gray-600 text-lg">Don’t make your buyer wait for your message for days.</div>    
                        </div>
                        

                    </div>
                    <div class="w-full md:w-1/2 ">
                        <img  class="mt-5" src="../../assets/pro.png"/>
                    </div>

                    
                    
                </div>
      </div>
      <div class="flex flex-row justify-center w-full" >
           
        
           <router-link :to="{ name: 'Frequently' }">Still have  questions? Read FAQ.</router-link>
 
         
          
       </div>
    </div>
</template>
<style scoped>
.content {
  margin-top: 50px;
}
.toc {

  top: 20px;
}
</style>

<script>
import { GoogleOutlined } from '@ant-design/icons-vue';
import { DownOutlined} from '@ant-design/icons-vue';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons-vue';
import { DownloadOutlined } from '@ant-design/icons-vue';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import { RouterLink } from 'vue-router';



export default {
  components: {

    'DownOutlined': DownOutlined,
    RouterLink
   


  },

  setup() {

    const setupScrolling = () => {
      document.querySelectorAll('.toc a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const offsetTop = targetElement.offsetTop;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
    };

    const scrollToSection = (sectionNumber) => {
      const sectionRef = sectionRefs.value[`section${sectionNumber}`];
      if (sectionRef) {
        const offsetTop = sectionRef.offsetTop;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    };

    const sectionRefs = ref({});

    onMounted(() => {
      setupScrolling();
    });

  
  
   
   

    

    return {
        scrollToSection,
        sectionRefs
    };
  },
}
</script>
