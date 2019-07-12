import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var serverURL = 'http://35.158.76.194/api';

export const store = new Vuex.Store({
    state: {
        message: '',
        competitorsArray: [],
        competitorsPricesArray: [],
        competitorsUids: '',
        avpriceDataArray: [],
        roomDataArray: [],
        today: '',
        roomtype: '',
        user: null
    },
    getters: {
        message: (state) => {
            return state.message
        },
        competitorsArray: state => state.competitorsArray,
        roomDataArray: state => state.roomDataArray,
        avpriceDataArray: state => state.avpriceDataArray,
        competitorsPricesArray: state => state.competitorsPricesArray,
        competitorsUids: state => state.competitorsUids,
        today: state => state.today,
        roomtype: state => state.roomtype,
        loggedIn() {
            return !!localStorage.getItem('user')
        }
    },
    mutations: {
        SET_MESSAGE: (state, newValue) => {
            state.message = newValue
        },
        SET_COMPETITORS_ARRAY: (state, competitorsArray) => {
            state.competitorsArray = competitorsArray
        },
        SET_AVPRICE_DATA_ARRAY: (state, avpriceDataArray) => {
            state.avpriceDataArray = avpriceDataArray
        },
        SET_ROOM_DATA_ARRAY: (state, roomDataArray) => {
            state.roomDataArray = roomDataArray
        },
        SET_COMPETITORS_PRICE_ARRAY: (state, competitorsPricesArray) => {
            state.competitorsPricesArray = competitorsPricesArray
        },
        SET_COMPETITORS_UIDS: (state, competitorsUids) => {
            state.competitorsUids = competitorsUids
        },
        SET_TODAY: (state, today) => {
            state.today = today
        },
        SET_ROOM_TYPE: (state, roomtype) => {
            state.roomtype = roomtype
        },
        SET_USER_DATA(state, userData) {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
            axios.defaults.headers.common['Authorization'] = `Bearer ${
                userData.token
                }`
        },
        CLEAR_USER_DATA(state) {
            localStorage.removeItem(('user'))
            state.user = null
            axios.defaults.headers.common['Authorization'] = null
            // location.reload()
        }
    },
    actions: {
        setMessage: ({commit, state}, message) => {
            commit('SET_MESSAGE', message)
            return state.message
        },
        setavpriceDataArray: ({commit}, competitorsPricesArray) => {
            commit('SET_AVPRICE_DATA_ARRAY', competitorsPricesArray)
            return true
        },
        setCompetitorsArray: ({commit}, competitorsArray) => {
            commit('SET_COMPETITORS_ARRAY', competitorsArray)
            return true
        },
        setRoomDataArray: ({commit}, roomDataArray) => {
            commit('SET_ROOM_DATA_ARRAY', roomDataArray)
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
        setToday: ({commit}, today) => {
            commit('SET_TODAY', today)
            return true
        },
        setRoomType: ({commit}, roomtype) => {
            commit('SET_ROOM_TYPE', roomtype)
            return true
        },
        register({commit}, credentials) {
            return axios
                .post(serverURL + '/register', credentials)
                .then(({data}) => {
                    commit('SET_USER_DATA', data)
                })
        },
        login({commit}, credentials) {
            return axios
                .post(serverURL + '/login', credentials)
                .then(({data}) => {
                    commit('SET_USER_DATA', data)
                })
        },
        storeCompetitor(dataToBeStored) {
            var config = {
                headers: {
                    'Authorization': "Bearer " +
                        JSON.parse(localStorage.getItem('user')).access_token
                }
            };
            return axios
                .post(serverURL + '/competitors',
                    dataToBeStored, config)
                .then(() => {
                })
        },
        deleteCompetitor(dataToBeDeleted) {
            var config = {
                headers: {
                    'Authorization': "Bearer " +
                        JSON.parse(localStorage.getItem('user')).access_token
                }
            };

            return axios
                .get(serverURL + '/competitors&user_id=' +
                    dataToBeDeleted.user_id + '&hotel_id=' +
                    dataToBeDeleted.hotel_id, config)
                .then(() => {
                })
        },
        getAllCompetitor() {
            var config = {
                headers: {
                    'Authorization': "Bearer " +
                        JSON.parse(localStorage.getItem('user')).access_token
                }
            };

            return axios
                .get(serverURL + '/competitors', config)
                .then(({data}) => {
                    return data
                })
        },
        logout({commit}) {
            commit('CLEAR_USER_DATA')
        }
    }
})