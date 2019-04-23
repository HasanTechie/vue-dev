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
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
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
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        }
      ]
    }),

    methods: {
      toggleAll () {
        if (this.selected.length) this.selected = []
        else this.selected = this.rooms.slice()
      },
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      }
    }
  }
</script>