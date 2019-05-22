import Vue from 'vue/types'
import Vuex from 'vuex/types'
import axios from 'axios/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        message: '',
        competitorsArray: [],
        competitorsPricesArray: [],
        competitorsUids: '',
        User: null
    },
    getters: {
        message: (state) => {
            return state.message
        },
        competitorsArray: state => state.competitorsArray,
        competitorsPricesArray: state => state.competitorsPricesArray,
        competitorsUids: state => state.competitorsUids,
        loggedIn(state) {
            return !!state.user
        }
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
        },
        SET_COMPETITORS_UIDS: (state, competitorsUids) => {
            state.competitorsUids = competitorsUids
        },
        SET_USER_DATA(state, userData) {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
            axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
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
        },
        setCompetitorsUids: ({commit}, competitorsUids) => {
            commit('SET_COMPETITORS_UIDS', competitorsUids)
            return true
        },
        register({commit}, credentials) {
            return axios.post('http://solidps.test/api/register', credentials).then(
                ({data}) => {
                    commit('SET_USER_DATA', data)
                }
            )
        },
        login({commit}, credentials) {
            return axios.post('http://solidps.test/api/login', credentials).then(
                ({data}) => {
                    commit('SET_USER_DATA', data)
                }
            )
        }
    }
})