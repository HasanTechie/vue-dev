<template>
    <div>
        <v-container class="my-4">
            <h1 class="display-2 mb-3 font-weight-light">Analytics</h1>
            <apexcharts width="1800" height="600" type="line" :options="chartOptions" :series="series"></apexcharts>
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
                series: this.myData.yAxis
            }
        },
        created() {
        },

        methods: {}
    }
</script>

<style scoped>

</style>