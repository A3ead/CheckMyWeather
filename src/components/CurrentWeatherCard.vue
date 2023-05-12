<template>
    <div v-if="forecastData.current" class="current-card-container">
        <div class="current-card-header">
            <div class="current-card-header-left">
                <span v-if="!hourIndex && this.hourIndex !== 0" style="font-size: x-large;">Current Weather:</span>
                <span v-else style="font-size: x-large;">Time: {{ findCurrentTime() }}</span>
                <span style="font-size: x-large; color: var(--main-header-color);">{{ forecastData.location.name }}, {{ forecastData.location.country}}</span>
                <span style="font-size: x-large;">{{ findDay(findDayParameter())[1] }}</span>
            </div>
            <div class="current-card-header-right">
                <div class="current-card-img-container">
                    <img class="current-card-img" v-bind:src="hourForecast.condition.icon">
                </div>
                <div v-if="isImperial==false" class="current-card-temp">
                    <span>Current Temp.: {{hourForecast.temp_c}} °C</span>
                    <span>Real Feel: {{hourForecast.feelslike_c}} °C</span>
                </div>
                <div v-if="isImperial==true" class="current-card-temp">
                    <span>Current Temp.: {{hourForecast.temp_f}} °F</span>
                    <span>Real Feel: {{hourForecast.feelslike_f}} °F</span>
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
        <div v-if="isImperial==false" class="current-card-bottom-right">
            <span>{{hourForecast.precip_mm}} mm</span>
            <span>{{hourForecast.humidity}}%</span>
            <span>{{hourForecast.wind_kph}} km/h</span>
            <span>{{hourForecast.wind_dir}}</span>
            <span>{{hourForecast.vis_km}} km</span>
            <span>{{hourForecast.pressure_mb}} mb</span>
        </div>
        <div v-if="isImperial==true" class="current-card-bottom-right">
            <span>{{hourForecast.precip_in}} in</span>
            <span>{{hourForecast.humidity}}%</span>
            <span>{{hourForecast.gust_mph}} mph</span>
            <span>{{hourForecast.wind_dir}}</span>
            <span>{{hourForecast.vis_miles}} mi</span>
            <span>{{hourForecast.pressure_in}} in</span>
        </div>
        </div>

    </div>
</template>

<script>
import day_date_mixin from '../mixins/day_date_mixin'

export default{
    props:{
        hourIndex: '',
        dayIndex: '',
    },
    data(){
        return{

        }
    },
    mixins:[day_date_mixin],
    watch:{
    },
    methods:{
        findDayParameter(){
            if(!this.hourIndex && this.hourIndex !== 0){
                return this.forecastData
            }else{
                return this.forecastData.forecast.forecastday[this.dayIndex]
            }
        },
        findCurrentTime(){
            return this.hourForecast.time.slice(-5) 
        },
    },
    mounted(){

    },
    computed:{
        forecastData(){return this.$store.getters.forecastDataGetter},
        hourForecast(){
            if(!this.hourIndex && this.hourIndex !== 0){
                return this.forecastData.current
            }else{
                return this.forecastData.forecast.forecastday[this.dayIndex].hour[this.hourIndex]
            }
        },
        isImperial(){return JSON.parse(localStorage.getItem('isImperial'))}
    }
}

</script>


