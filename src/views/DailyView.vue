<template>
  <div v-if="forecastData.forecast" class="cards-container">
    <div v-for="day in forecastData.forecast.forecastday" :key="day"><DayWeatherCard :dayForecast="day"/></div>
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


