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
        return apiClient.get('/hotels&get=0' + this.getApiKey() + 
        '&city=' + city)
    },
    getPrices() {
        return apiClient.get('roomsprices&get=40' + this.getApiKey() + 
        '&hotelid=21&datefrom=2019-04-25&dateto=2020-05-25')
    },
    getCompetitorAvgPrices(competitorsids) {
        return apiClient.get('competitorsavgprices&get=0' + 
        this.getApiKey() + '&hotelid=21'+
        '&datefrom=2019-04-25&dateto=2019-06-28'+
        '&competitorsid=' + competitorsids)
    },
    getCompetitorAvgPricesForDates(competitorsids, 
                                   dateOne, 
                                   dateTwo) {
        return apiClient.get('competitorsavgprices&get=0' + 
        this.getApiKey() + '&hotelid=21&datefrom=' + 
        dateOne + '&dateto=' + dateTwo + '&competitorsid=' +
        competitorsids)
    },
    getCompetitorPricesApex(selectedValue, 
                            dateOne = '2019-01-01', 
                            dateTwo = '2021-01-01') 
    {
        var userid = JSON.parse(localStorage.getItem('user')).user.id;
        return apiClient.get('competitorspricesapex&get=0' + 
        this.getApiKey() + '&userid=' + userid + '&datefrom='
         + dateOne + '&dateto=' + dateTwo + '&room=' + selectedValue)
    },
    getCompetitorRoomsPrices(competitorsids)
    {
        return apiClient.get('competitorsroomsprices&get=0' + 
        this.getApiKey() + '&hotelid=21&datefrom=2019-04-25' +
        '&dateto=2020-04-27&competitorsid=' + competitorsids)
    },
    getCompetitorRoomsPricesForDates(   competitorsids, 
                                        dateFrom, 
                                        dateTo){
    return apiClient.get('competitorsroomsprices&get=0' + 
    this.getApiKey() + '&hotelid=21&datefrom=' + dateFrom +
    '&dateto=' + dateTo + '&competitorsid=' + competitorsids)
    },
    getCompetitors() {
        return '&competitorsid=' + this.$store.getters.competitorsids
    },
    getEvents(city = 'Berlin') {
        return apiClient.get('events&get=0' + this.getApiKey() + 
        '&city=' + city)
    },
    getApiKey() {
        return '&apiKey=KuKMQbgZPv0PRC6GqCMlDQ7f' + 
        'gdamsVY75FrQvHfoIbw4gBaG5UX0wfk6dugKxrtW'
    },
}