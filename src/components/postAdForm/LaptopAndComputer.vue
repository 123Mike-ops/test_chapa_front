<template>
    <div class="flex flex-col p-5 w-full">
    <div class="flex flex-col w-full">
          
              <div class="flex flex-row w-full">
                  <div class="w-1/2 p-2 h-10">
             
                    <a-form-item  :rules="[ { required: true, message: 'Please select the  type' } ]" >
             
                      <a-select
                        v-model:value="value"
                        show-search
                        placeholder="Type*"
                        :options="optionsType"
                        :filter-option="filterOption"
                        @focus="handleFocus"
                        @blur="handleBlur"
                        @change="handleChange"
                      ></a-select>

                    </a-form-item>
                  </div>
                  <div class="w-1/2 p-2 h-10">
             
                        <a-form-item  :rules="[ { required: true, message: 'Please select the  Brand' } ]" >
                  
                          <a-select
                            v-model:value="value"
                            show-search
                            placeholder="Brand*"
                            :options="optionsBrand"
                            :filter-option="filterOption"
                            @focus="handleFocus"
                            @blur="handleBlur"
                            @change="handleChange"
                          ></a-select>

                        </a-form-item>
                      </div>
              
              </div>
              <div class="flex flex-row w-full">
                <div class="w-1/2 p-2 h-10">
             
                      <a-form-item  :rules="[ { required: true, message: 'Please select the  Model' } ]" >
                
                        <a-select
                          v-model:value="value"
                          show-search
                          placeholder="Model*"
                          :options="optionsModel"
                          :filter-option="filterOption"
                          @focus="handleFocus"
                          @blur="handleBlur"
                          @change="handleChange"
                        ></a-select>

                      </a-form-item>
                  </div>
                  <div class="w-1/2 p-2 h-10">
             
                          <a-form-item  :rules="[ { required: true, message: 'Please select the  Subtype' } ]" >
                    
                            <a-select
                              v-model:value="value"
                              show-search
                              placeholder="Sub Type*"
                              :options="optionsSubType"
                              :filter-option="filterOption"
                              @focus="handleFocus"
                              @blur="handleBlur"
                              @change="handleChange"
                            ></a-select>

                          </a-form-item>
                      </div>
              </div>
             
              <div class="flex flex-row w-full">
                <div class="w-1/2 p-2 h-10">
             
                      <a-form-item  :rules="[ { required: true, message: 'Please select the  Condition' } ]" >
                
                        <a-select
                          v-model:value="value"
                          show-search
                          placeholder="Condition*"
                          :options="optionsCondition"
                          :filter-option="filterOption"
                          @focus="handleFocus"
                          @blur="handleBlur"
                          @change="handleChange"
                        ></a-select>

                      </a-form-item>
                  </div>
                  <div class="w-1/2 p-2 h-10">
             
                          <a-form-item  :rules="[ { required: true, message: 'Please select the  Processor' } ]" >
                    
                            <a-select
                              v-model:value="value"
                              show-search
                              placeholder="Processor*"
                              :options="optionsProcessor"
                              :filter-option="filterOption"
                              @focus="handleFocus"
                              @blur="handleBlur"
                              @change="handleChange"
                            ></a-select>

                          </a-form-item>
                      </div>
              </div>
              

              <div class="flex flex-row w-full">
                <div class="w-1/2 p-2 h-10">
             
                      <a-form-item  :rules="[ { required: true, message: 'Please select the  Number of Core' } ]" >
                
                        <a-select
                          v-model:value="value"
                          show-search
                          placeholder="Number of Core*"
                          :options="optionsNumberOfCores"
                          :filter-option="filterOption"
                          @focus="handleFocus"
                          @blur="handleBlur"
                          @change="handleChange"
                        ></a-select>

                      </a-form-item>
                  </div>
                  <div class="w-1/2 p-2 h-10">
             
                          <a-form-item  :rules="[ { required: true, message: 'Please select the  RAM' } ]" >
                    
                            <a-select
                              v-model:value="value"
                              show-search
                              placeholder="Ram*"
                              :options="optionsRam"
                              :filter-option="filterOption"
                              @focus="handleFocus"
                              @blur="handleBlur"
                              @change="handleChange"
                            ></a-select>

                          </a-form-item>
                      </div>
              </div>
              <div class="flex flex-row w-full">
                <div class="w-1/2 p-2 h-10">
             
                      <a-form-item  :rules="[ { required: true, message: 'Please select the  Storage Type' } ]" >
                
                        <a-select
                          v-model:value="value"
                          show-search
                          placeholder="Storage Type*"
                          :options="optionsStorageType"
                          :filter-option="filterOption"
                          @focus="handleFocus"
                          @blur="handleBlur"
                          @change="handleChange"
                        ></a-select>

                      </a-form-item>
                  </div>
                  <div class="w-1/2 p-2 h-10">
             
                          <a-form-item  :rules="[ { required: true, message: 'Please select the Storage Capacity' } ]" >
                    
                            <a-select
                              v-model:value="value"
                              show-search
                              placeholder="Storage Capacity*"
                              :options="optionsStorageCapacity"
                              :filter-option="filterOption"
                              @focus="handleFocus"
                              @blur="handleBlur"
                              @change="handleChange"
                            ></a-select>

                          </a-form-item>
                      </div>
              </div>
              <div class="flex flex-row w-full">
                <div class="w-1/2 p-2 h-10">
             
                      <a-form-item  :rules="[ { required: true, message: 'Please select the  Display Size' } ]" >
                
                        <a-select
                          v-model:value="value"
                          show-search
                          placeholder="Display Size*"
                          :options="optionsDisplaySize"
                          :filter-option="filterOption"
                          @focus="handleFocus"
                          @blur="handleBlur"
                          @change="handleChange"
                        ></a-select>

                      </a-form-item>
                  </div>
                  <div class="w-1/2 p-2 h-10">
             
                          <a-form-item  :rules="[ { required: true, message: 'Please select the  Graphics Card' } ]" >
                    
                            <a-select
                              v-model:value="value"
                              show-search
                              placeholder="Graphics Card*"
                              :options="optionsGraphicsCard"
                              :filter-option="filterOption"
                              @focus="handleFocus"
                              @blur="handleBlur"
                              @change="handleChange"
                            ></a-select>

                          </a-form-item>
                      </div>
              </div>
              <div class="flex flex-row w-full">
                <div class="w-1/2 p-2 h-10">
             
                      <a-form-item  :rules="[ { required: true, message: 'Please select the  Graphics Card Memory' } ]" >
                
                        <a-select
                          v-model:value="value"
                          show-search
                          placeholder="Graphics Card Memory*"
                          :options="optionsGraphicsCardMemory"
                          :filter-option="filterOption"
                          @focus="handleFocus"
                          @blur="handleBlur"
                          @change="handleChange"
                        ></a-select>

                      </a-form-item>
                  </div>
                  <div class="w-1/2 p-2 h-10">
             
                          <a-form-item  :rules="[ { required: true, message: 'Please select the  Operating System' } ]" >
                    
                            <a-select
                              v-model:value="value"
                              show-search
                              placeholder="Operating System*"
                              :options="optionsOperatingSystem"
                              :filter-option="filterOption"
                              @focus="handleFocus"
                              @blur="handleBlur"
                              @change="handleChange"
                            ></a-select>

                          </a-form-item>
                      </div>
              </div>
              <div class="flex flex-row w-full">
                <div class="w-1/2 p-2 h-10">
             
                      <a-form-item  :rules="[ { required: true, message: 'Please select the Color' } ]" >
                
                        <a-select
                          v-model:value="value"
                          show-search
                          placeholder="Color*"
                          :options="optionsColor"
                          :filter-option="filterOption"
                          @focus="handleFocus"
                          @blur="handleBlur"
                          @change="handleChange"
                        ></a-select>

                      </a-form-item>
                  </div>
                  <div class="w-1/2 p-2 h-10">
             
                          <a-form-item  :rules="[ { required: true, message: 'Please select the Exchange Possible' } ]" >
                    
                            <a-select
                              v-model:value="value"
                              show-search
                              placeholder="Exchange Possible*"
                              :options="optionsExchangePossible"
                              :filter-option="filterOption"
                              @focus="handleFocus"
                              @blur="handleBlur"
                              @change="handleChange"
                            ></a-select>

                          </a-form-item>
                      </div>
              </div>

            
              <div class="p-2">
              
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
    <div class="flex flex-col items-center ">
      <div class="flex flex-row"> <div class="ml-10"><img src="../../assets/truck.png" class="h-10 w-10"/></div><div class="ml-3"><label class="font-bold text-xl">Delivery</label></div></div>
      <div class="p-5 border-2"> <a-checkbox v-model:checked="checked">
            <div class="p-2 flex flex-row"><div><img src="../../assets/truck.png" class="h-5 w-5"/></div><div class="ml-3">All My Products</div></div>
            <div class="p-2 flex flex-row"><div><img src="../../assets/location.png" class="h-5 w-5"/></div><div class="ml-3">Addis Ababa, Gulele</div></div>
            <div class="p-2 flex flex-row">  <div><ClockCircleOutlined /></div> <div class="ml-3">2- 4 Days</div></div>
            <div class="p-2 flex flex-row"><div><img src="../../assets/wallet.png" class="h-5 w-5"/></div><div class="ml-3">ETB 100 - 1000</div></div>
           


      </a-checkbox></div>
      <div class="p-2  mt-5" >
        <button class="border-2 p-5 hover:bg-gray-300">
       ++Add Delivery Option
        </button>
      </div>
      <div class="mt-5" >
        <button class="bg-green-600 text-white p-3 rounded-xl">
       Select one Option
        </button>
      </div>



    </div>
    
    <div class="flex flex-col items-center mt-10">
      <div><button class="p-5 bg-green-500 rounded-lg w-80 text-white font-bold">Post ad</button></div>
      <div class="w-80 mt-2"><span class="text-xs text-gray-400">By clicking on Post Ad, you accept the Terms of Use , confirm that you will abide by the Safety Tips, and declare that this posting does not include any Prohibited Items.</span></div>

    </div>

  <!-- Add more form items as needed -->
</div>
  
  </template>
  
  <script>
  /* eslint-disable */
  import { ref } from 'vue';
  import {ClockCircleOutlined} from '@ant-design/icons-vue';
   
  export default {
    name: 'ComputerSellingForm',
    props: {
      form: Object,
    },
    components:{
      ClockCircleOutlined

    },
    setup(props) {
      const formData = ref({
        computerBrand: '',
        processorType: '',
        type:"desktopComputer",
       
      });
      const optionsType = ref([
          {
            value: 'deskTop',
            label: 'Desktop',
          },
          {
            value: 'laptop',
            label: 'Laptop',
          },
          {
            value: 'server',
            label: 'Server',
          },
        ]);
        const optionsBrand = ref([
          {
            value: 'hp',
            label: 'Hp',
          },
          {
            value: 'dell',
            label: 'Dell',
          },
          {
            value: 'apple',
            label: 'Apple',
          },
        ]);
        const optionsModel = ref([
          {
            value: 'pavilion-1516',
            label: 'Pavilion-1516',
          },
          {
            value: 'alpha',
            label: 'Alpha',
          },
          {
            value: 'Auroa',
            label: 'aurora',
          },
        ]);
        const optionsSubType = ref([
          {
            value: 'allInOne',
            label: 'All-in-one',
          },
          {
            value: 'mini',
            label: 'Mini (Compact)',
          },
          {
            value: 'workStation',
            label: 'WorkStation',
          },
        ]);
        const optionsCondition = ref([
          {
            value: 'new',
            label: 'New',
          },
       
        ]);
        const optionsProcessor = ref([
          {
            value: 'intel',
            label: 'Intel',
          },
       
        ]);
        const optionsNumberOfCores = ref([
          {
            value: '4',
            label: '4',
          },
       
        ]);
        const optionsRam = ref([
          {
            value: '8GB',
            label: '8GB',
          },
       
        ]);
        const optionsStorageCapacity = ref([
          {
            value: '250GB',
            label: '250GB',
          },
       
        ]);
        const optionsStorageType = ref([
          {
            value: 'SSD',
            label: 'SSD',
          },
       
        ]);
        const optionsDisplaySize = ref([
          {
            value: '13.5',
            label: '13.5',
          },
       
        ]);
        const optionsGraphicsCard = ref([
          {
            value: 'nividia',
            label: 'Nividia',
          },
       
        ]);
        const optionsGraphicsCardMemory = ref([
          {
            value: '250GB',
            label: '250GB',
          },
       
        ]);
        const optionsOperatingSystem = ref([
          {
            value: 'windows',
            label: 'windows',
          },
       
        ]);
        const optionsColor = ref([
          {
            value: 'black',
            label: 'black',
          },
       
        ]);
        const optionsExchangePossible = ref([
          {
            value: 'yes',
            label: 'Yes',
          },
       
        ]);
  
      return { formData,optionsType,optionsBrand,optionsModel,optionsSubType,optionsCondition,optionsProcessor,optionsNumberOfCores,optionsRam,optionsStorageCapacity
        ,optionsStorageType,optionsDisplaySize,optionsGraphicsCard,optionsGraphicsCardMemory,optionsOperatingSystem,optionsColor,optionsExchangePossible };
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  