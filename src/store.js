import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    message: '',
    competitorsArray: [],
    competitorsPricesArray: []
  },
  getters : {
    message: (state) => {
      return state.message
    },
    competitorsArray: state => state.competitorsArray,
    competitorsPricesArray : state => state.competitorsPricesArray
  },
  mutations: {
    SET_MESSAGE: (state, newValue) => {
      state.message = newValue
    },
    SET_COMPETITORS_ARRAY: (state, competitorsArray) => {
      state.competitorsArray = competitorsArray
    },
    SET_COMPETITORS_PRICE_ARRAY: (state, competitorsPricesArray) => {
      state.competitorsPricesArray = competitorsPricesArray
    }
  },
  actions: {
    setMessage: ({commit, state}, message) => {
      commit('SET_MESSAGE', message)
      return state.message
    },
    setCompetitorsArray: ({commit}, competitorsArray) => {
      commit('SET_COMPETITORS_ARRAY', competitorsArray)
      return true
    },
    setCompetitorsPriceArray: ({commit}, competitorsPricesArray) => {
      commit('SET_COMPETITORS_PRICE_ARRAY', competitorsPricesArray)
      return true
    }
  }
})