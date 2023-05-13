<template>
    <div v-if="forecastData.forecast" class="title-and-cards-container">
      <div class="daily-weather-title">The hourly weather forecast for the next 3 days in <span style="color: var(--main-header-color);">{{ forecastData.location.name }}, {{ forecastData.location.country }}</span></div>
      <div class="list-and-card-container">
        <div class="hourly-list-container">
            <div class="hourly-list-header">
                <div class="hourly-list-header-tab" id="today" @click="dayIndex = 0, highlightTab('today', 'hourly-list-header-tab')">Today</div>
                <div class="hourly-list-header-tab" id="tomorrow" @click="dayIndex = 1, selectedHourIndex=0, highlightTab('tomorrow', 'hourly-list-header-tab')">Tomorrow</div>
                <div class="hourly-list-header-tab" id="after-tomorrow" @click="dayIndex = 2, selectedHourIndex=0,highlightTab('after-tomorrow', 'hourly-list-header-tab')">{{ findDay(forecastData)[0] }}</div>
            </div>
            <div class="hourly-list-parent-container">
              <div class="hourly-list-parent">
                <div class="hourly-list-element" :id="'hour'+ setId(hourElement)" @click="highlightTab('hour'+ setId(hourElement), 'hourly-list-element'), selectedHourIndex=hourIndex" v-for="hourElement, hourIndex in forecastData.forecast.forecastday[dayIndex].hour" :key="hourElement">
                  <span>{{ hourElement.time.slice(-5) }}</span>
                  <img class="hourly-list-img" v-bind:src="hourElement.condition.icon">
                  <span v-if="!isImperial">Temperature: {{ hourElement.temp_c }} °C</span>
                  <span v-if="!isImperial">Real Feel: {{ hourElement.feelslike_c }} °C</span>
                  <span v-if="isImperial">Temperature: {{ hourElement.temp_f }} °F</span>
                  <span v-if="isImperial">Real Feel: {{ hourElement.feelslike_f }} °F</span>
                  <font-awesome-icon icon="fa-solid fa-angle-right" />
                </div>
              </div>
            </div>

        </div>
        <div class="hourly-card-container">
          <CurrentWeatherCard :dayIndex="dayIndex" :hourIndex="selectedHourIndex" class="hourly-card"/>
        </div>
      </div>
    </div>
  
  
  </template>
  
<script>
  
import CurrentWeatherCard from '@/components/CurrentWeatherCard.vue'
import day_date_mixin from '../mixins/day_date_mixin'
  
  
export default{
  components:{
    CurrentWeatherCard,
  },
  data(){
      return{
          dayIndex:0,
          selectedHourIndex:0
      }
  },
  mixins:[day_date_mixin],
  watch:{
    forecastData(new_,old){
      this.dayIndex = 0
      this.selectedHourIndex = this.forecastData.forecast.forecastday[this.dayIndex].hour.findIndex(el => el.time.slice(-5,-3) == this.forecastData.current.last_updated.slice(-5,-3))
      this.$nextTick(()=>{
        this.highlightTab('today', 'hourly-list-header-tab')
        this.highlightTab('hour'+ this.findCurrentHourIndex(), 'hourly-list-element')
        let selectedDiv = document.getElementsByClassName('hourly-list-element-selected')[0]
        selectedDiv.scrollIntoView()
      })
    },
    dayIndex(new_,old){
      if(new_ == 0){
        this.selectedHourIndex = this.forecastData.forecast.forecastday[new_].hour.findIndex(el => el.time.slice(-5,-3) == this.forecastData.current.last_updated.slice(-5,-3))
      }
      this.$nextTick(()=>{
        this.highlightTab('hour'+ this.findCurrentHourIndex(), 'hourly-list-element')
        let selectedDiv = document.getElementsByClassName('hourly-list-element-selected')[0]
        selectedDiv.scrollIntoView()
      })
    }
  },
  methods:{
    listToRender(){
      if(this.dayIndex == 0){
        return this.forecastData.forecast.forecastday[this.dayIndex].hour.slice(this.findCurrentHourIndex())
      }else{
        return this.forecastData.forecast.forecastday[this.dayIndex].hour
      }
    },

    setId(hourElement){
      let id = hourElement.time.slice(-5,-3)
      //console.log(id)
      return id
    },
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
      if(this.dayIndex == 0){
        const hourIndex = this.forecastData.forecast.forecastday[this.dayIndex].hour.findIndex(el => el.time.slice(-5,-3) == this.forecastData.current.last_updated.slice(-5,-3))
        return  this.forecastData.forecast.forecastday[this.dayIndex].hour[hourIndex].time.slice(-5,-3)
      }else{
        return '00'
      }

    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.highlightTab('today', 'hourly-list-header-tab')
      if(Object.hasOwn(this.forecastData,'forecast')){
        this.selectedHourIndex = this.forecastData.forecast.forecastday[this.dayIndex].hour.findIndex(el => el.time.slice(-5,-3) == this.forecastData.current.last_updated.slice(-5,-3))
        this.highlightTab('hour'+ this.findCurrentHourIndex(), 'hourly-list-element')
        let selectedDiv = document.getElementsByClassName('hourly-list-element-selected')[0]
        selectedDiv.scrollIntoView()
      }
    })

  },
  computed:{
    forecastData(){return this.$store.getters.forecastDataGetter},
    isImperial(){return this.$store.getters.isImperialGetter}

  }
}

</script>


