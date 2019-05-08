<template>
    <div>
        <v-container class="my-4">
            <h1 class="display-2 mb-3 font-weight-light">Analytics</h1>
            <apexcharts width="1800" height="600" type="line" :options="chartOptions" :series="series"></apexcharts>
            <div>
                <v-btn color="success" @click="updateChart">Update Chart</v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'

    export default {
        name: 'Chart.vue',
        props: {
            myData: {
                type: Object,
                required: true
            }
        },
        components: {
            apexcharts: VueApexCharts,
        },
        data() {
            return {
                chartOptions: {
                    chart: {
                        id: 'line-chart'
                    },
                    xaxis: {
                        categories: this.myData.xAxis
                    }
                },
                series: [
                    {
                        name: this.myData.yAxis.name,
                        data: this.myData.yAxis.data,
                    },
                    // {
                    //     name: 'Hotel Latinum',
                    //     data: [127.5, 130.5, 127.42, 133.9, 128.4, 124.6, 128.5, 139.8, 137, 141.2, 136.133, 134.6],
                    // },
                    // {
                    //     name: 'Hotel PortaMaggiore',
                    //     data: [123.5, 136.5, 129.42, 138.9, 142.4, 134.6, 130.5, 142.8, 139, 144.2, 135.133, 137.6],
                    // }
                ],
                // trigger: false,
                fetchedXAxis: [127.5, 130.5, 127.42, 133.9, 128.4, 124.6, 128.5, 139.8, 137, 141.2, 136.133, 134.6],
                // fetchedXAxis2: []
            }
        },
        created() {
            this.testMethod()
        },

        methods: {
            testMethod() {
                // this.chartOptions.xaxis = {
                //     categories: this.fetchedXAxis
                // }
                // console.log(this.myData)
            },
            updateChart() {
                // const max = 90;
                // const min = 20;
                // const newData = this.series[0].data.map(() => {
                //     return Math.floor(Math.random() * (max - min + 1)) + min
                // })
                // In the same way, update the series option
                // this.series = [this.myData.yAxis]

                // console.log(this.myData.yAxis)

                // this.series = [{
                //     name : this.myData.hotel_name
                // }]

                // this.chartOptions.xaxis = {
                //     categories: ["2019-04-25", "2019-04-27", "2019-04-28", "2019-04-29", "2019-04-30", "2019-05-01", "2019-05-02", "2019-05-05", "2019-05-06", "2019-05-12", "2019-05-13", "2019-05-14", "2019-05-16", "2019-05-19", "2019-05-20", "2019-05-23", "2019-05-24", "2019-05-26", "2019-05-27", "2019-05-28", "2019-05-29", "2019-05-30", "2019-06-02", "2019-06-03", "2019-06-04", "2019-06-06", "2019-06-07", "2019-06-09", "2019-06-10", "2019-06-11", "2019-06-12", "2019-06-13", "2019-06-14", "2019-06-15", "2019-06-16", "2019-06-17", "2019-06-18", "2019-06-19", "2019-06-20", "2019-06-21", "2019-06-23", "2019-06-24", "2019-06-25", "2019-06-26", "2019-06-27", "2019-06-28", "2019-06-29", "2019-06-30", "2019-07-01", "2019-07-04", "2019-07-05", "2019-07-07", "2019-07-08", "2019-07-09", "2019-07-10", "2019-07-11", "2019-07-12", "2019-07-13", "2019-07-14", "2019-07-15", "2019-07-16", "2019-07-17", "2019-07-18", "2019-07-19", "2019-07-20", "2019-07-21", "2019-07-22", "2019-07-23", "2019-07-24", "2019-07-25", "2019-07-26", "2019-07-27", "2019-07-28", "2019-07-29", "2019-07-30", "2019-07-31", "2019-08-01", "2019-08-02", "2019-08-03", "2019-08-04", "2019-08-05", "2019-08-06", "2019-08-07", "2019-08-08", "2019-08-09", "2019-08-10", "2019-08-11", "2019-08-12", "2019-08-13", "2019-08-14", "2019-08-15", "2019-08-16", "2019-08-17", "2019-08-18", "2019-08-19", "2019-08-20", "2019-08-21", "2019-08-22"]
                // }
            }
        }
    }
</script>

<style scoped>

</style>