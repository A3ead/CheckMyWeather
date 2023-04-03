<template>
    <div v-if="forecastData.forecast" class="title-and-cards-container">
      <div class="daily-weather-title">The hourly weather forecast for the next 3 days</div>
      <div class="list-and-card-container">
        <div class="hourly-list-container">
            <div class="hourly-list-header">
                <div class="hourly-list-header-tab" id="today" @click="highlightTab('today', 'hourly-list-header-tab')">Today</div>
                <div class="hourly-list-header-tab" id="tomorrow" @click="highlightTab('tomorrow', 'hourly-list-header-tab')">Tomorrow</div>
                <div class="hourly-list-header-tab" id="after-tomorrow" @click="highlightTab('after-tomorrow', 'hourly-list-header-tab')">Monday</div>
            </div>
            <div class="hourly-list-parent">
                <div class="hourly-list-element" :id="'hour'+ hourIndex" @click="highlightTab('hour'+ hourIndex, 'hourly-list-element')" v-for="(hourElement, hourIndex) in forecastData.forecast.forecastday[dayIndex].hour" :key="hourElement">
                  <span>{{ hourElement.time.slice(-5) }}</span>
                  <img class="hourly-list-img" v-bind:src="hourElement.condition.icon">
                  <span>Current Temp.: {{ hourElement.temp_c }} °C</span>
                  <span>Real Feel: {{ hourElement.feelslike_c }} °C</span>
                </div>
            </div>
        </div>
        <div class="hourly-card-container"></div>
      </div>
    </div>
  
  
  </template>
  
  <script>
  
  import DayWeatherCard from '@/components/DayWeatherCard.vue'
  
  
  export default{
    components:{
        DayWeatherCard,
    },
    data(){
        return{
            dayIndex:0
        }
    },
    watch:{
      // forecastData(new_,old){
      //   console.log('ih')
      //   this.highlightTab('today', 'hourly-list-header-tab')
      //   this.highlightTab('hour'+ this.findCurrentHourIndex(), 'hourly-list-element')
      // }
    },
    methods:{
      highlightTab(tabId, tabClassName){
        try {
          if(document.getElementsByClassName(tabClassName + '-selected')[0]){
            document.getElementsByClassName(tabClassName + '-selected')[0].className = tabClassName
          }

        }
        catch(error) {
            console.log(error)
        }
        finally {
          if(document.getElementById(tabId)){
            document.getElementById(tabId).className = tabClassName+'-selected'
          }
          
        }
      },
      findCurrentHourIndex(){
        return this.forecastData.forecast.forecastday[0].hour.findIndex(el => el.time.slice(0,-3) == this.forecastData.current.last_updated.slice(0,-3))
      }
    },
    mounted(){
      let checker = setInterval(()=>{
        if(Object.hasOwn(this.forecastData,'forecast')){
          this.highlightTab('today', 'hourly-list-header-tab')
          this.highlightTab('hour'+ this.findCurrentHourIndex(), 'hourly-list-element')
          clearInterval(checker)
      }
      },100)
    },
    computed:{
      forecastData(){return this.$store.getters.forecastDataGetter}
    }
  }
  
  </script>
  
  
  