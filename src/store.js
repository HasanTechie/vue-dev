import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    hotelsData: []
  },
  mutations: {
    change(state, hotelsData){
      state.hotelsData = hotelsData
    }
  },
  getters : {
    hotelsData: state => state.hotelsData
  }
})
