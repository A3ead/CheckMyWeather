import { createStore } from 'vuex'

export default createStore({
  state: {
    forecastData:{}
  },
  mutations: {
    changeForecastData(state,newdata)
    {
      state.forecastData = newdata
    },
  },
  actions: {
   
  },
  modules: {
  },
  getters: {
    forecastDataGetter: state=>state.forecastData,
}
})
