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
// oldercolored
    getHotels(city = 'All') {
        return apiClient.get('/hotels&get=50' + this.getApiKey() +
        '&city=' + city)
    },


// master
    getPrices() {
        return apiClient.get('roomsprices&get=40' + this.getApiKey() +
        '&hotelid=21&datefrom=2019-04-25&dateto=2020-05-25')
    },
    getPricesNew(userid, date) {
        return apiClient.get('allroomsprices&get=0' + this.getApiKey() +
        '&userid='+userid+'&datefrom='+date+'&dateto='+date)
    },
    getMyPrices(hotelid, date) {
        var call = 'roomsprices&get=40' + this.getApiKey() +
        '&hotelid='+hotelid+'&datefrom='+date+'&dateto='+date
        console.log(call)
        return apiClient.get(call)
    },
    getCompetitorAvgPrices(competitorsids) {
// oldercolored
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
    getMyCompetitorRoomsPricesOld( competitorsids,
                                date,hotelid)
    {
        return apiClient.get('competitorsroomspricesold&get=50' +
            this.getApiKey() + '&hotelid='+hotelid + '&datefrom=' + date +
                        '&dateto=' + date+ '&competitorsid=' + competitorsids)
    },
    getMyCompetitorRoomsPricesNew(room = 'All', date) {
        return apiClient.get('competitorsroomsprices&get=0' + this.getApiKey()
        + '&userid=' + userid + '&datefrom=' + date + '&dateto=' +
        date + '&room=' + room)
    },
    getCompetitorRoomsPricesFix(competitorsids='1024,3045,4106',
                                hotelid='21') {
        return apiClient.get('competitorsroomsprices&get=50' +
        this.getApiKey() + '&hotelid='+hotelid+'&datefrom=2019-04-25'+
        '&dateto=2020-05-28&competitorsid=' + competitorsids)
    },
    getCompetitorRoomsAvgPricesNew(room = 'All', dateOne, dateTwo) {
        return apiClient.get('competitorsavgprices&get=0' + this.getApiKey() + '&userid=' + userid + '&datefrom=' + dateOne + '&dateto=' + dateTwo + '&room=' + room)

        //return apiClient.get('competitorsavgpricesold&get=0' + this.getApiKey() + '&hotelid=21&datefrom=2019-05-05&dateto=2020-05-05&competitorsid=' + competitorsids)
    },
    getCompetitorAvgPricesForDates(competitorsids, dateOne, dateTwo) {
        return apiClient.get('competitorsavgpricesold&get=0' + this.getApiKey() + '&hotelid=21&datefrom=' + dateOne + '&dateto=' + dateTwo + '&competitorsid=' + competitorsids)
    },

    getCompetitorRoomsPricesOld(competitorsids) {
        return apiClient.get('competitorsroomspricesold&get=0' + this.getApiKey() + '&hotelid=21&datefrom=2019-04-25&dateto=2020-05-28&competitorsid=' + competitorsids)
// master
    },
    getCompetitors() {
        return '&competitorsid=' + this.$store.getters.competitorsids
    },
    getEvents(city = 'Berlin') {
        return apiClient.get('events&get=0' + this.getApiKey() +
        '&city=' + city)
    },
// oldercolored
    getApiKey() {
        return '&apiKey=KuKMQbgZPv0PRC6GqCMlDQ7f' +
        'gdamsVY75FrQvHfoIbw4gBaG5UX0wfk6dugKxrtW'

    getHotels(city = 'All') {
        return apiClient.get('/hotels&get=0' + this.getApiKey() + '&city=' + city)
    },
    getCompetitorPricesApex(room = 'All', dateOne = '2019-01-01', dateTwo = '2021-01-01') {

        return apiClient.get('competitorspricesapex&get=0' + this.getApiKey() + '&userid=' + userid + '&datefrom=' + dateOne + '&dateto=' + dateTwo + '&room=' + room)
    },

    getCompetitorRoomsAvgPrices(room = 'All', dateOne = '2019-01-01', dateTwo = '2021-01-01') {
        return apiClient.get('competitorsavgprices&get=0' + this.getApiKey() + '&userid=' + userid + '&datefrom=' + dateOne + '&dateto=' + dateTwo + '&room=' + room)
    },

    getCompetitorRoomsPrices(room = 'All', dateOne = '2019-01-01', dateTwo = '2021-01-01') {
        return apiClient.get('competitorsroomsprices&get=0' + this.getApiKey() + '&userid=' + userid + '&datefrom=' + dateOne + '&dateto=' + dateTwo + '&room=' + room)
// master
    },
}