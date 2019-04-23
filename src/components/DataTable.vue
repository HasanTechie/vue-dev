<template>
  <div>
    <v-layout row>
    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="rooms"
        :pagination.sync="pagination"
        select-all
        item-key="name"
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
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>
        </tr>
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
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [
        {
          text: 'Room',
          align: 'left',
          value: 'name'
        },
        { text: 'Current Price', value: 'currentprice' },
        { text: 'Competitors Price Average', value: 'competitorpriceav' },
        { text: 'Market Value', value: 'marketvalue' },
        { text: 'Optimal Price', value: 'optimalprice' },
        { text: 'Potential (%)', value: 'potential' }
      ],
      rooms: [
        {
          name: 'Frozen Yogurt',
          currentprice: 159,
          competitorpriceav: 6.0,
          marketvalue: 24,
          optimalprice: 4.0,
          potential: '1%'
        },
        {
          name: 'Ice cream sandwich',
          currentprice: 159,
          competitorpriceav: 6.0,
          marketvalue: 24,
          optimalprice: 4.0,
          potential: '1%'
        }
      ]
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
      getSelectedCompetitorPrices(){
        console.log('=>updating selected comptetior prices')

        // iterate through hotel uids of selected competitors
        // and pick their prices
        var competitorsArray = JSON.parse(JSON.stringify(
                                this.$store.getters.competitorsArray))
        var competitorsUids = this.getValuesByKey(competitorsArray,'uid')

        var apiCompetitorsString = '['+competitorsUids.join()+']'

        this.$store.dispatch('setCompetitorsUids', apiCompetitorsString.replace(" ", ""))

        // make request for according uids
        console.log(apiCompetitorsString.replace(" ", ""))

        //TODO should be done with the vuex storage...
        apiRequests.getCompetitorPrices(apiCompetitorsString.replace(" ", ""))
            .then(response => {
                //var dataArray = JSON.parse(JSON.stringify(response.data.data))
                var dataArray = Object.keys(response.data.data).map((key) => {
                            return response.data.data[key]
                })
                var datas = Object.entries(dataArray)
                datas = datas[1]['hotel_name']
                console.log(datas)
                //var competitorPrices = getValuesByKey(dataArray, 'competitors_data')
                console.log('in datatable...')
                //console.log(competitorPrices)
            })
            .catch(error => {
                console.log('There was an error:' + error.response)
            })
        
        
      },
      getValuesByKey(array, key) {
        let values = [];
        for (let i=0; i<array.length; i+=1) {
          values.push(array[i][key]);
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
      }
    }
  }
</script>