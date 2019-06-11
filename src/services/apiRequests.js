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
    var userid = JSON.parse(localStorage.getItem('user')).user.id;
}

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
        return apiClient.get('competitorsavgpricesold&get=0' + 
        this.getApiKey() + '&hotelid=21&datefrom=' + dateOne + 
        '&dateto=' + dateTwo + '&competitorsid=' + competitorsids)
    },
    getCompetitorPricesApex(selectedValue, 
                            dateOne = '2019-01-01', 
                            dateTwo = '2021-01-01') 
    {
        var userid = JSON.parse(localStorage.getItem('user')).user.id;
        return apiClient.get('competitorspricesapex&get=0' + 
        this.getApiKey() + '&userid=' + userid + '&datefrom=' + 
        dateOne + '&dateto=' + dateTwo + '&room=' + selectedValue)
    },
    getCompetitorRoomsPrices(   competitorsids,
                                hotelid='21') 
    {
        return apiClient.get('competitorsroomspricesold&get=50' + 
            this.getApiKey() + '&hotelid='+hotelid+'&datefrom=2019-04-25'+
            '&dateto=2020-05-28&competitorsid=' + competitorsids)
    },
    getMyCompetitorRoomsPrices( competitorsids,
                                dateFrom,
                                dateTo,
                                hotelid='21') 
    {
        return apiClient.get('competitorsroomspricesold&get=50' + 
            this.getApiKey() + '&hotelid=' + hotelid + '&datefrom=' + dateFrom +
                        '&dateto=' + dateTo + '&competitorsid=' + competitorsids)
    },
    getCompetitorRoomsPricesFix(competitorsids='1024,3045,4106', 
                                hotelid='21') {
        return apiClient.get('competitorsroomsprices&get=50' + 
        this.getApiKey() + '&hotelid='+hotelid+'&datefrom=2019-04-25'+
        '&dateto=2020-05-28&competitorsid=' + competitorsids)
    },
    getCompetitorRoomsAvgPricesNew(room = 'All', dateOne, dateTwo) {
        return apiClient.get('competitorsavgprices&get=0' + this.getApiKey() + '&userid=' + userid + '&datefrom=' + dateOne + '&dateto=' + dateTwo + '&room=' + room)
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