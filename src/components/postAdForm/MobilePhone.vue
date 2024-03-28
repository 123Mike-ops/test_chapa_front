<template>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Brand">
        <a-select v-model="formState.phoneBrand" class="w-full" placeholder="Select phone brand" @change="handleBrandChange">
  <a-select-option v-for="brand in phoneBrands" :key="brand.value" :value="brand.value">{{ brand.label }}</a-select-option>
</a-select>
      </a-form-item>
      <a-form-item
          label="Model"
          name="phoneModel"
        >
          <a-select v-model="formState.phoneModel" class="w-full" placeholder="Select phone model" >
            <a-select-option
              v-for="model in phoneModels"
              :key="model.value"
              :value="model.value"
            >{{ model.label }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="Condition"
          name="condition"
        >
          <a-select v-model="formState.condition" :options="options" class="w-full" placeholder="Select condition" >
       
          </a-select>
        </a-form-item>
        <a-form-item
          label="Screen Size"
          name="ScreenSize"
        >
          <a-select v-model="formState.condition" :options="options" class="w-full" placeholder="Select Screen Size" >
       
          </a-select>
        </a-form-item>
        <a-form-item
          label="Ram"
          name="ram"
        >
          <a-select v-model="formState.condition" :options="options" class="w-full" placeholder="Select Ram Size" >
       
          </a-select>
        </a-form-item>
        <a-form-item
          label="Color"
          name="color"
        >
          <a-select v-model="formState.condition" :options="options" class="w-full" placeholder="Select Color" >
       
          </a-select>
        </a-form-item>
        <a-form-item
          label="Operating System"
          name="operatingsystem"
        >
          <a-select v-model="formState.condition" :options="options" class="w-full" placeholder="Select Operating System" >
       
          </a-select>
        </a-form-item>
        <a-form-item
          label="Main Camera"
          name="maincamera"
        >
          <a-select v-model="formState.condition" :options="options" class="w-full" placeholder="Select Main Camera" >
       
          </a-select>
        </a-form-item>
        <a-form-item
          label="Selfie Camera"
          name="selfiecamera"
        >
          <a-select v-model="formState.condition" :options="options" class="w-full" placeholder="Select condition" >
       
          </a-select>
        </a-form-item>
        <a-form-item
          label="Battery"
          name="battery"
        >
          <a-select v-model="formState.condition" :options="options" class="w-full" placeholder="Select Battery(mAh)" >
       
          </a-select>
        </a-form-item>
        <a-form-item
          label="Exchange Possible"
          name="exchangepossible"
        >
          <a-select v-model="formState.condition" :options="options" class="w-full" placeholder="Select Battery(mAh)" >
       
          </a-select>
        </a-form-item>
        <a-form-item label="Description">
        <a-textarea v-model:value="formState.desc" />
      </a-form-item>
   
      <a-row>
    <a-col :span="24">
      <div class="">
        <a-form-item label="Price" name="price" class="">
          <a-radio-group v-model="formState.price">
            <a-radio value="false">Contact for price</a-radio>
            <a-radio value="true">
              <a-input
                v-model="formState.priceValue"
                inputmode="decimal"
                placeholder="Enter price"
                class=""
              />
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="Add bulk price">
          <a-switch v-model="formState.bulkPrice" />
        </a-form-item>
      </div>
    </a-col>

    <!-- Rest of the existing form -->
  </a-row>
  <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px">Cancel</a-button>
      </a-form-item>
    </a-form>
  </template>
<script>
/* eslint-disable */
import { reactive, toRaw } from 'vue';
import { ref, onMounted } from 'vue';

const formState = reactive({
 name: '',
 phoneBrand: '',
 phoneModel: '',
 condition: '',
 storageCapacity: '',
 delivery: false,
 type: [],
 resource: '',
 desc: '',
});
const options=ref([
    {
        value: 'used',
        label: 'Used',
    },
    {
        value: 'new',
        label: 'New',
    },
    {
        value: 'refurbished',
        label: 'Refurbished',
    }
])
const color=ref([
    {
        value: 'used',
        label: 'Used',
    },
    {
        value: 'new',
        label: 'New',
    },
    {
        value: 'refurbished',
        label: 'Refurbished',
    }
])
const fetchBrandsAndModels = async () => {
  const brandsResponse = Promise.resolve([
    { "value": "apple", "label": "Apple" },
    { "value": "samsung", "label": "Samsung" },
    { "value": "google", "label": "Google" }
  ]);

  const modelsResponse = Promise.resolve([
    { "brand": "apple", "value": "iphone", "label": "iPhone" },
    { "brand": "apple", "value": "ipad", "label": "iPad" },
    { "brand": "samsung", "value": "galaxy", "label": "Galaxy" },
    { "brand": "samsung", "value": "note", "label": "Note" },
    { "brand": "google", "value": "pixel", "label": "Pixel" }
  ]);

  const brands = await brandsResponse;
  const models = await modelsResponse;

  return { brands, models };
};

const onSubmit = () => {
 console.log('submit!', toRaw(formState));
};

const labelCol = {
 style: {
   width: '150px',
 },
};

const wrapperCol = {
 span: 14,
};

export default {
  name: 'CarsForm',
 data() {
   return {
     formState,
     labelCol,
     wrapperCol,
   };
 },
 methods: {
   onSubmit,
 },
 props: {
    form: Object,
  },
  setup(props) {
    const formData = ref({
      phoneBrand: '',
      phoneModel: '',
      storageCapacity: '',
    });

    const phoneBrands = ref([]);
    const phoneModels = ref([]);

    const validationRules = ref({
      phoneBrand: [
        { required: true, message: 'Please select the phone brand', trigger: 'change' },
      ],
      phoneModel: [
        { required: true, message: 'Please select the phone model', trigger: 'change' },
      ],
      storageCapacity: [
        { required: true, message: 'Please enter the storage capacity', trigger: 'blur' },
      ],
    });

    const handleBrandChange = async (selectedBrand) => {
  const { brands, models } = await fetchBrandsAndModels();
  phoneBrands.value = brands;

 
  formState.phoneModel = '';

  
  phoneModels.value = [];
  for (const model of models) {
    if (model.brand === selectedBrand) {
      phoneModels.value.push({ value: model.value, label: model.label });
    }
  }

 
  validationRules.value.phoneModel[0].required = !!phoneModels.value.length;

  
  console.log("formState.phoneBrand", selectedBrand);
};

onMounted(() => handleBrandChange(formState.phoneBrand));

    return { formData, phoneBrands, phoneModels, handleBrandChange, validationRules ,options};
  },
};
</script>
