import axios from 'axios'

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
        console.log(apiClient.get('/hotels' + this.getApiKey()) )
        return apiClient.get('/hotels' + this.getApiKey())
    },
    getApiKey() {
        return '&get=50&apiKey=KuKMQbgZPv0PRC6GqCMlDQ7fgdamsVY75FrQvHfoIbw4gBaG5UX0wfk6dugKxrtW'
    }
}