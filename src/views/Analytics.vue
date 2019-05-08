<template>
    <div>
        <v-flex xs8>
            <Chart v-if="trigger" v-bind:myData="myData"/>
        </v-flex>
        <v-flex xs4>

            <div>
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
            </div>
            <div class="text-xs-center">
                <v-btn color="success" @click="updateChart">Update Chart</v-btn>
            </div>
        </v-flex>
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

                var competitors = "[28,83,107,150]"
                apiRequests.getCompetitorAvgPrices(competitors)
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
                            // this.series = [{
                            //     data: item.price
                            // }]
                        });
                        dataArray.forEach(function (item) {
                            checkInArray.push(item.check_in_date)
                        });

                        this.myData.xAxis = checkInArray
                        this.myData.yAxis = {
                            name: hotel_name,
                            data: priceArray
                        }
                        this.trigger = true

                    })
            },
            updateChart() {
                this.trigger = false;

                this.$nextTick(() => {
                    // Add the component back in
                    this.trigger = true;
                });
            },
            formatDates(dateOne, dateTwo) {
                let formattedDates = ''
                if (dateOne) {
                    formattedDates = format(dateOne, this.dateFormat)
                }
                if (dateTwo) {
                    formattedDates += ' - ' + format(dateTwo, this.dateFormat)
                }
                return formattedDates
            }
        }
    }
</script>

<style scoped>

</style>