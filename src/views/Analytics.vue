<template>
    <div>
        <v-container class="my-4">
            <h1 class="display-2 mb-3 font-weight-light">Analytics</h1>
            <apexcharts width="1200" height="600" type="line" :options="chartOptions" :series="series"></apexcharts>
        </v-container>
    </div>
</template>

<script>
    import apiRequests from '@/services/apiRequests.js'
    import VueApexCharts from 'vue-apexcharts'

    export default {
        name: 'Chart',
        components: {
            apexcharts: VueApexCharts,
        },
        data() {
            return {
                chartOptions: {
                    chart: {
                        id: 'basic-bar'
                    },
                    xaxis: {
                        categories : [1215.5, 127.5, 130.42, 128.9, 132.4, 127.6, 126.5, 130.8, 135, 133.2, 131.1, 132.6]
                    }
                },
                series: [
                    {
                        name: 'Hotel Emona',
                        data: [125.5, 127.5, 130.42, 128.9, 132.4, 127.6, 126.5, 130.8, 135, 133.2, 131.1, 132.6],
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
            }
        },
        created() {
            // this.getAllHotels()
            // this.getPrices()
            this.getHotelsPrices()
            this.test2()
        },
        methods: {
            getXaxis() {
                var competitors = "[28,83,107,150]"
                apiRequests.getCompetitorAvgPrices(competitors)
                    .then(response => {
                        var checkInArray = [];
                        var dataArray = Object.keys(response.data.data).map((key) => {
                            return response.data.data[key]
                        })
                        dataArray.forEach(function (item) {
                            checkInArray.push(item.check_in_date)
                        });

                    })
            },

            test2(){
                this.chartOptions.xaxis.categories.fill([12511.5, 127.5, 130.42, 128.9, 132.4, 127.6, 126.5, 130.8, 135, 133.2, 131.1, 132.6])
            },
            // updateChart() {
            //     const max = 90;
            //     const min = 20;
            //     const newData = this.series[0].data.map(() => {
            //         return Math.floor(Math.random() * (max - min + 1)) + min
            //     })
            //
            //     const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
            //
            //     // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
            //     this.chartOptions = {
            //         colors: [colors[Math.floor(Math.random() * colors.length)]]
            //     };
            //     // In the same way, update the series option
            //     this.series = [{
            //         data: newData
            //     }]
            // },
            getHotelsPrices() {
                var competitors = "[28,83,107,150]"
                apiRequests.getCompetitorAvgPrices(competitors)
                    .then(response => {

                        var priceArray = [];
                        var checkInArray = [];
                        var dataArray = Object.keys(response.data.data).map((key) => {
                            return response.data.data[key]
                        })

                        dataArray.forEach(function (item) {
                            priceArray.push(item.price)
                            // this.series = [{
                            //     data: item.price
                            // }]
                        });
                        // this.chartOptions.xaxis.categories = []
                        dataArray.forEach(function (item) {
                            checkInArray.push(item.check_in_date)
                        });

                        console.log(priceArray)
                        // console.log(checkInArray)
                        //
                        // // this.getValuesFromArray(checkInArray)
                        //
                        // // dataArray.forEach(function (item) {
                        // //     priceArray.push(item.price)
                        // //     this.series = [{
                        // //         data: item.price
                        // //     }]
                        // // });
                        //
                        this.series = [{
                            data: priceArray
                        }];
                        // this.chartOptions.xaxis.categories = priceArray;
                        // var aweinArray = ['March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'December', 'January', 'February'];
                        // this.getValuesFromArray()

                        // this.chartOptions.xaxis.categories = checkInArray;


                    })
            },
            // getAllHotels() {
            //     apiRequests.getHotels()
            //         .then(response => {
            //             // this.events = response.data
            //
            //             // var dataArray = Object.keys(response.data.data).map((key) => {
            //             //     return response.data.data[key]
            //             // })
            //
            //             console.log(response.data)
            //         })
            //         .catch(error => {
            //             console.log('There was an error:' + error.response)
            //         })
            // },
            fetchPrices() {
                // fetch('api/rooms/hoteluid=5c80a2d79d162&datefrom=2019-03-14&dateto=2019-08-14')
                //     .then(res => res.json())
                //     .then(res => {
                //
                //         const priceArray = [];
                //         // const checkInArray =[];
                //         res.data.forEach(function (item) {
                //             priceArray.push(item.price)
                //             // this.series = [{
                //             //     data: item.price
                //             // }]
                //         });
                //
                //         // res.data.forEach(function (item) {
                //         //     checkInArray.push(item.check_in_date)
                //         //     // this.series = [{
                //         //     //     data: item.price
                //         //     // }]
                //         // });
                //
                //         // console.log(this.chartOptions.xaxis.categories)
                //
                //
                //         // this.series = [{
                //         //     data: priceArray
                //         // }];
                //     })
            },
        }
    }
</script>

<style scoped>

</style>