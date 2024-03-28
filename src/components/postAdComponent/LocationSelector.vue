<template>
    <a-space>
      <a-select
        v-model:value="selectedProvince"
        style="width: 150px"
        :options="provinceOptions"
      ></a-select>
      <a-select
        v-model:value="secondCity"
        style="width: 150px"
        :options="cityOptions"
      ></a-select>
    </a-space>
  </template>
  
  <script>
  import { computed, ref, watch } from 'vue';
  
  export default {
    setup() {
      const provinceData = [
        { id: '1', name: 'Addis Ababa' },
        { id: '2', name: 'Gambella Region' },
      ];
      const cityData = {
        '1': ['Addis Ketema', 'Bole', 'Kolfe Keranio'],
        '2': ['Aunak', 'Itang', 'Neur'],
      };
  
      const selectedProvince = ref(provinceData[0].id);
      const secondCity = ref(cityData[selectedProvince.value]?.[0] || ''); 
      const cities = computed(() => {
        return cityData[selectedProvince.value] || []; 
      });
  
      const logger = () => {
        console.log(cities.value);
      };
  
      watch(selectedProvince, (val) => {
        secondCity.value = cityData[val]?.[0] || ''; 
      });
  
      const provinceOptions = computed(() => {
        return provinceData.map((pro) => ({ value: pro.id, label: pro.name }));
      });
  
      const cityOptions = computed(() => {
        return cities.value.map((city) => ({ value: city, label: city }));
      });
  
      return {
        provinceData,
        cityData,
        selectedProvince,
        secondCity,
        cities,
        logger,
        provinceOptions,
        cityOptions,
      };
    },
  };
  </script>
  