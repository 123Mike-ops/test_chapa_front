<template>
  <div class="flex flex-col justify-center items-center w-full">
 <div class="bg-gray flex justify-center items-center p-10 bg-black text-green-300 w-full text-3xl">Demo Ecommerce</div>
   <div class="bg-yellow-300 p-3 rounded-lg text-green-900 w-1/2"><h2>This are you bills</h2></div>
   <div class="flex flex-col p-10 ">
    <div>House Rent: 3000 birr</div>
    <div>Electricity: 300 birr</div>
    <div>Water: 30 birr</div>

    <div><h1>Total</h1>ETB 3330</div>
    <div class="p-14"><button class="bg-green-300 rounded-lg font-bold p-5" @click="payNow">Pay Now</button></div>
        
   </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios'

export default {
  methods: {
    payNow() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer CHASECK_TEST-5CQWS1f7qo7lXWn4ZdfdtKgWxf1hW7DA");
      myHeaders.append("Content-Type", "application/json");

      const requestData = {
        "amount": "3330",
        "currency": "ETB",
        "tx_ref": "chewataass3s3tss6sessst-6669",
        "return_url": "https://www.google.com/"
      };


      axios.post("http://localhost:3000/api/proxy", requestData)
  .then(response => {
    console.log(response.data.data);
    if (response.data.data && response.data.data.checkout_url) {
   
      window.location.href = response.data.data.checkout_url;
    } else {
      console.error('No checkout URL found in the response data');
    }

  })
  .catch(error => {
    console.error('Error:', error);
  });
    }
  }
};
</script>

<style>

</style>
