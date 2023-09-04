
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

  <div class="website-footer">Powered by <a style="margin-left: 3px; color: var(--main-header-color);" href="https://www.weatherapi.com/" title="Free Weather API">WeatherAPI.com</a><a style="margin-left: 15px;" href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com"></a></div>
  
  
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
          
          setPropertyLeDocument('--main-background-color','rgb(235, 234, 232)')
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
      console.log('hii')
      this.darkMode = true
    }
    else if(localStorage.getItem('darkMode') == 'true'){
      console.log('hiii')
      this.darkMode = false
      document.getElementById('darkmode-checkbox').checked = true
    }
    else{
      console.log('hiiii')
      this.darkMode = true
      document.getElementById('darkmode-checkbox').checked = false
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


</style>
