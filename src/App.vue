
<template>
  <div class="website-header">
    <div class="title-and-menu">
      <div class="website-title">CheckMyWeather</div>
      <div id="nav" class="header-menu">
        <RouterLink class="menu-item" to="/">Current</RouterLink>
        <!-- <RouterLink class="menu-item" to="/daily">Daily</RouterLink> -->
      </div>
    </div>
      <div id='search-dropdown-parent' class="search-dropdown-parent">
        <input type="text" id='search' :class="[{'search-input-focus':searchDropDown},'search-input']" v-model="userInput" autocomplete = 'off' @keydown.enter="sendSearch()" placeholder="Search City ..">
        <div v-if="searchDropDown==true" class="search-dropdown" tabindex="0"><SearchDropdown :searchResults='searchResults'/></div>
      </div>

  </div>

    <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav> -->
  <RouterView />
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'
import SearchDropdown from '@/components/SearchDropdown.vue'

export default{
    components:{
      SearchDropdown
    },
    data(){
        return{
          searchDropDown: false,
          searchResults:[],
          userInput:null,
        }
    },
    methods:{
      async getForecast(){

        const request = await fetch('/api/getWeather')
        const response = await request.json()
        this.$store.commit('changeForecastData', response)
        console.log(response)
      },
        
      async citySearch(searchQuery){
        if(searchQuery.trim() != "" && searchQuery.trim().length > 2){
        //console.log('searching', 'search q = : ' + searchQuery)

        const request = await fetch(`/api/searchLocation?q=${searchQuery}`)
        const response = await request.json()
        this.searchResults = response
        console.log(this.searchResults)

        }
      },

        sendSearch(){

        }
    },
    mounted(){
      this.getForecast()

      let searchTab = document.getElementById('search')
      searchTab.addEventListener('keydown',event=>{
        this.searchDropDown = true
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{this.citySearch(this.userInput)},500)
      })
      searchTab.addEventListener('focus',event=>{
        if(this.userInput != '')
        {
          setTimeout(()=>{this.searchDropDown = true},200)
        }

      })
      let searchParent = document.getElementById('search-dropdown-parent')
      searchParent.addEventListener('focusout', event=> {
      if (searchParent.contains(event.relatedTarget)) {
          // don't react to this
          //console.log('ifffed')
          return;
      }
      //console.log('didnt if')
      this.searchDropDown = false  
    })

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
