<template>
    <div v-if="forecastData.forecast" class="current-card-container">
        <div class="current-card-header">
            <div class="current-card-header-left">
                <span style="font-size: x-large;">Daily Weather:</span>
                <span style="font-size: x-large; color: var(--main-header-color);">{{ findDay()[0] }}</span>
                <span style="font-size: x-large;">{{ findDay()[1] }}</span>
            </div>
            <div class="current-card-header-right">
                <div class="current-card-img-container">
                    <img class="current-card-img" v-bind:src="forecastData.forecast.forecastday[0].day.condition.icon">
                </div>
                <div class="daily-card-temp">
                    <span>{{forecastData.forecast.forecastday[0].day.maxtemp_c}} / {{forecastData.forecast.forecastday[0].day.mintemp_c}} °C</span>
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
                    <span>{{forecastData.forecast.forecastday[0].day.avgtemp_c}} °C</span>
                    <span>{{forecastData.forecast.forecastday[0].day.totalprecip_mm}} mm</span>
                    <span>{{forecastData.forecast.forecastday[0].day.avghumidity}}%</span>
                    <span>{{forecastData.forecast.forecastday[0].day.maxwind_kph}} km/h</span>
                    <span>{{forecastData.forecast.forecastday[0].day.avgvis_km}} km</span>
                    <span>{{forecastData.forecast.forecastday[0].day.daily_chance_of_rain}}%</span>
                    <span>{{forecastData.forecast.forecastday[0].day.daily_chance_of_snow}}%</span>
                </div>
            </div>
            <div class="card-seperator"></div>
            <div class="sun-moon">
                <div class="sun-moon-left">
                    <span>Sunrise: {{forecastData.forecast.forecastday[0].astro.sunrise}}</span>
                    <span>Sunset: {{forecastData.forecast.forecastday[0].astro.sunset}}</span>
                </div>
                <div class="sun-moon-right">
                    <span>Moonrise: {{forecastData.forecast.forecastday[0].astro.moonrise}}</span>
                    <span>Moonset: {{forecastData.forecast.forecastday[0].astro.moonset}}</span>
                </div>
            </div>
        </div>
        

    </div>
</template>

<script>


export default{
    data(){
        return{
            
        }
    },
    methods:{
        findDay(){
            let currentDate = this.forecastData.current.last_updated
            let currentDay = new Date(currentDate)
            const currentDateFormated = this.formatDate(currentDay)
            let daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            let currentDayOfWeek = daysOfWeek[currentDay.getDay()]
            return [currentDayOfWeek, currentDateFormated]
        },
        formatDate(InputDate){
            const yyyy = InputDate.getFullYear();
            let mm = InputDate.getMonth() + 1; // Months start at 0!
            let dd = InputDate.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const formattedDate = dd + '.' + mm + '.' + yyyy;
            return formattedDate
        }
    },
    mounted(){

    },
    computed:{
        forecastData(){return this.$store.getters.forecastDataGetter}

    }
}

</script>


