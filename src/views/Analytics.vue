<template>
    <div>
        <Chart v-if="trigger" v-bind:myData="myData"/>
        <div class="text-xs-center">
            <v-btn color="success" @click="updateChart">Update Chart</v-btn>
        </div>
    </div>
</template>

<script>
    import Chart from '@/components/Chart.vue'
    import apiRequests from '@/services/apiRequests.js'

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
            }
        }
    }
</script>

<style scoped>

</style>