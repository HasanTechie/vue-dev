<template>
  <div>
    <v-flex
            sm12
            lg12
            class="pa-3 feature-pane"
    >
    <v-data-table
      :headers="HotelHeaders"
      :items="hotels"
      :expand="expand"
      item-key="name"
      hide-default-footer
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.name }}</td>
          <template v-if="props.item.currentprice > props.item.marketvalue">
            <td class="text-xs-left" bgcolor="green">{{ props.item.currentprice }}</td>
            <td class="text-xs-left" bgcolor="green">{{ props.item.marketvalue }}</td>
          </template>
          <template v-else>
            <td class="text-xs-left" bgcolor="red">{{ props.item.currentprice }}</td>
            <td class="text-xs-left" bgcolor="red">{{ props.item.marketvalue }}</td>
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
    </v-flex>
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
        { text: 'Hotel Name', align: 'left', value: 'name' },
        { text: 'Average Current Price', value: 'currentprice' },
        { text: 'LUNA Value', value: 'marketvalue' },

      ],
      RoomHeaders: [
        { text: 'Room Type', align: 'left', value: 'name' },
        { text: 'Current Price', value: 'competitorpriceav' },
        { text: 'LUNA Value', value: 'marketvalue' },
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
      this.roomtype = this.$store.getters.roomtype
      //this.getCompetitorAvPrices()
      // since only the old api is available we use the room data with
      // the room data competitorApiCall to get the data of the user
      // and also calculate average values from it. that way we can
      // also compute averages not only for the whole competitor or
      // user prices but also for the selected ones
      this.getPriceData()
      //this.getCompetitorRoomPrices()
    },
    mounted() {
      this.$store.watch(
        (state, getters) => getters.today,
        (newValue, oldValue) => {
          console.log(`Updating from ${oldValue} to ${newValue}`)
          this.today = newValue
          return newValue
        }
      ),
      this.$store.watch(
        (state, getters) => getters.roomtype,
        (newValue, oldValue) => {
          console.log(`Updating from ${oldValue} to ${newValue}`)
          this.roomtype = newValue
          this.getPriceData()
          return newValue
        }
      )
    },
    watch: {
      today(newToday){
        console.log('today changed to:' + newToday)
        //this.getCompetitorAvPrices()
        this.getPriceData()
        //this.getCompetitorRoomPrices()
      },
      roomtype(newRoomType){
        console.log('today changed to:' + newRoomType)
        //this.getCompetitorAvPrices()

        
        //this.getCompetitorRoomPrices()
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
      constructHotelAvs( Names, currentHotelPrice, Prices){
        console.log('constructHotelAvs entered')
        console.log(Names)

        let hoteldata = []
        for (let i=0; i<Names.length; i+=1) {
          var obj = {}
          obj.name = (Names[i]),
          obj.currentprice = (currentHotelPrice).toFixed(2),
          obj.marketvalue = (Prices[i]+ Math.random()*(15.0-8.5)).toFixed(2)

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
      getValuesByKey(array, key) 
      {
        let values = [];
        for (let i=0; i<array.length; i+=1) {
          values.push(array[''+i+''][key]);
        }
        return values;
      },
      getValuesOfKeyAtKeyWithValue(array, getKey, atKey, atKeyValue) 
      {
        let values = [];
        for (let i=0; i<array.length; i+=1) {
        //console.log(array[i][atKey])
        if (array[i][atKey] === atKeyValue){
          values.push(array[i][getKey]);
          }
        }
        return values;
      },
      getCompetitorsIDs() 
      {
        var competitorsArray = JSON.parse(JSON.stringify(
            this.$store.getters.competitorsArray))

        for (let i = 0; i < competitorsArray.length; i += 1) {
            this.competitors.push(competitorsArray['' + i + '']['hotel_id']);
        }
      },
      getHotelDataWithDates(dateOne, dateTwo) 
      {
        apiRequests.getCompetitorPricesApex(this.hotelid, this.competitors, this.selectedValue, dateOne, dateTwo)
        .then(response => {
            this.myData = response.data.data
            this.trigger = true
        })
      },
      getCompetitorAvPrices(){
        //console.log('=>updating selected comptetior average prices')
        var competitorsArray = JSON.parse(JSON.stringify(
                                this.$store.getters.competitorsArray))
        var competitorsUids = this.getValuesByKey(competitorsArray,'hotel_id')
        var apiCompetitorsString = '' + competitorsUids.join() + ''
    
        this.$store.dispatch('setCompetitorsUids', 
                              apiCompetitorsString.replace(" ", ""))

        //console.log("this.today :" + this.today)
        //apiRequests.getCompetitorAvgPrices(apiCompetitorsString.replace(" ", ""))
        apiRequests.getCompetitorAvgPricesForDates( apiCompetitorsString.replace(" ", ""),
                                                    this.today,
                                                    this.today)
        .then(response => {
          //console.log(response.data)
          //var dataArray = JSON.parse(JSON.stringify(response.data.data))
          var avpriceDataArray = Object.keys(response.data.data).map((key) => {
                        return response.data.data[key]
          })
          //console.log('Average Prices for date : ' + this.today)
          // save the downloaded data
          this.$store.dispatch('setavpriceDataArray', avpriceDataArray)
          //console.log('This is the competitors av price data from server')
          let competitorsData = avpriceDataArray['0'].competitors_data
          //console.log(Object.values(competitorsData))
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
      translate2CompetitorData(responseData)
      {
        var competitorData = []
        for (let i=1; i<responseData[0].data.length; i+=1) {
          competitorData.push(responseData[0].data[i].price)
          competitorData.push(responseData[0].data[i].hotel_name)
          competitorData.push(responseData[0].data[i].room)
        }
        return competitorData
      },
      getPriceData()
      {
        console.log('=>updating selected comptetior room prices')
        var userid = JSON.parse(localStorage.getItem('user')).user.id
        //console.log('user ID is: ' + userid)

        apiRequests
        .getPricesNew(userid, this.today)
        .then(response => {
          var responseData = Object.keys(response.data.data).map((key) => {
                        return response.data.data[key]
          })
                  

          // user hotel data is saved in the first entry 
          // get the users hotelroom prices 

          var usersCompetitorData = responseData[0].data
          var allroomdata = []
          var avOfAllRoomData = []
          //console.log('usersCompetitorData')
          //console.log(usersCompetitorData)

          for (let i=0; i<usersCompetitorData.length; i+=1) {
            var allRoomObj = {}
            var avOfAllRoomObj = {}
            if (allRoomObj.room == this.roomtype || this.roomtype == 'All')
            {
              
              avOfAllRoomObj.name = (usersCompetitorData[i][0].hotel_name),
              avOfAllRoomObj.currentprice = parseFloat((0.0).toFixed(2)),
              avOfAllRoomObj.marketvalue = parseFloat((0.0 )
                                            .toFixed(2))
              var iDataLength = usersCompetitorData[i].length
              for (let j=0; j<iDataLength; j+=1) {
                // filter for selected roomtype
                
                // seperate rooms
                allRoomObj.name = usersCompetitorData[i][j].hotel_name
                allRoomObj.room = usersCompetitorData[i][j].room
                allRoomObj.currentprice = (usersCompetitorData[i][j]
                                      .price).toFixed(2)
                allRoomObj.marketvalue = (usersCompetitorData[i][j]
                                      .price ).toFixed(2)

                avOfAllRoomObj.currentprice += parseFloat(allRoomObj.currentprice)
                avOfAllRoomObj.marketvalue += parseFloat(allRoomObj.marketvalue)
                

                allroomdata.push({name:allRoomObj.name, 
                                  room:allRoomObj.room,
                                  currentprice:allRoomObj.currentprice,
                                  marketvalue:allRoomObj.marketvalue})
              }
              avOfAllRoomObj.currentprice = (avOfAllRoomObj.currentprice/
                                            iDataLength.toFixed(2)).toFixed(2)
              avOfAllRoomObj.marketvalue = (avOfAllRoomObj.marketvalue/
                                            iDataLength.toFixed(2)).toFixed(2)
              avOfAllRoomData.push(avOfAllRoomObj)
            }
          }
          //console.log('allroomdata')
          //console.log(allroomdata)
          console.log('avOfAllRoomData')
          console.log(avOfAllRoomData)
          this.hotels = avOfAllRoomData
          this.rooms = allroomdata
          
        })
        .catch(error => {
          console.log('There was an error:' + error.response)
        })
       
      },
    }
  }
</script>
<style >
  .feature-pane {
      position: relative;
      padding-top: 0px;
      box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
      border-radius:20px;
  }
  .theme--light.v-table {
    background-color: #fafafa;
    color: rgba(0,0,0,0.87);
  }
  table.v-table tbody td,
  table.v-table tbody th {
    height: 29px;
  }
  .v-card__text {
      padding: 3px;
      width: 100%;
  }
</style>
