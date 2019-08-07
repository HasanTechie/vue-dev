<template>
    <div>
        <v-container class="my-4">
            <h1 class="display-2 mb-3 font-weight-light">Analytics</h1>
            <apexcharts 
                class="pa-20" 
                style="width: auto;" 
                height="400px"  
                type="line" 
                :options="chartOptions" 
                :series="series"></apexcharts>
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
                        //type: 'area',
                        id: 'line-chart'
                    },
                    stroke: {
                        show: true,
                        // curve: 'smooth',
                        lineCap: 'butt',
                        colors: undefined,
                        width: 3.2,
                        dashArray: 0,
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: this.myData.xAxis,
                        labels: {
                            show: true,
                            rotate: 0,
                            rotateAlways: false,
                            hideOverlappingLabels: false,
                            trim: true,
                            minHeight: undefined,
                            maxHeight: 120,
                            showDuplicates: false,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: undefined,
                                cssClass: 'apexcharts-xaxis-label'
                            },
                            offsetX: 0,
                            offsetY: 0,
                            format: undefined,
                            formatter: undefined, // custom formatter function which will override format
                            datetimeFormatter: {
                                year: 'yyyy',
                                month: 'MMM \'yy',
                                day: 'dd MMM',
                                hour: 'HH:mm',
                                minute: 'HH:mm:ss'
                            }
                        },
                        axisBorder: {
                            show: true,
                            color: '#78909C',
                            width: '100%',
                            height: 1,
                            offsetX: 0,
                            offsetY: 0
                        },
                        axisTicks: {
                            show: true,
                            color: '#78909C',
                            height: 6,
                            offsetX: 0,
                            offsetY: 0
                        },
                        tickAmount: undefined,
                        min: undefined,
                        max: undefined,
                        range: undefined,
                        floating: false,
                        position: 'bottom',
                        title: {
                            text: undefined,
                            offsetX: 0,
                            offsetY: 0,
                            style: {
                                color: undefined,
                                fontSize: '12px',
                                fontFamily: undefined,
                                cssClass: 'apexcharts-xaxis-title'
                            }
                        },
                        crosshairs: {
                            show: true,
                            width: 2, // tickWidth/barWidth or an integer
                            position: 'back',
                            opacity: 0.6,
                            stroke: {
                                color: '#b6b6b6',
                                width: 1,
                                dashArray: 0
                            },
                            fill: {
                                type: 'solid', // solid, gradient
                                color: '#B1B9C4',
                                gradient: {
                                    colorFrom: '#D8E3F0',
                                    colorTo: '#BED1E6',
                                    stops: [0, 100],
                                    opacityFrom: 0.4,
                                    opacityTo: 0.5
                                }
                            },
                            dropShadow: {
                                enabled: false,
                                left: 0,
                                top: 0,
                                blur: 1,
                                opacity: 0.4
                            }
                        },
                        tooltip: {
                            enabled: true,
                            offsetY: 0,
                            formatter: undefined
                        }
                    },

                    yaxis: {
                        title: {
                            text: 'Pricing in Euro'
                        },
                    },

                },
                series: this.myData.yAxis,

            }
        },
        created() {
        },

        methods: {}
    }
</script>

<style scoped>

</style>