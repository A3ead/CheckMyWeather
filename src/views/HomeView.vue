<template>
    <div class="title-and-cards-container">
        <div v-if="forecastData.forecast" class="daily-weather-title">Current and Today's weather in <span style="color: var(--main-header-color);">{{ forecastData.location.name }}, {{ forecastData.location.country }}</span></div>
        <div class="cards-container">
            <CurrentWeatherCard class="single-card-container"/>
            <DayWeatherCard class="single-card-container"/>
         </div>
    </div>


</template>

<script>

import CurrentWeatherCard from '@/components/CurrentWeatherCard.vue'
import DayWeatherCard from '@/components/DayWeatherCard.vue'


export default{
    components:{
        CurrentWeatherCard,
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


