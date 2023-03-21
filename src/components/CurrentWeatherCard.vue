<template>
    <div v-if="forecastData.current" class="current-card-container">
        <div class="current-card-header">
            <div class="current-card-header-left">
                <span style="font-size: x-large;">Current Weather:</span>
                <span style="font-size: x-large; color: var(--main-header-color);">{{ findDay()[0] }}</span>
                <span style="font-size: x-large;">{{ findDay()[1] }}</span>
            </div>
            <div class="current-card-header-right">
                <div class="current-card-img-container">
                    <img class="current-card-img" src="https://www.pngall.com/wp-content/uploads/2016/07/Sun-PNG-Picture.png">
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


export default{
    props:{
        
    },
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


