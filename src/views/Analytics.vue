<template>
    <div>
        <v-container fluid grid-list-xl>
            <v-layout wrap align-center>
                <v-flex xs6 sm3 d-flex>
                    <v-select
                            :items="items"
                            v-model="selectedValue"
                            label="Room Type"
                    ></v-select>
                </v-flex>
                <v-flex xs6 sm3 d-flex>
                    <div class="datepicker-trigger">

                        <v-text-field
                                id="datepicker-trigger"
                                placeholder="Select dates"
                                :value="formatDates(dateOne, dateTwo)"
                        ></v-text-field>

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
                </v-flex>
                <v-btn color="success" @click="updateChart">Update Chart</v-btn>
            </v-layout>
            <v-card>
                <Chart v-if="trigger" v-bind:myData="myData"/>
            </v-card>
        </v-container>
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
                executed: false,
                myData: {},
                dateFormat: 'D MMM YYYY',
                dateOne: '',
                dateTwo: '',
                competitors: [21, 37, 95, 160, 1354],
                hotelid: [21],
                items: ['All', 'Standard Room', 'Superior Room', 'Junior Suite'],
                selectedValue: 'All'

            }
        },
        created() {
            this.getHotelsPrices()
        },
        methods: {

            getHotelsPrices() {

                apiRequests.getCompetitorPricesApex(this.hotelid, this.competitors, this.selectedValue)
                    .then(response => {

                        this.myData = response.data.data;

                        /*
                        var data = response.data.data


                        var anotherONe = new Object();

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

                            // item.competitors_data.forEach(function (itemC) {
                            //     // competitiorsArray.push(itemC.price)
                            //     // competitiorsArray.forEach(function (itemD) {
                            //     //
                            //     //     if (itemD == itemC.hotel_id) {
                            //     //         competitorsPriceArray[itemC.hotel_id].push(itemC.price)
                            //     //     }
                            //     //
                            //     // })
                            //
                            // })

                        })

                        // console.log(competitorsPriceArray.forEach())

                        // var competitorsPriceArray = [45, 4, 9, 16, 25];
                        competitorsPriceArray.forEach(myFunction);

                        function myFunction(value, index, array) {

                            console.log(value + index + array)
                        }


                        // var awein = competitorsPriceArray.pop()
                        // console.log(awein);

                        // var dA = competitorsPriceArray;
                        //
                        // // console.log(dA)
                        //
                        //
                        // for(let i = 0; i < dA.length; i++){
                        //
                        //     console.log(dA[i]);
                        //
                        // }

                        // console.log(dA)
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


                        this.myData.yAxis = [
                            {
                                name: hotel_name,
                                data: priceArray
                            },
                            {
                                name: 'laosa',
                                data: [1, 2, 3, 4, null, null, null, 5, 667, 7, 8]
                            },
                        ]
*/
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
                    if (!this.executed) {
                        this.getHotelDataWithDates(dateOne, dateTwo)
                        this.executed = true;
                    }
                }
                return formattedDates
            }
            ,
            getHotelDataWithDates(dateOne, dateTwo) {
                apiRequests.getCompetitorPricesApex(this.hotelid, this.competitors, this.selectedValue, dateOne, dateTwo)
                    .then(response => {

                        this.myData = response.data.data

                    })
            }
        }
    }
</script>

<style scoped>

</style>