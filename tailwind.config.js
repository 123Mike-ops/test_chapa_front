const { red } = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

      colors: {
        primary: '#0F112E',
        secondary: '#F35B05',
        tertiary: '#4339F2',
        'gray-F7': '#F7F7F7',
        'gray-E7': '#E7E7EA',
        'gray-3F': '#3F4158',
        'gray-1E': '#1E1E1E',
        'gray-6F': '#6F7082',
        'gray-F6': '#F6F6F6',
        'gray-9F': '#9FA0AB',
        'gray-0F': '#0F112E',
        'gray-CF': '#CFCFD5',
        'bl-23': '#231F20',
        custom_green:{
          100:'rgb(249,172,24)',
          200:'rgb(249,172,24,0.5)',
         
       },
       custom_yellow:{
         100:'#FFBA2F'
       },
       custom_gray:{
         100:'#CFCFD5',
         200:'#4339F21F',
         300:"#6F7082",
         800:'#EBF2F7',
         900:'#141522'
       },
       custom_blue:{
         100:'#546FFF',
         800:'#54577A',
         900:'#4339F2'
       },
       custom_black:{
        100:'rgb(28,28,28)'
       },
       custom_red:{
        100:'#FF0000'
       }
      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
