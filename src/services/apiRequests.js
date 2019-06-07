import axios from 'axios/index'

const apiClient = axios.create({
    baseURL: 'http://35.158.76.194/api/',
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
if (localStorage.getItem('user').user.id) {
    var userid = JSON.parse(localStorage.getItem('user')).user.id;
}

export default {
    getHotels(city = 'All') {
        return apiClient.get('/hotels&get=0' + this.getApiKey() + '&city=' + city)
    },
    getPrices() {
        return apiClient.get('roomsprices&get=40' + this.getApiKey() + '&hotelid=21&datefrom=2019-04-25&dateto=2020-05-25')
    },
    getCompetitorAvgPrices(competitorsids) {
        return apiClient.get('competitorsavgpricesold&get=0' + this.getApiKey() + '&hotelid=21&datefrom=2019-05-05&dateto=2020-05-05&competitorsid=' + competitorsids)
    },
    getCompetitorAvgPricesForDates(competitorsids, dateOne, dateTwo) {
        return apiClient.get('competitorsavgpricesold&get=0' + this.getApiKey() + '&hotelid=21&datefrom=' + dateOne + '&dateto=' + dateTwo + '&competitorsid=' + competitorsids)
    },
    getCompetitorPricesApex(selectedValue, dateOne = '2019-01-01', dateTwo = '2021-01-01') {

        return apiClient.get('competitorspricesapex&get=0' + this.getApiKey() + '&userid=' + userid + '&datefrom=' + dateOne + '&dateto=' + dateTwo + '&room=' + selectedValue)
    },
    getCompetitorRoomsPrices(competitorsids) {
        return apiClient.get('competitorsroomspricesold&get=0' + this.getApiKey() + '&hotelid=21&datefrom=2019-04-25&dateto=2020-05-28&competitorsid=' + competitorsids)
    },
    getCompetitors() {
        return '&competitorsid=' + this.$store.getters.competitorsids
    },
    getEvents(city = 'Berlin') {
        return apiClient.get('events&get=0' + this.getApiKey() + '&city=' + city)
    },
    getApiKey() {
        return '&apiKey=KuKMQbgZPv0PRC6GqCMlDQ7fgdamsVY75FrQvHfoIbw4gBaG5UX0wfk6dugKxrtW'
    },
}