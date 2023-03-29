<template>
    <div class="search-dropdown-result" v-for="city in searchResults" :key="city">
        {{city.name}}, {{city.country}}
    </div>

</template>

<script>

export default {
  name: 'SearchDropdown',
  props: {
      searchResults:'',
  },
  data(){
    return{

    }
  },
  methods:{

      
    
  },
  computed:{

  },

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import '../assets/style.css';

</style>