<template>
    <div v-if="forecastData.forecast" class="current-card-container">
        <div class="current-card-header">
            <div class="current-card-header-left">
                <span v-if="!propDayForecast" style="font-size: x-large;">Today's Weather:</span>
                <span style="font-size: x-large; color: var(--main-header-color);">{{ findDay(dayForecast)[0] }}</span>
                <span style="font-size: x-large;">{{ findDay(dayForecast)[1] }}</span>
            </div>
            <div class="current-card-header-right">
                <div class="current-card-img-container">
                    <img class="current-card-img" v-bind:src="dayForecast.day.condition.icon">
                </div>
                <div class="daily-card-temp">
                    <span>{{dayForecast.day.maxtemp_c}} / {{dayForecast.day.mintemp_c}} °C</span>
                </div>
            </div>
        </div>
        <div class="card-seperator"></div>
        <div class="daily-card-bottom-container">
            <div class="daily-card-bottom-data">
                <div class="daily-card-bottom-left">
                    <span>Avg. Temperature:</span>
                    <span>Total Precipitation:</span>
                    <span>Avg. Humidity:</span>
                    <span>Max Wind Speed:</span>
                    <span>Avg. Visibility:</span>
                    <span>Chance of Rain:</span>
                    <span>Chance of Snow:</span>
                </div>
                <div class="daily-card-bottom-right">
                    <span>{{dayForecast.day.avgtemp_c}} °C</span>
                    <span>{{dayForecast.day.totalprecip_mm}} mm</span>
                    <span>{{dayForecast.day.avghumidity}}%</span>
                    <span>{{dayForecast.day.maxwind_kph}} km/h</span>
                    <span>{{dayForecast.day.avgvis_km}} km</span>
                    <span>{{dayForecast.day.daily_chance_of_rain}}%</span>
                    <span>{{dayForecast.day.daily_chance_of_snow}}%</span>
                </div>
            </div>
            <div class="card-seperator"></div>
            <div class="sun-moon">
                <div class="sun-moon-left">
                    <img class="sun-moon-img" src="//cdn.weatherapi.com/weather/64x64/day/113.png">
                    <div class="sun-moon-data-container">
                        <span>Sunrise: {{dayForecast.astro.sunrise}}</span>
                        <span>Sunset: {{dayForecast.astro.sunset}}</span>
                    </div>

                </div>
                <div class="sun-moon-right">
                    <img class="sun-moon-img" src="//cdn.weatherapi.com/weather/64x64/night/113.png">
                    <div class="sun-moon-data-container">
                        <span>Moonrise: {{dayForecast.astro.moonrise}}</span>
                        <span>Moonset: {{dayForecast.astro.moonset}}</span>
                    </div>
                </div>
            </div>
        </div>
        

    </div>
</template>

<script>

import day_date_mixin from '../mixins/day_date_mixin'

export default{
    props:{
        propDayForecast: {}
    },
    data(){
        return{
            // dayForecast:{},
            currentDate:'',
            currentDay:''
        }
    },
    mixins:[day_date_mixin],
    methods:{
 
    },
    mounted(){

    },
    computed:{
        forecastData(){return this.$store.getters.forecastDataGetter},
        dayForecast(){
            if(!this.propDayForecast){
                return this.forecastData.forecast.forecastday[0]
            }else{
                return this.propDayForecast
            }
        }
        

    }
}

</script>


