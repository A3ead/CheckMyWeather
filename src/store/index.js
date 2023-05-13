import { createStore } from 'vuex'

export default createStore({
  state: {
    forecastData:{},
    isImperial:false
  },
  mutations: {
    changeForecastData(state,newdata)
    {
      state.forecastData = newdata
    },
    changeIsImperial(state,newdata)
    {
      state.isImperial = newdata
    },
  },
  actions: {
   
  },
  modules: {
  },
  getters: {
    forecastDataGetter: state=>state.forecastData,
    isImperialGetter: state=>state.isImperial,
  }
})
