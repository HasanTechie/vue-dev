import axios from 'axios/index'

const apiClient = axios.create({
    baseURL: 'http://35.158.76.194/api/',
    withCredentials: false,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getHotels(city = 'All') {
        return apiClient.get('/hotels&get=50' + this.getApiKey() +
        '&city=' + city)
    },
    getPrices() {
        return apiClient.get('roomsprices&get=40' + this.getApiKey() +
        '&hotelid=21&datefrom=2019-04-25&dateto=2020-05-25')
    },
    getCompetitorAvgPrices(competitorsids) {
        return apiClient.get('competitorsavgprices&get=50' + 
        this.getApiKey() + 
        '&hotelid=21&datefrom=2019-04-25&dateto=2020-05-28'+
        '&competitorsid=' + competitorsids)
    },
    getCompetitorAvgPricesFix(competitorsids='1024,3045,4106') {
        return apiClient.get('competitorsavgprices&get=50' + 
        this.getApiKey() + '&hotelid=21&datefrom=2019-04-25'+
        '&dateto=2020-05-28&competitorsid=' + competitorsids)
    },
    getCompetitorAvgPricesForDates(competitorsids, dateOne, dateTwo) {
        return apiClient.get('competitorsavgprices&get=50' + 
        this.getApiKey() + '&hotelid=21&datefrom=' + dateOne + 
        '&dateto=' + dateTwo + '&competitorsid=' + competitorsids)
    },
    getCompetitorPricesApex(    hotelid, 
                                competitorsids, 
                                selectedValue, 
                                dateOne = '2019-01-01', 
                                dateTwo = '2021-01-01') {
        return apiClient.get('competitorspricesapex&get=50' + 
        this.getApiKey() + '&hotelid=' + hotelid + '&datefrom=' + 
        dateOne + '&dateto=' + dateTwo + '&competitorsid=' + 
        competitorsids + '&room=' + selectedValue)
    },
    getCompetitorRoomsPrices(   competitorsids,
                                hotelid='21') {
        return apiClient.get('competitorsroomsprices&get=50' + 
        this.getApiKey() + '&hotelid='+hotelid+'&datefrom=2019-04-25'+
        '&dateto=2020-05-28&competitorsid=' + competitorsids)
    },
    getCompetitorRoomsPricesFix(competitorsids='1024,3045,4106', 
                                hotelid='21') {
        return apiClient.get('competitorsroomsprices&get=50' + 
        this.getApiKey() + '&hotelid='+hotelid+'&datefrom=2019-04-25'+
        '&dateto=2020-05-28&competitorsid=' + competitorsids)
    },
    getCompetitors() {
        return '&competitorsid=' + this.$store.getters.competitorsids
    },
    getEvents(city = 'Berlin') {
        return apiClient.get('events&get=50' + this.getApiKey() +
        '&city=' + city)
    },
    getApiKey() {
        return '&apiKey=KuKMQbgZPv0PRC6GqCMlDQ7f' +
        'gdamsVY75FrQvHfoIbw4gBaG5UX0wfk6dugKxrtW'
    },
}