<template>
    <div>
        <v-flex>
            <div class="datepicker-trigger">
                <v-flex xs12 sm6 md3>
                    <v-text-field
                            id="datepicker-trigger"
                            placeholder="Select dates"
                            :value="formatDates(dateOne, dateTwo)"
                    ></v-text-field>
                </v-flex>
                <!--                <input-->
                <!--                        type="text"-->
                <!--                        id="datepicker-trigger"-->
                <!--                        placeholder="Select dates"-->
                <!--                        :value="formatDates(dateOne, dateTwo)"-->
                <!--                >-->

                <AirbnbStyleDatepicker
                        :trigger-element-id="'datepicker-trigger'"
                        :mode="'range'"
                        :fullscreen-mobile="true"
                        :date-one="dateOne"
                        :date-two="dateTwo"
                        @date-one-selected="val => { dateOne = val }"
                        @date-two-selected="val => { dateTwo = val }"
                />
            </div>
            <v-btn color="success" @click="updateChart">Update Chart</v-btn>
        </v-flex>
        <v-card>
            <Chart v-if="trigger" v-bind:myData="myData"/>
        </v-card>
    </div>
</template>

<script>
    import Chart from '@/components/Chart.vue'
    import apiRequests from '@/services/apiRequests.js'
    import format from 'date-fns/format'

    export default {
        name: 'Analytics.vue',
        components: {
            Chart
        },
        data() {
            return {
                trigger: false,
                myData: {
                    'xAxis': [],
                    'yAxis': {},
                    'hotel_name': '',
                },
                dateFormat: 'D MMM YYYY',
                dateOne: '',
                dateTwo: ''
            }
        },
        created() {
            this.getHotelsPrices()
        },
        methods: {
            getHotelsPrices() {

                var competitors = "[21,1354,686]"
                apiRequests.getCompetitorAvgPrices(competitors)
                    .then(response => {

                        var priceArray = []
                        var checkInArray = [];
                        var hotel_name = '';
                        var competitorsPriceArray = [];

                        // console.log(Object.values(competitiorsArray))


                        var data = response.data.data

                        data.forEach(function (item) {
                            hotel_name = item.hotel_name
                            priceArray.push(item.price)
                            checkInArray.push(item.check_in_date)

                            item.competitors_data.forEach(function (itemB) {
                                if (!(itemB.hotel_name in competitorsPriceArray)) {
                                    competitorsPriceArray[itemB.hotel_name] = []
                                }
                                competitorsPriceArray[itemB.hotel_name].push(itemB.price)
                            })

                            item.competitors_data.forEach(function (itemC) {
                                // competitiorsArray.push(itemC.price)
                                // competitiorsArray.forEach(function (itemD) {
                                //
                                //     if (itemD == itemC.hotel_id) {
                                //         competitorsPriceArray[itemC.hotel_id].push(itemC.price)
                                //     }
                                //
                                // })

                            })
                        })

                        console.log(competitorsPriceArray);


                        // var dataArray = Object.keys(response.data.data).map((key) => {
                        //     return response.data.data[key]
                        // })

                        // var hotel_name = '';

                        // console.log(response.data)

                        // dataArray.forEach(function (item) {
                        //
                        //     console.log(item.competitors_data[0].hotel_name)
                        //     item.competitors_data.forEach(function (item) {
                        //         // console.log(item)
                        //     })
                        //     hotel_name = item.hotel_name
                        //     priceArray.push(item.price)
                        //     // this.series = [{
                        //     //     data: item.price
                        //     // }]
                        // });
                        // dataArray.forEach(function (item) {
                        //     checkInArray.push(item.check_in_date)
                        // });

                        this.myData.xAxis = checkInArray


                        this.myData.yAxis = {
                            name: hotel_name,
                            data: priceArray
                        }
                        this.trigger = true

                    })
            },
            updateChart() {
                this.trigger = false

                this.$nextTick(() => {
                    // Add the component back in
                    this.trigger = true
                });
            }
            ,
            formatDates(dateOne, dateTwo) {
                let formattedDates = ''
                if (dateOne) {
                    formattedDates = format(dateOne, this.dateFormat)
                }
                if (dateTwo) {
                    formattedDates += ' - ' + format(dateTwo, this.dateFormat)
                }
                if (dateOne && dateTwo) {
                    this.getHotelDataWithDates(dateOne, dateTwo)
                }
                return formattedDates
            }
            ,
            getHotelDataWithDates(dateOne, dateTwo) {

                var competitors = "[28,83,107,150]"
                apiRequests.getCompetitorAvgPricesForDates(competitors, dateOne, dateTwo)
                    .then(response => {

                        var priceArray = []
                        var checkInArray = [];
                        var dataArray = Object.keys(response.data.data).map((key) => {
                            return response.data.data[key]
                        })

                        var hotel_name = '';

                        dataArray.forEach(function (item) {
                            hotel_name = item.hotel_name
                            priceArray.push(item.price)
                        });
                        dataArray.forEach(function (item) {
                            checkInArray.push(item.check_in_date)
                        });

                        this.myData.xAxis = checkInArray
                        this.myData.yAxis = {
                            name: hotel_name,
                            data: priceArray
                        }
                        //
                        // this.trigger = false
                        //
                        // this.$nextTick(() => {
                        //     // Add the component back in
                        //     this.trigger = true
                        // });

                    })
            }
        }
    }
</script>

<style scoped>

</style>