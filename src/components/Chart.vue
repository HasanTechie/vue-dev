<template>
    <div>
        <v-container class="my-4">
            <h1 class="display-2 mb-3 font-weight-light">Analytics</h1>
            <apexcharts width="1200" height="600" type="line" :options="chartOptions" :series="series"></apexcharts>
        </v-container>
    </div>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'

    export default {
        name: 'Chart.vue',
        props: {
            xAxis: {
                type: Array,
                required: true
            },
            yAxis: {
                type: Array,
                required: true
            },
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
                        categories: this.yAxis
                    }
                },
                series: [
                    {
                        name: 'Hotel Emona',
                        data: this.xAxis,
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
                trigger: false,
                fetchedXAxis: [],
                fetchedXAxis2: []
            }
        }
    }
</script>

<style scoped>

</style>