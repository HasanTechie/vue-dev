import axios from 'axios/index'

const apiClient = axios.create({
    baseURL: 'http://35.158.76.194/api/',
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

if (localStorage.getItem('user')) {
    if (JSON.parse(localStorage.getItem('user')).user) {
        var userid = JSON.parse(localStorage.getItem('user')).user.id;
        var usercity = JSON.parse(localStorage.getItem('user')).city;
    }
}

export default {

    getHotels(country_code = 'All') {
        return apiClient.get('/hotels&get=0' + this.getApiKey() + '&country_code=' + country_code)
    },

    getPricesNew(userid, date) {
        return apiClient.get('allroomsprices&get=0' + this.getApiKey() + '&userid=' + userid + '&datefrom=' + date + '&dateto=' + date)
    },

    getCompetitorAvgPrices(competitorsids) {

        return apiClient.get('competitorsavgprices&get=50' + this.getApiKey() + '&hotelid=21&datefrom=2019-04-25&dateto=2020-05-28' + '&competitorsid=' + competitorsids)
    },

    getProcessedCSVsById(user_id) {
        return apiClient.get('getprocessedcsvs&get=0' + this.getApiKey() + '&userid=' + user_id)
    },

    getCompetitorAvgPricesForDates(competitorsids, dateOne, dateTwo) {
        return apiClient.get('competitorsavgpricesold&get=0' + this.getApiKey() + '&hotelid=21&datefrom=' + dateOne + '&dateto=' + dateTwo + '&competitorsid=' + competitorsids)
    },

    getCompetitorPricesApex(selectedRoom, dateOne = '2019-01-01', dateTwo = '2020-01-01') {

        if (dateOne === '') {
            dateOne = '2019-01-01'
            dateTwo = '2021-01-01'
        }

        return apiClient.get('competitorspricesapex&get=0' + this.getApiKey() + '&userid=' + userid + '&datefrom=' + dateOne + '&dateto=' + dateTwo + '&room=' + selectedRoom)
    },

    getCompetitors() {
        return '&competitorsid=' + this.$store.getters.competitorsids
    },

    getEvents() {
        return apiClient.get('events&get=0' + this.getApiKey() + '&city=' + usercity)
    },

    getApiKey() {
        return '&apiKey=KuKMQbgZPv0PRC6GqCMlDQ7fgdamsVY75FrQvHfoIbw4gBaG5UX0wfk6dugKxrtW'
    },

    getCompetitorRoomsAvgPrices(room = 'All', dateOne = '2019-01-01', dateTwo = '2021-01-01') {
        return apiClient.get('competitorsavgprices&get=0' + this.getApiKey() + '&userid=' + userid + '&datefrom=' + dateOne + '&dateto=' + dateTwo + '&room=' + room)
    },

    getCompetitorRoomsPrices(room = 'All', dateOne = '2019-01-01', dateTwo = '2021-01-01') {
        return apiClient.get('competitorsroomsprices&get=0' + this.getApiKey() + '&userid=' + userid + '&datefrom=' + dateOne + '&dateto=' + dateTwo + '&room=' + room)

    },

    getProcessedCSVs() {
        return apiClient.get('getprocessedcsvs&get=0' + this.getApiKey() + '&userid=' + userid)
    }
}