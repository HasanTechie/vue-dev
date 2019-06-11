<template>
  <div>
    <v-toolbar flat color="white">
    </v-toolbar>
    <v-data-table
      :headers="HotelHeaders"
      :items="hotels"
      :expand="expand"
      item-key="name"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.name }}</td>
          <template v-if="props.item.currentprice > props.item.marketvalue">
            <td class="text-xs-right" bgcolor="green">{{ props.item.currentprice }}</td>
            <td class="text-xs-right" bgcolor="green">{{ props.item.marketvalue }}</td>
          </template>
          <template v-else>
            <td class="text-xs-right" bgcolor="red">{{ props.item.currentprice }}</td>
            <td class="text-xs-right" bgcolor="red">{{ props.item.marketvalue }}</td>
          </template>
        </tr>
      </template>
      <template v-slot:expand="props">

      <SubDataTable v-bind:myheaders="RoomHeaders"
                    v-bind:myitems="rooms"
                    v-bind:mysearch="props.item.name"
      ></SubDataTable> 
      </template>
    </v-data-table>
  </div>
</template>
<script>

  import apiRequests from '@/services/apiRequests.js'
  import SubDataTable from '@/components/SubDataTable.vue'
  import { mapState } from 'vuex';

  export default {
    name: "RoomDataTable",
    computed: mapState(['today']),
    components: {
      SubDataTable
    },
    data: () => ({
      expand: true,
      roomsdatadownloaded: false,
      avpricedatadownloaded: false,
      props:{
        //today: ''
      },
      today: '',
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      hotels: [],
      rooms: [],
      HotelHeaders: [
        { text: 'Competitor Hotel', align: 'left', value: 'name' },
        { text: 'Average Current Price', value: 'currentprice' },
        { text: 'Average Market Value', value: 'marketvalue' },

      ],
      RoomHeaders: [
        { text: 'Room Type', align: 'left', value: 'name' },
        { text: 'Competitors Price', value: 'competitorpriceav' },
        { text: 'Market Value', value: 'marketvalue' },
      ],
      competitors: [JSON.parse(localStorage.getItem('user')).user.hotel_id],
      hotelid: JSON.parse(localStorage.getItem('user')).user.hotel_id,
      hotelsearches: [
                      { hotelsearch: "Mercure Hotel Berlin City "},
                      { hotelsearch: "Vienna House Easy Berlin "}
      ],
    }),
    created() {
      this.today = this.$store.getters.today
      this.getCompetitorsIDs()
      this.getCompetitorAvPrices()
      this.getCompetitorRoomPrices()
    },
    mounted() {
      this.$store.watch(
        (state, getters) => getters.today,
        (newValue, oldValue) => {
          console.log(`Updating from ${oldValue} to ${newValue}`)
          this.today = newValue
          return newValue
        }
      )
    },
    watch: {
      today(newToday){
        console.log('today changed to:' + newToday)
        this.getCompetitorAvPrices()
        this.getCompetitorRoomPrices()
      }
    },
    
    methods: {
      // assuming v-if call methods from here
      potential(){

      },

      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      getTodayDate(){
        const toTwoDigits = num => num < 10 ? '0' + num : num
        let today = new Date()
        let year = today.getFullYear()
        let month = toTwoDigits(today.getMonth() + 1)
        let day = toTwoDigits(today.getDate())
        return `${year}-${month}-${day}`
      },
      constructHotelAvs( competitorNames, currentHotelPrice,
                      competitorPrices){
        let hoteldata = []
        for (let i=0; i<competitorNames.length; i+=1) {
          var obj = {}
          obj.name = (competitorNames[i]),
          obj.currentprice = (currentHotelPrice).toFixed(2),
          obj.marketvalue = (competitorPrices[i]+ Math.random()*(15.0-8.5)).toFixed(2)

          if (obj.currentprice < obj.marketvalue) {
            //obj.color = 'red'
          }else{
            //obj.color = 'blue'
          }
          
          hoteldata.push(obj)
        }
        this.hotels = hoteldata
      },
      constructRooms(competitorNames, competitorRoomNames, currentHotelPrice,
                      competitorPrices){
        let roomdata = []
        for (let i=0; i<competitorNames.length; i+=1) {
          var obj = {}
          obj.name = (competitorNames[i]),
          obj.room = (competitorRoomNames[i]),
          obj.currentprice = (currentHotelPrice).toFixed(2),
          obj.marketvalue = (competitorPrices[i]+ Math.random()*
          (15.0-8.5)).toFixed(2)
          
          roomdata.push(obj)
        }
        this.rooms = roomdata
      },
      getValuesByKey(array, key) {
        let values = [];
        for (let i=0; i<array.length; i+=1) {
          values.push(array[''+i+''][key]);
        }
        return values;
      },
      getValuesOfKeyAtKeyWithValue(array, getKey, atKey, atKeyValue) {
        let values = [];
        for (let i=0; i<array.length; i+=1) {
        console.log(array[i][atKey])
        if (array[i][atKey] === atKeyValue){
          values.push(array[i][getKey]);
          }
        }
        return values;
      },
      getCompetitorsIDs() {
        var competitorsArray = JSON.parse(JSON.stringify(
            this.$store.getters.competitorsArray))

        for (let i = 0; i < competitorsArray.length; i += 1) {
            this.competitors.push(competitorsArray['' + i + '']['hotel_id']);
        }
      },
      getHotelDataWithDates(dateOne, dateTwo) {
        apiRequests.getCompetitorPricesApex(this.hotelid, this.competitors, this.selectedValue, dateOne, dateTwo)
        .then(response => {
            this.myData = response.data.data
            this.trigger = true
        })
      },
      getCompetitorAvPrices(){
        console.log('=>updating selected comptetior average prices')
        var competitorsArray = JSON.parse(JSON.stringify(
                                this.$store.getters.competitorsArray))
        var competitorsUids = this.getValuesByKey(competitorsArray,'hotel_id')
        var apiCompetitorsString = '' + competitorsUids.join() + ''
    
        this.$store.dispatch('setCompetitorsUids', 
                              apiCompetitorsString.replace(" ", ""))

        console.log("this.today :" + this.today)
        //apiRequests.getCompetitorAvgPrices(apiCompetitorsString.replace(" ", ""))
        apiRequests.getCompetitorAvgPricesForDates( apiCompetitorsString.replace(" ", ""),
                                                    this.today,
                                                    this.today)
        .then(response => {
          console.log(response.data)
          //var dataArray = JSON.parse(JSON.stringify(response.data.data))
          var avpriceDataArray = Object.keys(response.data.data).map((key) => {
                        return response.data.data[key]
          })
          console.log('Average Prices for date : ' + this.today)
          // save the downloaded data
          this.$store.dispatch('setavpriceDataArray', avpriceDataArray)
          console.log('This is the competitors av price data from server')
          let competitorsData = avpriceDataArray['0'].competitors_data
          console.log(Object.values(competitorsData))
          let competitorPrices = []
          let competitorNames = []
          let currentHotelPrice = avpriceDataArray['0'].price
          for (let i=0; i<competitorsData.length; i+=1) {
            competitorPrices.push(competitorsData[i].price)
            competitorNames.push(competitorsData[i].hotel_name)
          }
          this.constructHotelAvs(competitorNames, currentHotelPrice,
                        competitorPrices, competitorPrices)
          this.avpricedatadownloaded = true
        })
        .catch(error => {
            console.log('There was an error:' + error.response)
        })
        
      },
      getCompetitorRoomPrices()
      {
        console.log('=>updating selected comptetior room prices')

        // FROM STORE
        var competitorsArray = JSON.parse(JSON.stringify(
                                this.$store.getters.competitorsArray))
        var competitorsUids = this.getValuesByKey(competitorsArray,'hotel_id')
        var apiCompetitorsString = ''+competitorsUids.join()+''
        
        apiRequests
        .getMyCompetitorRoomsPrices(  apiCompetitorsString.replace(" ", ""),
                                            this.today,
                                            this.today)
        //.getCompetitorRoomsPrices(apiCompetitorsString.replace(" ", ""))
        .then(response => {
          console.log(response.data)
          var roomDataArray = Object.keys(response.data.data).map((key) => {
                        return response.data.data[key]
          })
          console.log('Room Prices for date : ' + this.today)

          // save the downloaded data
          this.$store.dispatch('setRoomDataArray', roomDataArray)
          console.log('This is the competitors data from server')
          let competitorsData = roomDataArray['0'].competitors_data
          console.log(Object.values(competitorsData))
          let competitorPrices = []
          let competitorNames = []
          let competitorRoomNames = []
          let currentHotelPrice = roomDataArray['0'].price
          for (let i=0; i<competitorsData.length; i+=1) {
            competitorPrices.push(competitorsData[i].price)
            competitorNames.push(competitorsData[i].hotel_name)
            competitorRoomNames.push(competitorsData[i].room)
          }
          this.constructRooms(competitorNames, competitorRoomNames, 
                        currentHotelPrice, competitorPrices, competitorPrices)
          this.roomsdownloaded = true
        })
        .catch(error => {
          console.log('There was an error:' + error.response)
        })
        }
      }
  }
</script>
