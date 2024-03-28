<template>
  <div class="flex flex-col p-5 w-full">
    <div class="flex flex-col w-full">
            <div class="flex flex-row w-full">
              <div class="w-1/2 p-1">
                <a-form-item  required>
                  <a-input v-model:value="formData.propertyAddress" placeholder="Property Address"/>
                </a-form-item>
              </div>
              <div class="w-1/2 p-1">
                <a-form-item  required>
                  <a-input v-model:value="formData.estateName" placeholder="Estate Name"/>
                </a-form-item>
              </div>
            </div >
              <div class="flex flex-row w-full">
                  <div class="w-1/2 p-1 h-10">
             
                    <a-form-item  :rules="[ { required: true, message: 'Please select the property type' } ]" >
             
                      <a-select v-model="formData.propertyType" placeholder="Property Type"  class="text-2xl flex h-full" >
                        <a-select-option  value="house">House</a-select-option>
                        <a-select-option  value="aprartment">Apartment</a-select-option>
                        <a-select-option  value="blockOfFlats">BLock of Flats</a-select-option>
                        <a-select-option  value="bungalow">Bungalow</a-select-option>
                        <a-select-option  value="chalet">Chalet</a-select-option>
                        <a-select-option  value="condo">Condo</a-select-option>
                        <a-select-option  value="duplex">Duplex</a-select-option>
                        <a-select-option  value="farmHouse">FarmHouse</a-select-option>
                        <a-select-option  value="massionette">Massionette</a-select-option>
                        <a-select-option  value="mansion">Mansion</a-select-option>
                        <a-select-option  value="miniFat">Mini Fat</a-select-option>
                        <a-select-option  value="pentHouse">Pent House</a-select-option>
                        <a-select-option  value="roomAndParlour">Room & Parlour</a-select-option>
                        <a-select-option  value="studioApartment">Studio Apartment</a-select-option>
                        <a-select-option  value="terrace">Town House / Terrace</a-select-option>
                        <a-select-option  value="villa">Villa</a-select-option>
                      </a-select>
                    </a-form-item>
                  </div>
                  <div class="w-1/2 p-1" >
                    <a-form-item  :rules="[ { required: true, message: 'Please select the condition' } ]" >
                      <a-select v-model="formData.propertyType" placeholder="Condition*">
                        <a-select-option value="fairlyUsed">Fairly Used</a-select-option>
                        <a-select-option value="newlyBuilt">Newly Built</a-select-option>
                        <a-select-option value="offPlan">off Plan</a-select-option>
                        <a-select-option value="old">Old</a-select-option>
                        <a-select-option value="renovated">Renovated</a-select-option>
                        <a-select-option value="unCompletedBuilding">UnCompleted Building</a-select-option>
                        <a-select-option value="underConstruction">Under Construction</a-select-option>
                      </a-select>
                    </a-form-item>
                  </div>
              </div>
              <div class="flex flex-row w-full">
                  <div class="w-1/2 p-1">
              
                    <a-form-item  :rules="[ { required: true, message: 'Please select bed room number' } ]" >
                      <a-select v-model="formData.propertyType" placeholder="Bedrooms*"  >
                        <a-select-option  value="1">1</a-select-option>
                        <a-select-option  value="2">2</a-select-option>
                        <a-select-option  value="3">3</a-select-option>
                        <a-select-option  value="4">4</a-select-option>
                        <a-select-option  value="5">5</a-select-option>
                        <a-select-option  value="6">6</a-select-option>
                        <a-select-option  value="7">7</a-select-option>
                        <a-select-option  value="8">8</a-select-option>
                        <a-select-option  value="9">9</a-select-option>
                        <a-select-option  value="10">10</a-select-option>
                      </a-select>
                    </a-form-item>
                  </div>
                  <div class="w-1/2 p-1" >
                    <a-form-item  :rules="[ { required: true, message: 'Please select bathrooms number' } ]" >
                      <a-select v-model="formData.propertyType" placeholder="Bathrooms*">
                        <a-select-option  value="1">1</a-select-option>
                        <a-select-option  value="2">2</a-select-option>
                        <a-select-option  value="3">3</a-select-option>
                        <a-select-option  value="4">4</a-select-option>
                        <a-select-option  value="5">5</a-select-option>
                        <a-select-option  value="6">6</a-select-option>
                        <a-select-option  value="7">7</a-select-option>
                        <a-select-option  value="8">8</a-select-option>
                        <a-select-option  value="9">9</a-select-option>
                        <a-select-option  value="10">10</a-select-option>
                      </a-select>
                    </a-form-item>
                  </div>
              </div>
              <div class="flex flex-row w-full">
                <div class="w-1/2 p-1">
              
                    <a-form-item  :rules="[ { required: true, message: 'Please select furnishing' } ]" >
                      <a-select v-model="formData.furnish" placeholder="Furnishing*"  >
                        <a-select-option  value="furnished">Furnished</a-select-option>
                        <a-select-option  value="semiFurnished">Semi-Furnished</a-select-option>
                        <a-select-option  value="unFurnished">Unfurnished</a-select-option>
                       
                      </a-select>
                    </a-form-item>
                  </div>
                  <div class="w-1/2 p-1">
                        <a-form-item  required>
                          <a-input v-model:value="formData.propertySize" placeholder="Property Size(sqm)*"/>
                        </a-form-item>
                   </div>
              </div>
              <div class="flex flex-row w-full">
                <div class="w-1/2 p-1">
              
                    <a-form-item  :rules="[ { required: true, message: 'Please select facilities' } ]" >
                      <a-select v-model="formData.facilities" placeholder="Facilities*" mode="multiple"  >
                        <a-select-option  value="24hourElectricity">24-hour Electricity</a-select-option>
                        <a-select-option  value="airConditioning">Air-Conditioning</a-select-option>
                        <a-select-option  value="balcony">Balcony</a-select-option>
                        <a-select-option  value="chandelier">Chandelier</a-select-option>
                        <a-select-option  value="diningArea">Dining Area</a-select-option>
                        <a-select-option  value="dishWasher">Dish Washer</a-select-option>
                        <a-select-option  value="enSuite">En Suite</a-select-option>
                        <a-select-option  value="hotWater">Hot Water</a-select-option>
                        <a-select-option  value="kitchenKabinet">kitchen Kabinet</a-select-option>
                        <a-select-option  value="microWave">Micro Wave</a-select-option>
                        <a-select-option  value="popCeiling">Pop Ceiling</a-select-option>  
                         <a-select-option  value="prePaidMeter">Pre-paid Meter</a-select-option>
                         <a-select-option  value="refrigrator">Refrigrator</a-select-option>  
                         <a-select-option  value="sectionals">Sectionals</a-select-option>
                         <a-select-option  value="tiledFloor">Tiled Floor</a-select-option>  
                          <a-select-option  value="tv">Tv</a-select-option>
                          <a-select-option  value="wardRobe">Wardrobe</a-select-option>
                          <a-select-option  value="wifi">WIFI</a-select-option>
                


                       
                      </a-select>
                    </a-form-item>
                  </div>
                  
              </div>

              <div class="p-2">
                <div><label class="font-bold">Parking Service</label></div>
                <div class="p-5">
                  <a-radio-group v-model:value="value">
                    <a-radio  :value="1">Yes</a-radio>
                    <a-radio  :value="2">No</a-radio>
                  </a-radio-group>
                </div>
              

              </div>
              <div class="p-2">
                <div><label class="font-bold">Agency Fee</label></div>
                <div class="p-2"><a-checkbox v-model:checked="checked">Yes</a-checkbox></div>
                <div>
                  <a-textarea v-model:value="textArea" placeholder="Description" :rows="4" />
                </div>  

              </div>
              <div class="flex flex-col p-3">
                <a-radio-group v-model:value="formData.priceType">
                  <!-- Option 1: Text -->
                  <div>
                  <a-radio :vlaue="1">Contact for price</a-radio>
                </div>

                  <!-- Option 2: Input field and checkbox -->
                  <div>
                    <a-radio :value="2">
                        Set Price
                      <a-input v-if="formData.priceType === 2" placeholder="Enter Price ETB" v-model="formData.price"/>
                      <a-checkbox v-if="formData.priceType === 2" v-model="formData.isNegotiable"  >Negotiable</a-checkbox>
                    </a-radio>
                  </div>
                </a-radio-group>
              </div>
              <div class="flex flex-row">
                <div class="w-1/2 p-1">
                <a-form-item  required>
                  <a-input v-model:value="formData.phoneNumber" placeholder="Your Phone Number"/>
                </a-form-item>
                </div>
                <div class="w-1/2 p-1">
                <a-form-item  required>
                  <a-input  placeholder="Name" disabled/>
                </a-form-item>
                </div>

              </div>
  

    </div>
    <div class="flex flex-col items-center mt-3">
      <div><button class="p-5 bg-green-500 rounded-lg w-80 text-white font-bold">Post ad</button></div>
      <div class="w-80 mt-2"><span class="text-xs text-gray-400">By clicking on Post Ad, you accept the Terms of Use , confirm that you will abide by the Safety Tips, and declare that this posting does not include any Prohibited Items.</span></div>

    </div>

  <!-- Add more form items as needed -->
</div>
</template>

<script>
/* eslint-disable */
import { ref } from 'vue';



export default {
  name: 'HouseSellingForm',
  props: {
    form: Object, 
  },
  setup(props) {
    const formData = ref({
      propertyType: '',
      bedrooms: 0,
      facilities:[],
      priceType:"1",
      price:'',
      isNegotiable:false,
      phoneNumber:'',
      // Add more form fields as needed
    });
    const value = ref(1);

    const checked = ref(false);
    const  selectedOption=ref("option1");
   

    return { formData,value,checked,selectedOption };
  },
};
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
