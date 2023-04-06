<template>
    <div v-if="forecastData.forecast" class="title-and-cards-container">
      <div class="daily-weather-title">The hourly weather forecast for the next 3 days</div>
      <div class="list-and-card-container">
        <div class="hourly-list-container">
            <div class="hourly-list-header">
                <div class="hourly-list-header-tab" id="today" @click="dayIndex = 0, highlightTab('today', 'hourly-list-header-tab')">Today</div>
                <div class="hourly-list-header-tab" id="tomorrow" @click="dayIndex = 1, highlightTab('tomorrow', 'hourly-list-header-tab')">Tomorrow</div>
                <div class="hourly-list-header-tab" id="after-tomorrow" @click="dayIndex = 2,highlightTab('after-tomorrow', 'hourly-list-header-tab')">{{ findDay(forecastData)[0] }}</div>
            </div>
            <div class="hourly-list-parent">
                <div class="hourly-list-element" :id="'hour'+ setId(hourElement)" @click="highlightTab('hour'+ setId(hourElement), 'hourly-list-element')" v-for="hourElement in forecastData.forecast.forecastday[dayIndex].hour" :key="hourElement">
                  <span>{{ hourElement.time.slice(-5) }}</span>
                  <img class="hourly-list-img" v-bind:src="hourElement.condition.icon">
                  <span>Current Temp.: {{ hourElement.temp_c }} °C</span>
                  <span>Real Feel: {{ hourElement.feelslike_c }} °C</span>
                  <font-awesome-icon icon="fa-solid fa-angle-right" />
                </div>
            </div>
        </div>
        <div class="hourly-card-container"></div>
      </div>
    </div>
  
  
  </template>
  
<script>
  
import DayWeatherCard from '@/components/DayWeatherCard.vue'
import day_date_mixin from '../mixins/day_date_mixin'
  
  
export default{
  components:{
      DayWeatherCard,
  },
  data(){
      return{
          dayIndex:0
      }
  },
  mixins:[day_date_mixin],
  watch:{
    forecastData(new_,old){
      this.dayIndex = 0
      this.$nextTick(()=>{
        console.log('hi watcher')
        this.highlightTab('today', 'hourly-list-header-tab')
        this.highlightTab('hour'+ this.findCurrentHourIndex(), 'hourly-list-element')

      })
    },
    dayIndex(new_,old){
      this.$nextTick(()=>{
        console.log('hi watcher2')
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
      console.log('hi mounted')
      this.highlightTab('today', 'hourly-list-header-tab')
      if(Object.hasOwn(this.forecastData,'forecast')){
      console.log('hi mounted2')
        this.highlightTab('hour'+ this.findCurrentHourIndex(), 'hourly-list-element')
        let selectedDiv = document.getElementsByClassName('hourly-list-element-selected')[0]
        selectedDiv.scrollIntoView()
      }
    })
  },
  computed:{
    forecastData(){return this.$store.getters.forecastDataGetter}
  }
}

</script>


