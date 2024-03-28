<template>
  <div>
    <div>
      <a-modal v-model:open="open" title="Success" @ok="handleOk">
        <p class="text-xl font-bold text-green-500">Congratulations !!</p><br>
        <p class="">You have succuess fully publish your product! </p>

      </a-modal>
    </div>
    <div class="flex items-center justify-center max-w-3xl m-auto flex-col w-4/5 containerh">
      <div class="loading-spinner" v-if="loading"></div>


      <div class="flex items-center justify-between my-8 h-10 w-full bg-white"
        style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;">
        <h6 class="mx-auto border-2 p-1 border-red-400">Paid Post</h6>

        <h6 class="mx-auto">Free Post</h6>
       
        <span class="mr-4 p-2 cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300 f"
          @click="clearForm">
          Clear
        </span>
      </div>
      <div class="flex flex-col items-center justify-center w-full bg-white h-auto p-4 "
        style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;">
        <div v-if="!modalVisible" class="max-w-md">
          <a-row class="my-2">
            <a-col :span="12">
              <a-select v-model:value="selectedCategory"   show-search style="width: 95%" placeholder="Select a category"
                :options="categoryOptions" @change="handleCategoryChange" @click="handleCategoryChange"></a-select>
            </a-col>
            <a-col :span="12">
              <a-select v-model:value="selectedSubCategory"  show-search style="width: 95%" placeholder="Select a subcategory" 
                :options="subcategoryOptions" @change="handleSubCategoryChange"  :disabled="!selectedCategory"></a-select>
            </a-col>
          </a-row>
          <a-row class="my-2">
            <a-col :span="12">
              <a-select v-model:value="selectedProvince"  show-search style="width: 95%" placeholder="Select Region" 
                :options="provinceOptions" @change="handleProvinceChange" :disabled="!selectedSubCategory"></a-select>
            </a-col>
            <a-col :span="12">
              <a-select v-model:value="selectedCity"  show-search style="width: 95%" :options="cityOptions" 
                placeholder="Select City" @change="handleCityChange" :disabled="!selectedProvince"></a-select>
            </a-col>
          </a-row>
          <div v-for="(validate, index) in validation" :key="validate">
            <label v-if="index === (validation.length-1) && validationError && validate.rule === 'dropDown'" class="text-red-700 text-sm font-normal">
              {{ validate.message }}
            </label>
          </div>
          <div class="font-sans my-2 p-5 text-lg" style="color:#586672">
            <p class="text-sm">Add photo</p>
            <p class="text-xs font-bold text-sky-300">Add at least 1 photos for this category.</p>
            <p class="text-xs">First picture - is the title picture. You can change the order of photos: just grab your
              photos and drag</p>
          </div>
          <Uploader class="mx-auto" :imageUrl="formData.imageUrl" @remove-image="removeImage"
            @updateImageCounter="updateImageCounter" />
          <div v-for="(validate, index) in validation" :key="validate">
            <label v-if="(index === (validation.length-1) && validationError && (validate.rule === 'imageRequired' || validate.rule === 'imageCount'))"
              class="text-red-700 text-sm font-normal ">{{ validate.message }}</label>
          </div>
          <div class="font-sans my-2" style="color:#586672">
            <p class="text-xs">Supported formats are .jpg, .gif and .png, 5MB max</p>
          </div>
          <div class="flex items-center justify-center w-full">
            <a-textarea v-model:value="value" placeholder="Youtube Link" auto-size />
          </div>
          <a-button class="mt-4" type="primary" style="width: 100%;" @click="onNext">Next</a-button>

        </div>

        <div v-else class="w-full">

          <a-form    :model="formD" class="flex flex-col p-5 w-full mb-10"   @finish="onFinish" @finishFailed="onFinishFailed" >
            <div class="w-full p-1">
              <label for="title">Title</label>
              <a-form-item name="title" :rules="[{ required: true, message: 'Title is Required Field!' }]" >
                <a-input  :name="title" :placeholder="title"  class="w-full" @blur="logFormData2('title', $event.target.value)" v-model="formD[title]" />
              </a-form-item>
            </div>
          
            <div v-for="field in formFields.fields" :key="field.id" class="flex flex-row w-full">
              <div class="w-full p-1">
                <label class="mr-3">{{ field.name }}</label>
      
                  <template v-if="field.type === 'select' || field.type === 'input' || field.type === 'radio' || field.type === 'checkbox' || field.type === 'selectMultiple'">
                    <a-form-item  :name="field.id" :rules="field.validation">
                      <a-input v-if="field.type === 'input'" :type="field.type" :name="field.name" :placeholder="field.label"
                      v-model="formD[field.name]" class="w-full"
                      @blur="(event) => logFormData(field.id, event.target.value)" />
                    <div v-else-if="field.type === 'radio'" :name="field.name" class="p-3">
                      <label class="ml-2" v-for="option in field.options" :key="option">
                        <input v-model="formD[field.name]" type="radio" :name="field.name" :value="option"
                          @change="(event) => logFormData(field.id, event.target.value)" />
                        {{ option }}
                      </label>
                    </div>
                    <a-checkbox-group v-else-if="field.type === 'checkbox'" :name="field.name" :label="field.name">
  
                      <a-checkbox v-model="formD[field.name]" :value="option" v-for="option in field.options"
                        :key="option" @change="(event) => logFormData(field.id, event.target.value)">{{ option
                        }}</a-checkbox>
                    </a-checkbox-group>
                    <a-select v-else-if="field.type === 'selectMultiple'" mode="multiple" :name="field.name"
                      v-model="formD[field.name]" :placeholder="field.label" class="w-full"
                      @change="(value) => logFormData(field.id, value)">
                      <a-select-option v-for="option in field.options" :key="option" :value="option">{{ option
                      }}</a-select-option>
                    </a-select>
                    <a-select v-else :name="field.name" v-model="formD[field.name]" :placeholder="field.label" class="w-full"
                      @change="(value) => logFormData(field.id, value)">
                      <a-select-option v-for="option in field.options" :key="option" :value="option">{{ option
                      }}</a-select-option>
                    </a-select>
                  </a-form-item>
                  </template>
               
              </div>
            </div>
          
            <label class="mt-5">Description</label>
            <a-form-item name="description" :rules="[{ required: true, message: 'Description is Required Field!' }]" >
            <a-textarea  @blur="logFormData2('description', $event.target.value)" class="flex flex-row w-full my-2" />
             </a-form-item>
            <div class="flex flex-col">
              <div><label>Price</label></div>
              <div class="flex flex-col p-3">
                <label>
                  <input type="radio" name="price" value="Contact For Price" v-model="selectedOptionPrice"
                    @change="logFormData2('price', 'contactForPrice')">
                  Contact For Price
                </label>

                <label>
                  <input type="radio" name="price" value="priceInput" v-model="selectedOptionPrice">
                  Set Price
                  <input v-if="selectedOptionPrice === 'priceInput'" type="number" class="border-2 rounded-md p-2"
                    placeholder="Amount in ETB" @blur="(event) => logFormData2('price', event.target.value)" />

                  <input v-if="selectedOptionPrice === 'priceInput'" type="checkbox" id="checkboxInput"
                    @change="(event) => logFormData2('isNegotiable', event.target.checked)" />
                  <span v-if="selectedOptionPrice === 'priceInput'">Negotiable</span>
                </label>
              </div>
            </div>
          
            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <div><a-button type="primary" html-type="submit" >Submit</a-button></div>
            </a-form-item>
          </a-form>

        </div>
      </div>


    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import ShoppingCategoriesDropdown from '../../components/postAdComponent/ShoppingCategoriesDropdown.vue';
import Uploader from '../../components/postAdComponent/Uploader.vue';
import LocationSelect from '../../components/postAdComponent/LocationSelector.vue';
import MobilePhoneForm from '../../components/postAdForm/MobilePhone.vue';
import HouseAndApartmentForm from '../../components/postAdForm/HouseandApartment.vue';
import LaptopAndComputerForm from '../../components/postAdForm/LaptopAndComputer.vue';
import CarsForm from '../../components/postAdForm/CarsComponent.vue';
import fileService from '../setting/file.service';
import API from '../setting/lookup.service'
import APIPost from '../setting/post.service'
import { useStore } from 'vuex';
import { setTransitionHooks,nextTick } from 'vue';
import { Validation } from '../../modal/validation.model';
import { reactive } from 'vue';




export default {
  name: "PostAdPage",
  components: {
    ShoppingCategoriesDropdown,
    Uploader,
    LocationSelect,
  },
  setup() {
    const store = useStore(); // Initialize the store
   

    // Your component logic here

    // Return any data or methods you want to expose to the template
    return {
      store,
      // data or methods
    };
  },
  data() {
    return {

      formFields: {
        "fields": []
      },
      formData: {
        attribute: [],
        imageUrl: [],

      },
      formD: {
        title:'',
    
         },
      selectedCategory: null,
      selectedSubCategory: null,
      value: "",
      modalVisible: false,
      formType: "",
      succuss: false,
      open: false,
      validation: [{ message: '', rule: '' }],
      validationError: false,
      imageCounter: 0,
      validationPassed:false,



      categories: [],
      subCategories: [],
   
      selectedProvince: null,
      selectedCity: null,
      selectedOptionPrice: '',
      loading: false,

      provinces: [],
      cities: [],
      imageData: ''
    };
  },
  mounted() {

    API.getRegion().then(res => {
      this.provinces = res.data
    }).catch(err => {
      console.log(err)
    })
    API.getCategory().then(res => {
      this.categories = res.data
    }).catch(err => {
      console.log(err)
    })


  },
  computed: {




    formTypeComponent() {
      switch (this.formType) {
        case '1':
          return MobilePhoneForm;
        case '2':
          return HouseAndApartmentForm;
        case '3':
          return LaptopAndComputerForm;
        case '4':
          return CarsForm;
        default:
          return CarsForm;
      }
    },
    categoryOptions() {
      console.log("catt", this.categories);
      return this.categories.map((cat) => ({

        value: cat.id,
        label: cat.name,
      }));
    },
    subcategoryOptions() {
      return this.subCategories.map((subCat) => ({
        value: subCat.id,
        label: subCat.name,
      }));

    },

    provinceOptions() {
      return this.provinces.map((pro) => ({ value: pro.id, label: pro.name }));
    },
    cityOptions() {
      // const selectedProvince = this.provinces.find((province) => province.id === this.selectedProvince);

      return this.cities.map((city) => ({ value: city.id, label: city.name }));


    },
  },
  watch: {

  },
  methods: {
    showModal() {
      this.open = true;
    },
    updateImageCounter(imageCount) {
      this.imageCounter = imageCount;
    },
    handleOk(e) {
      console.log(e);
      this.open = false;
      this.$router.push('/');
    },
    hasRequiredFields(validation) {
      
     validation.map(item => {
        if(item.required==='true'){
         return true
      }else{
        return false
      }
      }
     
      );
     
    },

    handledataChange() {

    },



    logFormData(fieldName, value) {
  

      if (Array.isArray(value)) {
        value = value.join(',');
      }
      console.log(this.formData.imageUrl)
      this.formData.attribute = this.formData.attribute.filter(arr => fieldName != arr.fieldId);
      this.formData.attribute.push({ value: value, fieldId: fieldName });
      this.formD={ ...this.formD, [fieldName]: value };


      // console.log(`Form Data for ${fieldName}:`, value);
      // console.log("Fomr data", this.formData);
    },
    logFormData2(fieldName, value) {
      this.formData = { ...this.formData, [fieldName]: value };
      this.formD={ ...this.formD, [fieldName]: value };


      // console.log(`Form Data for ${fieldName}:`, value);
      // console.log("Fomr data", this.formData);
    },
   

      // Form validation successful, proceed with submitting the form
   

    submitForm() {
     
      this.loading = true;


      console.log('Form Data Before:', this.formData);

      const foundSubCategory = this.subCategories.find(subCategory => subCategory.id === this.selectedSubCategory);
      const foundCategory = this.categories.find(category => category.id === this.selectedCategory);
      const foundProvince = this.provinces.find(province => province.id === this.selectedProvince);
      const foundCity = this.cities.find(city => city.id === this.selectedCity);


      this.formData = { ...this.formData, ['subCategory']: foundSubCategory };
      this.formData = { ...this.formData, ['region']: foundProvince };
      this.formData = { ...this.formData, ['city']: foundCity };
      this.formData = { ...this.formData, ['category']: foundCategory };
      this.formData = { ...this.formData, ['user']: this.store.state.user.userData };
      this.formData = { ...this.formData, ['countViews']: 0 };



      APIPost.createProductPost(this.formData).then((res) => {
        this.loading = false;
        this.succuss = true;
        this.showModal();


        // console.log("success", res.data);

      })

      // console.log('Form Data After:', this.formData);
    },
    clearForm() {
      this.formData = {
        attribute: [],
        imageUrl: []
      };
      this.value = "";
      this.modalVisible = false;
      this.selectedCategory = null;
      this.selectedSubCategory = null;
      this.selectedProvince = null;
      this.selectedCity = null;
      
    },
    logger() {
      // console.log(this.cities);
    },
    async fetchOptions(id) {
      let optionsOfField = [];
      await API.getValuebyField(id).then(res => {
        if (res.data) {
          for (let i = 0; i < res.data.length; i++) {
            optionsOfField.push(res.data[i].value);
          }
          console.log("array", optionsOfField);

        }


      }).catch(err => {
        console.log(err)
      })
    
      return optionsOfField;
    },
    async fetchValidation(id) {
      let validationOfField = [];
      await API.getValidationbyField(id).then(res => {
        validationOfField = res.data;

      }).catch(err => {
        console.log(err)
      })

      return validationOfField;
    },
    async onNext() {
      if (this.selectedCategory == null || this.selectedSubCategory == null || this.selectedProvince == null || this.selectedCity == null) {
        this.validationError = true;
        const validationErrorO = new Validation();
        validationErrorO.rule = "dropDown";
        validationErrorO.message = "Select all of the above fields."
        this.validation.push(validationErrorO);
        return


      } else {
        if (this.imageCounter == 0) {
          this.validationError = true;
          const imageValidationError = new Validation();
          imageValidationError.rule = "imageRequired"
          imageValidationError.message = "you must insert images,at least 1"
          this.validation.push(imageValidationError);

          this.modalVisible = false;

          return

        }

      }


      try {
        this.loading = true;
        const res = await API.getFieldbySubcategory(this.selectedSubCategory);
        const mappedFields = await Promise.all(
          res.data.map(async (item) => {
            const baseField = {
              label: item.label,
              type: item.inputType,
              name: item.name,
              id: item.id, // Set the default value as needed
            };

            // Fetch options from another API
            baseField.options = await this.fetchOptions(item.id);

            this.form = Object.fromEntries(
        baseField.options.map((field) => [field.name, null])
      );
            console.log("Options:", baseField.options);

            const validation = await this.fetchValidation(item.id);

            const mappedValidationData = validation.map((item) => {
                if (item.rule === "pattern") {
                  return {
                    pattern: new RegExp(item.value),
                    message: item.message,
                  };
                } else {
                  return {
                    [item.rule]: item.value,
                    message: item.message,
                  };
                }
              });
            baseField.validation = mappedValidationData;



            console.log("validation:", baseField.validation);

            return baseField;
          })
        );

        this.formFields.fields = mappedFields;
        console.log("Done", this.formFields.fields);
      } catch (err) {
        console.error(err);
      }
      this.loading = false;

      this.modalVisible = true;
    },
    onModalOk() {
      this.modalVisible = false;
    },
    onModalCancel() {
      this.modalVisible = false;
    },
    onFinish(values) {
      console.log('Form submitted with values:', values);
     this.submitForm();
    },

    handleSubCategoryChange(value) {
      this.selectedSubCategory = value;

    },
    onFinishFailed(errorInfo) {
      console.log('Failed:', errorInfo);
    
    
    },
 
    async handleCategoryChange(value) {
      this.selectedCategory = value;
      this.selectedSubCategory = null;
      console.log("this category", this.selectedCategory);
      API.getSubCategory(value).then(res => {
        // this.categories.find(category => category.id === value ).subCategories = res.data;
        this.subCategories = res.data;
        // console.log(this.categories.find(category => category.id === id ))
      }).catch(err => {
        console.log(err)
      })

    },
    handleProvinceChange(value) {
      console.log()

      API.getCity(value).then(res => {

        this.cities = res.data;
        console.log("handleProvinceChange", res.data);
      }).catch(err => {
        console.log(err)
      })
      this.selectedProvince = value;
      this.$nextTick(() => {
        this.selectedCity = null;
      });

    },
    handleCityChange(value) {
      this.selectedCity = value;
    },
    removeImage(imageId) {
      console.log("it work")
      this.formData.imageUrl = this.formData.imageUrl.filter(image => image.id !== imageId);
    }
  },
};
</script>
<style>
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #db8234;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  position: absolute;
  margin-top: -16px;
  /* Half of the height */
  margin-left: -16px;
  /* Half of the width */
  z-index: 999;
  /* Ensure the spinner appears on top */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.succussMessage {


  border-radius: 10%;
  width: 250px;
  height: 100px;
  position: absolute;
  margin-top: -16px;
  /* Half of the height */
  margin-left: -16px;
  /* Half of the width */
  z-index: 1000;
  /* Ensure the spinner appears on top */

}
</style>