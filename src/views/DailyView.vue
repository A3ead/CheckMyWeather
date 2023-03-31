<template>
  <div v-if="forecastData.forecast" class="title-and-cards-container">
    <div class="daily-weather-title">The Weather forecast for the next 3 days in <span style="color: var(--main-header-color);">{{ forecastData.location.name }}, {{ forecastData.location.country }}</span></div>
    <div class="cards-container">
      <div class="single-card-container" v-for="day in forecastData.forecast.forecastday" :key="day"><DayWeatherCard :propDayForecast="day"/></div>
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
      }
  },
  methods:{

  },
  mounted(){


  },
  computed:{
    forecastData(){return this.$store.getters.forecastDataGetter}
  }
}

</script>


