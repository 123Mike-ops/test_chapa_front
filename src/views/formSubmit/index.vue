<template>
  <form class="flex flex-col p-5 w-full">
    <div v-for="(field, index) in evenIndexedFields" :key="index" class="flex flex-row w-full">
      <div class="w-1/2 p-1">
        <template v-if="field.type === 'select' || field.type === 'input'">
          <a-input v-if="field.type === 'input'" :type="field.type" :name="field.name" v-model="formData[field.name]" class="w-full"/>
          <a-select v-else :name="field.name" v-model="formData[field.name]" :placeholder="field.label" class="w-full">
            <a-select-option v-for="option in field.options" :key="option" :value="option">{{ option }}</a-select-option>
          </a-select>
        </template>
      </div>
      <div v-if="formFields.fields[index + 1]" class="w-1/2 p-1">
        <template v-if="formFields.fields[index + 1].type === 'select' || formFields.fields[index + 1].type === 'input'">
          <a-input class="w-full" v-if="formFields.fields[index + 1].type === 'input'" :type="formFields.fields[index + 1].type" :name="formFields.fields[index + 1].name" v-model="formData[formFields.fields[index + 1].name]" />
          <a-select class="w-full" v-else :name="formFields.fields[index + 1].name" v-model="formData[formFields.fields[index + 1].name]" :placeholder="formFields.fields[index + 1].label">
            <a-select-option v-for="option in formFields.fields[index + 1].options" :key="option" :value="option">{{ option }}</a-select-option>
          </a-select>
        </template>
      </div>
    </div>
    <a-button type="primary" @click="submitForm">Submit</a-button>
  </form>
</template>


<script>
export default {
  data() {
    return {
      formFields: {
        "fields": [
          { "label": "Make", "type": "select", "name": "make", "options": ["House", "Apartment"], "value": "" },
          { "label": "Model", "type": "select", "name": "model", "options": ["Fairly Used", "Newly Built"], "value": "" },
          { "label": "Year of Manufacture", "type": "select", "name": "yearofmanufacture", "options": ["2021", "2022", "2023"], "value": "" },
          { "label": "Color", "type": "select", "name": "color", "options": ["Black", "White", "Red"], "value": "" },
          { "label": "Interior Color", "type": "select", "name": "interiorcolor", "options": ["Black", "White", "Red"], "value": "" },
          { "label": "Condition", "type": "select", "name": "condition", "options": ["Fairly Used", "Newly Built"], "value": "" },
          { "label": "Mileage", "type": "input", "name": "mileage", "value": "" },
          { "label": "Key Features", "type": "select", "name": "keyFeatures", "options": ["Bull Bar", "Car Play", "CD Player"], "value": [] },
          { "label": "VIN Number", "type": "input", "name": "VinNum", "value": "" },
          { "label": "Registered Car", "type": "radio", "name": "registeredCar", "options": [1, 2], "value": 1 }
        ]
      },
      formData: {},
    };
  },
  computed: {
    evenIndexedFields() {
      return this.formFields.fields.filter((field, index) => index % 2 === 0);
    },
  },
  methods: {
    submitForm() {
      // Handle form submission here
      console.log('Form Data:', this.formData);
    },
  },
};
</script>

<style scoped>
/* Add Tailwind styles here */
</style>
