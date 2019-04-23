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
        return apiClient.get('/hotels&get=0' + this.getApiKey())
    },
    getPrices() {
        return apiClient.get('roomsprices&get=0' + this.getApiKey() + '&hoteluid=5caa7537c7f03&datefrom=2019-03-03&dateto=2019-05-05')
    },
    getApiKey() {
        return '&apiKey=KuKMQbgZPv0PRC6GqCMlDQ7fgdamsVY75FrQvHfoIbw4gBaG5UX0wfk6dugKxrtW'
    }
}