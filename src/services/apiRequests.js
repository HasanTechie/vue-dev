import axios from 'axios/index'

const apiClient = axios.create({
    baseURL: 'http://solidps.test/api/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getHotels() {
        console.log(apiClient.get('/hotels' + this.getApiKey()))
        return apiClient.get('/hotels' + this.getApiKey())
    },
    getPrices() {
        return apiClient.get('roomsprices' + this.getApiKey() + '&hoteluid=5caa7537c7f03&datefrom=2019-03-03&dateto=2019-05-05')
    },
    getApiKey() {
        return '&get=10&apiKey=KuKMQbgZPv0PRC6GqCMlDQ7fgdamsVY75FrQvHfoIbw4gBaG5UX0wfk6dugKxrtW'
    }
}