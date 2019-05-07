<template>
    <div>
        <v-container class="my-4">
            <h1 class="display-2 mb-3 font-weight-light">Analytics</h1>
            <apexcharts width="1200" height="600" type="line" :options="chartOptions" :series="series"></apexcharts>
            <div>
                <button @click="updateChart">Update!</button>
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
                        categories: [999, 130.5, 127.42, 133.9, 128.4, 124.6, 128.5, 139.8, 137, 141.2, 136.133, 134.6]
                    }
                },
                series: [
                    {
                        name: 'Hotel Emona',
                        data: [888, 130.5, 127.42, 133.9, 128.4, 124.6, 128.5, 139.8, 137, 141.2, 136.133, 134.6],
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
                console.log(this.myData.yAxis)
                this.series = [{
                    data: this.myData.yAxis
                }]

                this.chartOptions.xaxis = {
                    categories: this.myData.yAxis
                }
            }
        }
    }
</script>

<style scoped>

</style>