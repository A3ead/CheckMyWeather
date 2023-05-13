
<template>
  <div class="website-header">
    <div class="title-and-menu">
      <div class="website-title">CheckMyWeather</div>
      <div id="nav" class="header-menu">
        <RouterLink class="menu-item" to="/">Current</RouterLink>
        <RouterLink class="menu-item" to="/daily">Daily</RouterLink>
        <RouterLink class="menu-item" to="/hourly">Hourly</RouterLink>
        <!-- <RouterLink class="menu-item" to="/daily">Daily</RouterLink> -->
      </div>
    </div>
    <div class="search-and-toggles-parent">
      <div id='search-dropdown-parent' class="search-dropdown-parent">
        <input type="text" id='search' :class="[{'search-input-focus':searchDropDown},'search-input']" v-model="userInput" autocomplete = 'off' @keydown.enter="sendSearch()" placeholder="Search City ..">
        <div v-if="searchDropDown==true" class="search-dropdown" tabindex="0">
          <div @click="getForecast(city.name + ', ' + city.country)" class="search-dropdown-result" v-for="city in searchResults" :key="city">{{city.name}}, {{city.country}}</div>
        </div>
      </div>
      <div class="toggles-container">
        <div class="dark-mode-toggle-switch">
           <font-awesome-icon icon="fa-solid fa-sun" />
          <label class="switch" @change="darkModeToggle()">
            <input id="darkmode-checkbox" type="checkbox">
            <span class="slider round"></span>
          </label>
          <font-awesome-icon icon="fa-solid fa-moon" />
        </div>
        <div class="dark-mode-toggle-switch">
          <span class="unit-system-toggle-symbol">°C</span>
          <label class="switch" @change="unitSystemToggle()">
            <input id="unit-system-checkbox" type="checkbox">
            <span class="slider round"></span>
          </label>
          <span class="unit-system-toggle-symbol">°F</span>
        </div>
      </div>

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
    components:{
      
    },
    data(){
        return{
          searchDropDown: false,
          searchResults:[],
          userInput:'',
          timer:null,
          darkMode: false,
          isImperial: false
        }
    },
    methods:{
      async getForecast(city = 'auto:ip'){

        const request = await fetch(`/api/getWeather?q=${city}`)
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

      async sendSearch(){
        console.log(this.userInput)
        await this.citySearch(this.userInput)
        this.getForecast(this.searchResults[0].name)
      },

      darkModeToggle(){
        function setPropertyLeDocument(varName, value){
          document.documentElement.style.setProperty(varName, value)
        }
        if(this.darkMode == false)
        {
          
          setPropertyLeDocument('--main-background-color','linear-gradient(130deg,#2a2d35,#2f323b 60%,#464b58 85%)')
          setPropertyLeDocument('--main-card-bg-color','#2c2f38')
          setPropertyLeDocument('--main-text-color','#F3F3F3')
          setPropertyLeDocument('--main-darkmode-icon-color','#FFFFFF')
          setPropertyLeDocument('--text-highlight-color','#27272a82')
          setPropertyLeDocument('--tabs-hover-color','#3a415499')


          
          //console.log("should be dark")
          this.darkMode = true
          localStorage.setItem("darkMode",true)
        }
        else
        {
          
          setPropertyLeDocument('--main-background-color','linear-gradient(130deg,#f1f1f1,#d5d0c7 60%,#cdbbabd6 85%)')
          setPropertyLeDocument('--main-card-bg-color','#eae9e7')
          setPropertyLeDocument('--main-text-color','#2c3e50')
          setPropertyLeDocument('--main-darkmode-icon-color','#1F1E1F')
          setPropertyLeDocument('--text-highlight-color','#efb5996e')
          setPropertyLeDocument('--tabs-hover-color','#e38080')


          //console.log("should be light")
          this.darkMode = false
          localStorage.setItem("darkMode",false)

        }
        
      },

      unitSystemToggle(){
        if(this.isImperial == false){
          //console.log("should be dark")
          this.isImperial = true
          localStorage.setItem("isImperial", true)
          this.$store.commit('changeIsImperial', true)
        }
        else{
          //console.log("should be light")
          this.isImperial = false
          localStorage.setItem("isImperial", false)
          this.$store.commit('changeIsImperial', false)
        }
      }
    },
    mounted(){
      this.getForecast()

      let searchTab = document.getElementById('search')
      searchTab.addEventListener('keydown',event=>{

        setTimeout(()=>{
          if(this.userInput.trim().length > 2)
          {
            this.searchDropDown = true
          }
        },1000)

        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{this.citySearch(this.userInput)},500)
      })
      searchTab.addEventListener('focus',event=>{
        if(this.userInput.trim().length > 2)
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

    if(localStorage.getItem('darkMode') == 'false'){
      this.darkMode = true
    }
    else{
      this.darkMode = false
      document.getElementById('darkmode-checkbox').checked = true
    }
    this.darkModeToggle()

    if(localStorage.getItem('isImperial') == 'true'){
      console.log('false')
      this.isImperial = false
      document.getElementById('unit-system-checkbox').checked = true
    }
    else{
      console.log('not false')
      this.isImperial = true

    }
    this.unitSystemToggle()

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
