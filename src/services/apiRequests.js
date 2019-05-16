import axios from 'axios/index'

const apiClient = axios.create({
    baseURL: 'http://35.158.76.194/api/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getHotels() {
        return apiClient.get('/hotels&get=1000' + this.getApiKey() + '&city=Rome')
    },
    getPrices() {
        return apiClient.get('roomsprices&get=40' + this.getApiKey() + '&hotelid=28&datefrom=2019-04-25&dateto=2019-12-25')
    },
    getCompetitorAvgPrices(competitorsids) {
        return apiClient.get('competitorsavgprices&get=0' + this.getApiKey() + '&hotelid=21&datefrom=2019-05-05&dateto=2020-05-05&competitorsid=' + competitorsids)
    },
    getCompetitorAvgPricesForDates(competitorsids, dateOne, dateTwo) {
        return apiClient.get('competitorsavgprices&get=0' + this.getApiKey() + '&hotelid=21&datefrom=' + dateOne + '&dateto=' + dateTwo + '&competitorsid=' + competitorsids)
    },
    getCompetitorAvgPricesApex(competitorsids, dateOne = '2019-01-01', dateTwo = '2021-01-01') {
        return apiClient.get('competitorsavgpricesapex&get=0' + this.getApiKey() + '&hotelid=21&datefrom=' + dateOne + '&dateto=' + dateTwo + '&competitorsid=[' + competitorsids + ']')
    },
    getCompetitorRoomsPrices(competitorsids) {
        return apiClient.get('competitorsroomsprices&get=0' + this.getApiKey() + '&hotelid=28&datefrom=2019-04-25&dateto=2019-12-28&competitorsid=' + competitorsids)
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