import axios from 'axios/index'

const apiClient = axios.create({
    baseURL: 'http://3.121.228.14/api/',
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
        return apiClient.get('roomsprices&get=40' + this.getApiKey() + '&hotelid=28&datefrom=2019-04-25&dateto=2019-05-25')
    },
    getCompetitorAvgPrices(competitorsids) {
        return apiClient.get('competitorsavgprices&get=0' + this.getApiKey() + '&hotelid=21&datefrom=2019-04-25&dateto=2019-12-28&competitorsid=' + competitorsids)
    },
    getCompetitorRoomsPrices(competitorsids) {
        return apiClient.get('competitorsroomsprices&get=0' + this.getApiKey() + '&hotelid=28&datefrom=2019-04-25&dateto=2019-12-28&competitorsid=' + competitorsids)
    },
    getApiKey() {
        return '&apiKey=KuKMQbgZPv0PRC6GqCMlDQ7fgdamsVY75FrQvHfoIbw4gBaG5UX0wfk6dugKxrtW'
    },
    getCompetitors() {
        return '&competitorsid=' + this.$store.getters.competitorsids
    }
}