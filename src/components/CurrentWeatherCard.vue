<template>
    <div v-if="forecastData.current" class="current-card-container">
        <div class="current-card-header">
            <div class="current-card-header-left">
                <span style="font-size: x-large;">Current Weather:</span>
                <span style="font-size: x-large; color: var(--main-header-color);">{{ forecastData.location.name }}, {{ forecastData.location.country}}</span>
                <span style="font-size: x-large;">{{ findDay(forecastData)[1] }}</span>
            </div>
            <div class="current-card-header-right">
                <div class="current-card-img-container">
                    <img class="current-card-img" v-bind:src="forecastData.current.condition.icon">
                </div>
                <div class="current-card-temp">
                    <span>Current Temp.: {{forecastData.current.temp_c}} °C</span>
                    <span>Real Feel: {{forecastData.current.feelslike_c}} °C</span>
                </div>
            </div>
        </div>
        <div class="card-seperator"></div>
        <div class="current-card-bottom-container">
            <div class="current-card-bottom-left">
            <span>Precipitation:</span>
            <span>Humidity:</span>
            <span>Wind Speed:</span>
            <span>Wind Direction:</span>
            <span>Visibility:</span>
            <span>Pressure:</span>
        </div>
        <div class="current-card-bottom-right">
            <span>{{forecastData.current.precip_mm}} mm</span>
            <span>{{forecastData.current.humidity}}%</span>
            <span>{{forecastData.current.wind_kph}} km/h</span>
            <span>{{forecastData.current.wind_dir}}</span>
            <span>{{forecastData.current.vis_km}} km</span>
            <span>{{forecastData.current.pressure_mb}} mb</span>
        </div>
        </div>

    </div>
</template>

<script>

import day_date_mixin from '../mixins/day_date_mixin'

export default{
    props:{
        hourIndex: '',
        dayIndex: ''
    },
    data(){
        return{
            
        }
    },
    mixins:[day_date_mixin],
    methods:{

    },
    mounted(){

    },
    computed:{
        forecastData(){return this.$store.getters.forecastDataGetter},
        hourForecast(){
            if(!this.hourIndex){
                return this.forecastData.current
            }else{
                return this.forecastData.forecastday[this.dayIndex].hour[this.hourIndex]
            }
        }
    }
}

</script>


