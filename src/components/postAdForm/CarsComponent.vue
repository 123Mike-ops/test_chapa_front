<template>
  <div class="flex flex-col p-5 w-full">
    <div class="flex flex-col w-full">
      <div class="flex flex-row w-full">
        <div class="w-1/2 p-1 h-10">
          <a-form-item :rules="[ { required: true, message: 'Please select the Manufucturer' } ]">
            <a-select v-model="formData.make" placeholder="Make" class="text-2xl flex h-full">
              <a-select-option v-for="option in makerOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="w-1/2 p-1">
          <a-form-item :rules="[ { required: true, message: 'Please select the Model' } ]">
            <a-select v-model="formData.model" placeholder="Model">
              <a-select-option v-for="option in modelOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
      </div>
      <div class="flex flex-row w-full">
        <div class="w-1/2 p-1 h-10">
          <a-form-item :rules="[ { required: true, message: 'Please select Manufacturation Year' } ]">
            <a-select v-model="formData.yearofmanufacture" placeholder="Year" class="text-2xl flex h-full">
              <a-select-option v-for="option in yearofmanufactureOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="w-1/2 p-1">
          <a-form-item :rules="[ { required: true, message: 'Please select the Color' } ]">
            <a-select v-model="formData.color" placeholder="Color">
              <a-select-option v-for="option in colorOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
      </div>
  
      <div class="flex flex-row w-full">
        <div class="w-1/2 p-1">
          <a-form-item :rules="[ { required: true, message: 'Please select the Interior Color' } ]">
            <a-select v-model="formData.interiorcolor" placeholder="Interior Color">
              <a-select-option v-for="option in interiorcolorOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
        
        <div class="w-1/2 p-1">
          <a-form-item :rules="[ { required: true, message: 'Please select the condition' } ]">
            <a-select v-model="formData.condition" placeholder="Condition">
              <a-select-option v-for="option in conditionOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
      </div>

      <div class="flex flex-row w-full">
        <div class="w-1/2 p-1 h-10">
          <a-form-item :rules="[ { required: true, message: 'Please select Transmission' } ]">
            <a-select v-model="formData.transmission" placeholder="Transmission" class="text-2xl flex h-full">
              <a-select-option v-for="option in transmissionOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div class="w-1/2 p-1">
                <a-form-item  required>
                  <a-input v-model:value="formData.mileage" placeholder="Milage (KM)"/>
                </a-form-item>
              </div>
      </div>
      <div class="flex flex-row w-full">
        <div class="w-1/2 p-1">
              
              <a-form-item  :rules="[ { required: true, message: 'Please select Key Features' } ]" >
                <a-select v-model="formData.keyFeatures" placeholder="Key Features" mode="multiple"  >
                  <a-select-option v-for="option in keyFeatureOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </a-select-option>
                </a-select>
              </a-form-item>
            </div>
        <div class="w-1/2 p-1">
                <a-form-item  required>
                  <a-input v-model:value="formData.VinNum" placeholder="Vin Chasis Number"/>
                </a-form-item>
              </div>
      </div>
      <!-- Other form fields with similar changes -->

      <div class="p-2">
        <div><label class="font-bold">Registred Car</label></div>
        <div class="p-5">
          <a-radio-group v-model:value="value">
            <a-radio :value="1">Yes</a-radio>
            <a-radio :value="2">No</a-radio>
          </a-radio-group>
        </div>
      </div>
      <!-- Other form fields with similar changes -->

    </div>
    <div class="flex flex-col items-center mt-3">
      <div><button class="p-5 bg-green-500 rounded-lg w-80 text-white font-bold">Post ad</button></div>
      <div class="w-80 mt-2">
        <span class="text-xs text-gray-400">
          By clicking on Post Ad, you accept the Terms of Use, confirm that you will abide by the Safety Tips,
          and declare that this posting does not include any Prohibited Items.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'HouseSellingForm',
  props: {
    form: Object,
  },
  setup(props) {
    const formData = ref({
      make: '',
      model: '',
      yearofmanufacture: '',
      color:'',
      interiorcolor:'',
      condition:'',
      mileage:'',
      keyFeatures:[],
      VinNum:''
      
      // Add more form fields as needed
    });

    const value = ref(1);

    // Define options
    const makerOptions = ref([
      { value: 'house', label: 'House' },
      { value: 'apartment', label: 'Apartment' },
    ]);

    const modelOptions = ref([
      { value: 'fairlyUsed', label: 'Fairly Used' },
      { value: 'newlyBuilt', label: 'Newly Built' },
    ]);
    const yearofmanufactureOptions = ref([
      { value: '2021', label: '2021' },
      { value: '2022', label: '2022' },
      { value: '2023', label: '2023' },
    ]);
    const colorOptions = ref([
      { value: '2021', label: 'Black' },
      { value: '2022', label: 'White' },
      { value: '2023', label: 'Red' },
    ]);
    const interiorcolorOptions = ref([
      { value: '2021', label: 'Black' },
      { value: '2022', label: 'White' },
      { value: '2023', label: 'Red' },
    ]);
    const condition = ref([
    { value: 'fairlyUsed', label: 'Fairly Used' },
      { value: 'newlyBuilt', label: 'Newly Built' },
    ]);
    const transmissionOptions = ref([
      { value: '2021', label: 'AMT' },
      { value: '2022', label: 'Automatic' },
      { value: '2023', label: 'Manual' },
    ]);
    const keyFeatureOptions = ref([
      { value: '2021', label: 'Bull Bar' },
      { value: '2022', label: 'Car Play' },
      { value: '2023', label: 'Cd Player' },
    ]);
    return { formData, value, makerOptions, modelOptions,yearofmanufactureOptions,colorOptions ,interiorcolorOptions,condition ,transmissionOptions,keyFeatureOptions};
  },
};
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
