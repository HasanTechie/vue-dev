<template>
    <div class="pa-2">
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
        name: "AnalyticsDataTableMonthlyAverage",
        props: {
            myDataTableMonthlyAverage: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                headers: this.myDataTableMonthlyAverage.headers,
                tableData: [
                    {
                        date: 'September 2019',
                        p1: '131.12',
                        p2: '132.34',
                        p3: '121.67',
                    },
                    {
                        date: 'October 2019',
                        p1: '123.21',
                        p2: '112.37',
                        p3: '431.36',
                    },
                    {
                        date: 'November 2019',
                        p1: '131.21',
                        p2: '142.29',
                        p3: '331.82',
                    },
                    {
                        date: 'December 2019',
                        p1: '193.11',
                        p2: '152.96',
                        p3: '194.82',
                    },
                    {
                        date: 'January 2020',
                        p1: '146.54',
                        p2: '132.59',
                        p3: '231.04',
                    },
                    {
                        date: 'February 2020',
                        p1: '163.57',
                        p2: '169.25',
                        p3: '121.46',
                    },
                    {
                        date: 'March 2020',
                        p1: '176.23',
                        p2: '122.67',
                        p3: '431.24',
                    },
                    {
                        date: 'April 2020',
                        p1: '142.66',
                        p2: '175.12',
                        p3: '431.35',
                    },
                    {
                        date: 'May 2020',
                        p1: '142.75',
                        p2: '111.92',
                        p3: '127.82',
                    },
                    {
                        date: 'June 2020',
                        p1: '175.21',
                        p2: '119.72',
                        p3: '121.82',
                    },
                    {
                        date: 'July 2020',
                        p1: '144.56',
                        p2: '167.89',
                        p3: '116.95',
                    },
                    {
                        date: 'August 2020',
                        p1: '151.12',
                        p2: '170.20',
                        p3: '319.22',
                    },
                ],
            }
        },
    }
</script>

<style scoped>

</style>