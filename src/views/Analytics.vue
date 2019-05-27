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
            <div class="text-xs-center" v-if="!trigger">
                    <v-progress-circular class="mt-5" indeterminate width="14" color="blue" size="256"></v-progress-circular>
            </div>
            <v-card class="text-xs-center">
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

                            this.myData = response.data.data

                            this.items = this.myData.rooms

                            this.trigger = true
                        })
                    this.executedB = true
                }
            },
            updateChart() {

                this.trigger = false

                this.getHotelDataWithDates(this.dateOne, this.dateTwo)

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