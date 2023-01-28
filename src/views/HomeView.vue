<template>
    <div class="cards-container">
        <CurrentWeatherCard/>
        <DayWeatherCard/>
    </div>


</template>

<script>

import axios from 'axios'
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
        testfunction(){
            axios.get(`http://localhost:3000/daily`)
            .then(res=>{
                console.log(res.data)
            })
        },

    },
    mounted(){


    },
    computed:{
        forecastData(){return this.$store.getters.forecastDataGetter}
    }
}

</script>


