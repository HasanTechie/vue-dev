<template>
    <div>
        <v-container fluid grid-list-xl>
            <div v-if="triggerSecond" class="mb-10">
                <v-layout wrap align-center>
                    <v-flex class="lg2" d-flex>
                        <v-select
                                :items="items"
                                v-model="selectedRoom"
                                label="Room Type"
                                v-on:close="updateRoomType"
                        ></v-select>
                    </v-flex>
                    <v-flex class="lg1" d-flex>
                        <div class="datepicker-trigger">

                            <v-text-field
                                    id="datepicker-trigger"
                                    placeholder="Select dates"
                                    :value="formatDates(dateOne, dateTwo)"
                                    v-on:close="updateRoomType"
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
                    <v-flex class="lg2" d-flex>
                        <v-btn color="success" @click="updateChart">Update Chart</v-btn>
                    </v-flex>
                </v-layout>

                <div class="text-xs-center" v-if="!trigger">
                    <v-progress-circular class="mt-5" indeterminate width="14" color="blue"
                                         size="256"></v-progress-circular>
                </div>
                <v-card class="text-xs-center">
                    <Chart v-if="trigger" v-bind:myData="myData"/>
                </v-card>
            </div>

            <div v-else>
                <v-alert
                        dismissible
                        border="top"
                        colored-border
                        type="info"
                        elevation="2"
                >
                    Please select Competitors. After selection you will be able to see prices of competitors in
                    Analytics and Monthly View section within <b>24hrs</b>.
                </v-alert>
            </div>

            <div>
                <v-sheet class="pa-5">
                    <v-switch v-model="switch1" flat :label="`View : ${getLabelName()}`"></v-switch>
                </v-sheet>
                <v-card class="text-xs-center">
                    <h1 class="pa-2 display-2 mb-3 font-weight-light">{{getLabelName()}} <small>(under testing)</small></h1>
                    <aDataTable v-if="!switch1"/>
                    <aDataTable2 v-if="switch1"/>
                </v-card>
            </div>

        </v-container>
    </div>
</template>

<script>
    import Chart from '@/components/Chart.vue'
    import ADataTable from '@/components/AnalyticsDataTable.vue'
    import ADataTable2 from '@/components/AnalyticsDataTable2.vue'
    import apiRequests from '@/services/apiRequests.js'
    import format from 'date-fns/format'

    export default {
        name: 'Analytics',
        components: {
            Chart, ADataTable, ADataTable2
        },
        data() {
            return {
                trigger: false,
                triggerSecond: true,
                executed: false,
                executedB: false,
                switch1: true,
                myData: {},
                dateFormat: 'D MMM YYYY',
                dateOne: '',
                dateTwo: '',
                // competitors: [JSON.parse(localStorage.getItem('user')).user.hotel_id],
                // hotelid: JSON.parse(localStorage.getItem('user')).user.hotel_id,
                items: [],
                selectedRoom: 'All'

            }
        },
        created() {
            this.getHotelsPrices()
            // this.testingData()
        },
        methods: {
            getLabelName() {
                if (this.switch1) {
                    return 'Monthly Average';
                }else{
                    return 'All Prices';
                }
            },
            getHotelsPrices() {
                /*var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                console.log(date);*/
                if (!this.executedB) {
                    apiRequests.getCompetitorPricesApex(this.selectedRoom, this.dateOne, this.dateTwo)
                        .then(response => {
                            this.myData = response.data.data;

                            this.items = this.myData.rooms

                            if (this.myData.xAxis.length > 1) {
                                this.triggerSecond = true
                                this.trigger = true
                            } else {
                                this.triggerSecond = false
                                this.trigger = false
                            }


                        })
                    this.executedB = true //imp thing
                }
            },
            updateChart() {

                this.trigger = false
                this.executedB = false

                this.getHotelsPrices()

            },
            updateRoomType() {
                this.$store.dispatch('roomtype', this.selectedRoom)
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

                    this.dateOne = dateOne
                    this.dateTwo = dateTwo

                    if (!this.executed) {
                        this.getHotelsPrices()
                        this.executedB = false
                        this.executed = true;
                    }
                }
                return formattedDates
            },
            // getCompetitorsIDs() {
            //     var competitorsArray = JSON.parse(JSON.stringify(
            //         this.$store.getters.competitorsArray))
            //
            //     // this.competitors.push(this.hotelid[0])
            //
            //     for (let i = 0; i < competitorsArray.length; i += 1) {
            //         this.competitors.push(competitorsArray['' + i + '']['hotel_id']);
            //     }
            //
            // },
            // getHotelDataWithDates(dateOne, dateTwo) {
            //
            //     apiRequests.getCompetitorPricesApex(this.selectedRoom, dateOne, dateTwo)
            //         .then(response => {
            //
            //             this.myData = response.data.data
            //
            //             if (this.myData.xAxis.length > 2) {
            //                 this.triggerSecond = true
            //                 this.trigger = true
            //             } else {
            //                 this.triggerSecond = false
            //                 this.trigger = false
            //             }
            //
            //
            //             // if (this.myData.xAxis.length > 2) {
            //             //     this.triggerSecond = true
            //             //     this.trigger = true
            //             // } else {
            //             //     this.triggerSecond = false
            //             //     this.trigger = false
            //             // }
            //             // this.$nextTick(() => {
            //             // Add the component back in
            //             // });
            //         })
            // },

            /*            testingData(){
                            apiRequests.getProcessedCSVs().then(response => {
                                console.log(response.data)
                            })
                        }*/
            /*        getHotelsPrices(){
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
                            }
                    */
        }
    }
</script>

<style scoped>

</style>