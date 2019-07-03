<template>
  <div id="roomtable">
    <v-card class="elevation-10">
      <v-card-text>
        <v-data-table :headers="myheaders"
                      :items="myitems"
                      :search="mysearch"
                      item-key="color"
                      hide-actions
                      class="elevation-10">
          <template v-slot:items="props">
            <td>{{ props.item.room }}</td>
            <td class="text-xs-left">{{ props.item.currentprice }}</td>
            <td class="text-xs-left">{{ props.item.marketvalue }}</td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
  export default {
    name: 'SubDataTable',
    props: [ 'myheaders', 'myitems', 'mysearch'],
    data: () => {
      return {
        search: '',
      }
    }
  }
</script>