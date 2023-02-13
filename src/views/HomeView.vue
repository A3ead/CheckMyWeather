<template>
    <div class="cards-container">
        <CurrentWeatherCard/>
        <DayWeatherCard/>
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
    }
}

</script>


