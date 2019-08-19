<template>
    <div class="pa-2">
        <h1 class="pa-2 display-2 mb-3 font-weight-light">Data Table <small>(under testing)</small></h1>
        <v-data-table
                :headers="headers"
                :items="tableData"
                :sort-desc="[false, true]"
                multi-sort
                class="elevation-1"
        ></v-data-table>
    </div>
</template>

<script>
    export default {
        name: "AnalyticsDataTable",
        data() {
            return {
                headers: [
                    {
                        text: 'Dates',
                        align: 'left',
                        sortable: false,
                        value: 'date',
                    },
                    {text: 'Emona Hotel Test', value: 'price1'},
                    {text: 'Hotel Latinum Test', value: 'price2'},
                    {text: 'Novecento Hotel Test', value: 'price3'},
                ],
                tableData: [
                    {
                        date: '2019-08-01',
                        price1: '151',
                        price2: '132',
                        price3: '321',
                    },
                    {
                        date: '2019-08-02',
                        price1: '111',
                        price2: '122',
                        price3: '431',
                    },
                    {
                        date: '2019-08-03',
                        price1: '161',
                        price2: '152',
                        price3: '631',
                    },
                    {
                        date: '2019-08-04',
                        price1: '111',
                        price2: '112',
                        price3: '312',
                    },
                    {
                        date: '2019-08-05',
                        price1: '111',
                        price2: '122',
                        price3: '311',
                    },
                    {
                        date: '2019-08-06',
                        price1: '151',
                        price2: '132',
                        price3: '321',
                    },
                    {
                        date: '2019-08-07',
                        price1: '111',
                        price2: '122',
                        price3: '431',
                    },
                    {
                        date: '2019-08-08',
                        price1: '161',
                        price2: '152',
                        price3: '631',
                    },
                    {
                        date: '2019-08-09',
                        price1: '111',
                        price2: '112',
                        price3: '312',
                    },
                    {
                        date: '2019-08-10',
                        price1: '111',
                        price2: '122',
                        price3: '311',
                    },
                    {
                        date: '2019-08-11',
                        price1: '151',
                        price2: '132',
                        price3: '321',
                    },
                    {
                        date: '2019-08-12',
                        price1: '111',
                        price2: '122',
                        price3: '431',
                    },
                    {
                        date: '2019-08-13',
                        price1: '161',
                        price2: '152',
                        price3: '631',
                    },
                    {
                        date: '2019-08-14',
                        price1: '111',
                        price2: '112',
                        price3: '312',
                    },
                    {
                        date: '2019-08-15',
                        price1: '111',
                        price2: '122',
                        price3: '311',
                    },
                ],
            }
        },
    }
</script>

<style scoped>

</style>