
<template>
  <div class="website-header">
    <div class="title-and-menu">
      <div class="website-title">CheckMyWeather</div>
      <div id="nav" class="header-menu">
        <RouterLink class="menu-item" to="/">Current</RouterLink>
        <!-- <RouterLink class="menu-item" to="/daily">Daily</RouterLink> -->
      </div>
    </div>
      <div class="searchbar">
        <!-- <input type="text" id='search' :class="[{'search-input-focus':searchDropDown},'search-input']" v-model="userInput" autocomplete = 'off' @keydown.enter="sendSearch()" placeholder="Search City .."> -->
      </div>

  </div>

    <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav> -->
  <RouterView />
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'

export default{
    data(){
        return{
          searchDropDown: false
        }
    },
    methods:{
      async getForecast(){

        const request = await fetch('/api/getWeather')
        const response = await request.json()
        this.$store.commit('changeForecastData', response)
        console.log(response)
        }
    },
    mounted(){
      this.getForecast()
    }
}
</script>

<style>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}


nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */

</style>
