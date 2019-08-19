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
                    {text: 'Emona Hotel Price', value: 'p1'},
                    {text: 'Hotel Latinum Price', value: 'p2'},
                    {text: 'Novecento Hotel Price', value: 'p3'},
                ],
                tableData: [
                    {
                        date: '2019-08-01',
                        p1: '151',
                        p2: '132',
                        p3: '321',
                    },
                    {
                        date: '2019-08-02',
                        p1: '133',
                        p2: '122',
                        p3: '431',
                    },
                    {
                        date: '2019-08-03',
                        p1: '161',
                        p2: '152',
                        p3: '631',
                    },
                    {
                        date: '2019-08-04',
                        p1: '153',
                        p2: '112',
                        p3: '312',
                    },
                    {
                        date: '2019-08-05',
                        p1: '132',
                        p2: '122',
                        p3: '311',
                    },
                    {
                        date: '2019-08-06',
                        p1: '151',
                        p2: '132',
                        p3: '321',
                    },
                    {
                        date: '2019-08-07',
                        p1: '176',
                        p2: '122',
                        p3: '431',
                    },
                    {
                        date: '2019-08-08',
                        p1: '161',
                        p2: '152',
                        p3: '631',
                    },
                    {
                        date: '2019-08-09',
                        p1: '195',
                        p2: '112',
                        p3: '312',
                    },
                    {
                        date: '2019-08-10',
                        p1: '125',
                        p2: '122',
                        p3: '311',
                    },
                    {
                        date: '2019-08-11',
                        p1: '151',
                        p2: '132',
                        p3: '321',
                    },
                    {
                        date: '2019-08-12',
                        p1: '111',
                        p2: '122',
                        p3: '431',
                    },
                    {
                        date: '2019-08-13',
                        p1: '161',
                        p2: '152',
                        p3: '631',
                    },
                    {
                        date: '2019-08-14',
                        p1: '111',
                        p2: '112',
                        p3: '312',
                    },
                    {
                        date: '2019-08-15',
                        p1: '123',
                        p2: '122',
                        p3: '311',
                    },
                ],
            }
        },
    }
</script>

<style scoped>

</style>