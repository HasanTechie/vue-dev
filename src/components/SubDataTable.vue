<template>
  <v-data-table 
  dark
  :headers="myheaders"
  :items="myitems"
  :search="mysearch"
  hide-default-footer
>
  <template v-slot:item.marketvalue="{ item }">
      <v-chip color="green" text-color="white">{{ item.marketvalue }}</v-chip>
    </template>
    <template v-slot:item.currentprice="{ item }">
      <v-chip color="primary" text-color="white">{{ item.currentprice }}</v-chip>
    </template>
  </v-data-table>

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