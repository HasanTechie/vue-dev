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
        name: 'Analytics',
        components: {
            Chart
        },
        data() {
            return {
                trigger: false,
                executed: false,
                executedB: false,
                myData: {},
                dateFormat: 'D MMM YYYY',
                dateOne: '',
                dateTwo: '',
                competitors: [JSON.parse(localStorage.getItem('user')).user.hotel_id],
                hotelid: JSON.parse(localStorage.getItem('user')).user.hotel_id,
                items: [],
                selectedValue: 'All'

            }
        },
        created() {
            this.getCompetitorsIDs()
            this.getHotelsPrices()
        },
        methods: {
            getHotelsPrices() {

                if (!this.executedB) {

                    apiRequests.getCompetitorPricesApex(this.hotelid, this.competitors, this.selectedValue)
                        .then(response => {

                            this.myData = response.data.data;

                            this.items = this.myData.rooms


                            /*
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


                            // var competitorsPriceArray = [45, 4, 9, 16, 25];
                            competitorsPriceArray.forEach(myFunction);

                            function myFunction(value, index, array) {

                                console.log(value + index + array)
                            }



                            // var dA = competitorsPriceArray;
                            //
                            //
                            //
                            // for(let i = 0; i < dA.length; i++){
                            //
                            //
                            // }

                            // var dataArray = Object.keys(response.data.data).map((key) => {
                            //     return response.data.data[key]
                            // })


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
    */

                            this.trigger = true
                        })
                    this.executedB = true
                }
            },
            updateChart() {

                this.trigger = false

                this.getHotelDataWithDates(this.dateOne, this.dateTwo)

                // this.$nextTick(() => {
                //     // Add the component back in
                //     this.trigger = true
                // });
            },

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
            },
            getCompetitorsIDs() {
                var competitorsArray = JSON.parse(JSON.stringify(
                    this.$store.getters.competitorsArray))

                // this.competitors.push(this.hotelid[0])

                for (let i = 0; i < competitorsArray.length; i += 1) {
                    this.competitors.push(competitorsArray['' + i + '']['hotel_id']);
                }

            },
            getHotelDataWithDates(dateOne, dateTwo) {
                apiRequests.getCompetitorPricesApex(this.hotelid, this.competitors, this.selectedValue, dateOne, dateTwo)
                    .then(response => {

                        this.myData = response.data.data

                        // this.$nextTick(() => {
                            // Add the component back in
                            this.trigger = true
                        // });
                    })
            }
        }
    }
</script>

<style scoped>

</style>