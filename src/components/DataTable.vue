<template>
  <div>
    <v-layout row wrap>
    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="rooms"
        :pagination.sync="pagination"
        select-all
        item-key="name"
        expand
        class="elevation-1"
    >
        <template v-slot:headers="props">
        <tr>
            
            <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 
            'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
            >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
            </th>
        </tr>
        </template>
        <template v-slot:items="props">
        <tr :active="props.selected" @click="props.selected = !props.selected">
            
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.currentprice }}</td>
            <td class="text-xs-right">{{ props.item.competitorpriceav }}</td>
            <td class="text-xs-right">{{ props.item.marketvalue }}</td>
            <td class="text-xs-right">{{ props.item.optimalprice }}</td>
            <td class="text-xs-right">{{ props.item.potential }}</td>
        </tr>
        </template>
        <template slot="expand">
        <v-card class="elevation-10">
          <v-card-text>
            <v-data-table :headers="subHeaders"
                          :items="rooms"
                          item-key="color"
                          hide-default-footer
                          class="elevation-10">
              <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.currentprice }}</td>
                <td class="text-xs-right">{{ props.item.competitorpriceav }}</td>
                <td class="text-xs-right">{{ props.item.marketvalue }}</td>
                <td class="text-xs-right">{{ props.item.optimalprice }}</td>
                <td class="text-xs-right">{{ props.item.potential }}</td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </template>
    </v-data-table>
    </v-layout>
  </div>
</template>

<script>

  import apiRequests from '@/services/apiRequests.js'

  export default {
    name: "DataTable",
    data: () => ({
      props:{
        today: '2019-04-24'
      },
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [
        { text: 'Competitor Hotel', align: 'left', value: 'name' },
        { text: 'Current Price', value: 'currentprice' },
        { text: 'Competitors Price Average', value: 'competitorpriceav' },
        { text: 'Market Value', value: 'marketvalue' },
        { text: 'Optimal Price', value: 'optimalprice' },
        { text: 'Potential (%)', value: 'optimalprice' }
      ],
      subHeaders: [
        { text: 'Competitor Hotel', align: 'left', value: 'name' },
        { text: 'Current Price', value: 'currentprice' },
        { text: 'Competitors Price Average', value: 'competitorpriceav' },
        { text: 'Market Value', value: 'marketvalue' },
        { text: 'Optimal Price', value: 'optimalprice' },
        { text: 'Potential (%)', value: 'optimalprice' }
      ],
      rooms: []
    }),
    created() {
      this.getSelectedCompetitorPrices()
    },
    methods: {
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
      constructRooms( competitorNames, currentHotelPrice,
                      competitorPrices,marketValues){
        let roomdata = []
        for (let i=0; i<competitorNames.length; i+=1) {
          var obj = {}
          obj.name = (competitorNames[i]),
          obj.currentprice = (currentHotelPrice).toFixed(2),
          obj.competitorpriceav = (competitorPrices[i]).toFixed(2),
          obj.marketvalue = (competitorPrices[i]+ Math.random()*(15.0-8.5)).toFixed(2),
          obj.optimalprice = (marketValues[i]).toFixed(2),
          obj.potential = (marketValues[i]-currentHotelPrice).toFixed(2)
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
      getSelectedCompetitorPrices(){
        console.log('=>updating selected comptetior prices')

        // iterate through hotel uids of selected competitors
        // and pick their prices
        var competitorsArray = JSON.parse(JSON.stringify(
                                this.$store.getters.competitorsArray))
        var competitorsUids = this.getValuesByKey(competitorsArray,'hotel_id')

        var apiCompetitorsString = ''+competitorsUids.join()+''

        this.$store.dispatch('setCompetitorsUids', apiCompetitorsString.replace(" ", ""))

        // make request for according uids
        console.log(apiCompetitorsString.replace(" ", ""))

        //TODO should be done with the vuex storage...
        apiRequests.getCompetitorAvgPrices(apiCompetitorsString.replace(" ", ""))
            .then(response => {
              console.log(response.data)
              //var dataArray = JSON.parse(JSON.stringify(response.data.data))
              var dataArray = Object.keys(response.data.data).map((key) => {
                          return response.data.data[key]
              })
              console.log('This is the competitors data')
              let competitorsData = dataArray['0'].competitors_data
              console.log(Object.values(competitorsData))
              
              let competitorPrices = []
              let competitorNames = []
              let currentHotelPrice = dataArray['0'].price
              for (let i=0; i<competitorsData.length; i+=1) {
                competitorPrices.push(competitorsData[i].price)
                competitorNames.push(competitorsData[i].hotel_name)
              }
              this.constructRooms(competitorNames, currentHotelPrice,
                            competitorPrices, competitorPrices)
            })
            .catch(error => {
                console.log('There was an error:' + error.response)
            })
      }
    }
  }
</script>