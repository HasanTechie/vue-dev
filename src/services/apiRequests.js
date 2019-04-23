import axios from 'axios/index'

const apiClient = axios.create({
    baseURL: 'http://3.83.35.127/api/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getHotels() {
        return apiClient.get('/hotels&get=1000' + this.getApiKey())
    },
    getPrices() {
        return apiClient.get('roomsprices&get=40' + this.getApiKey() + '&hoteluid=5caa7537c7f03&datefrom=2019-04-19&dateto=2019-05-05')
    },
    getCompetitorPrices() {
        return apiClient.get('competitorsprices&get=5' + this.getApiKey() + '&hoteluid=5caa7537c7f03&datefrom=2019-04-19&dateto=2019-04-24' + this.getCompetitors())
    },
    getApiKey() {
        return '&apiKey=KuKMQbgZPv0PRC6GqCMlDQ7fgdamsVY75FrQvHfoIbw4gBaG5UX0wfk6dugKxrtW'
    },
    getCompetitors() {
        return '&competitorsuid=[5caa754c3c39a,5caa757d2d47e]'
    }
}