<template>
  <a-row>
    <a-col>
      <a-select
        v-model="selectedCategory"
        show-search
        style="width: 150px"
        placeholder="Select a category"
        :options="categoryOptions"
        @change="handleCategoryChange"
      ></a-select>
    </a-col>
    <a-col>
      <a-select
        v-model="selectedSubCategory"
        show-search
        style="width: 150px"
        placeholder="Select a subcategory"
        :options="subcategoryOptions"
        @change="handleSubCategoryChange"
      ></a-select>
    </a-col>
  </a-row>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'Electronics',
          subCategories: [
            { id: 11, name: 'Phones' },
            { id: 12, name: 'Laptops' },
          ],
        },
        {
          id: 2,
          name: 'Clothing',
          subCategories: [
            { id: 21, name: "Men's Clothing" },
            { id: 22, name: "Women's Clothing" },
          ],
        },
        {
          id: 3,
          name: 'Books',
          subCategories: [
            { id: 31, name: 'Fiction' },
            { id: 32, name: 'Non-Fiction' },
          ],
        },
      ],
      selectedCategory: null,
      selectedSubCategory: null,
    };
  },
  computed: {
    categoryOptions() {
      return this.categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
      }));
    },
    subcategoryOptions() {
      const selectedCat = this.categories.find((cat) => cat.id === this.selectedCategory);
      return selectedCat ? selectedCat.subCategories.map((subCat) => ({
        value: subCat.id,
        label: subCat.name,
      })) : [];
    },
  },
  methods: {
    handleCategoryChange(value) {
      this.selectedCategory = value;
      this.selectedSubCategory = null;
    },
    handleSubCategoryChange(value) {
      this.selectedSubCategory = value;
    },
  },
};
</script>
