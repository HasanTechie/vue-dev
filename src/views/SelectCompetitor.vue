<template>
    <div>
        <v-alert
                dismissible
                border="top"
                colored-border
                type="info"
                elevation="2"
        >
            Except for hotels in Berlin and Rome, all other cities competitors hotels data will be available in
            Analytics and Monthly View section after 24hrs of selection of competitors.
        </v-alert>
        <div class="my-4">
            <h1 class="display-1 blue--text">Select Competitor Hotels</h1>
        </div>
        <multiselect v-model="value"
                     :options="options"
                     :custom-label="nameWithCity"
                     :multiple="true"
                     :close-on-select="true"
                     :clear-on-select="true"
                     :preserve-search="false"
                     placeholder="Pick some"
                     label="name"
                     track-by="name"
                     :preselect-first="true"
                     v-on:close="updateSelectedHotels">
            <template slot="selection"
                      slot-scope="{ values, search, isOpen }">
                        <span class="multiselect__single"
                              v-if="values.length &amp;&amp; !isOpen">{{ values.length }} hotels selected</span>
            </template>
        </multiselect>
        <br>
        <h2 v-if="this.value.length"
            class="blue--text headline">Competitors Selected : {{ this.value.length }}</h2>
        <br>
        <div v-for="item in value" :key="item.hotel_id * Math.random()" class="pb-1">
            <v-chip v-model="item.status" close color="blue title" dark text-color="white"
                    @click:close="updateSelections(item.hotel_id)" label>
                <v-avatar>
                    <v-icon>arrow_right_alt</v-icon>
                </v-avatar>
                <strong>{{item.name}}</strong>
                <span><small>( {{item.address}} )</small></span>
            </v-chip>
        </div>

    </div>
</template>

<script>
    import apiRequests from '@/services/apiRequests.js'
    import Multiselect from 'vue-multiselect'

    export default {
        name: 'SelectCompetitor',
        components: {
            Multiselect
        },

        data() {
            return {
                value: [],
                options: [],
                country_code: JSON.parse(localStorage.getItem('user')).country_code
            }
        },

        created() {
            this.getAllHotels()
            this.getSelectedCompetitors()
        },

        methods: {
            getSelectedCompetitors() {
                this.$store.dispatch('getAllCompetitor'
                ).then(response => {
                    this.value = response.data

                    // console.log(this.value)
                })
            },
            updateSelections(hotel_id) {
                this.$store.dispatch('deleteCompetitor', {
                        user_id: JSON.parse(localStorage.getItem('user')).user.id,
                        hotel_id: hotel_id
                    }
                ).then(() => {
                })

                this.value = this.value.filter(function (returnableObjects) {
                    return returnableObjects.hotel_id !== hotel_id;
                });
                // this.value = this.value.filter(hotel => hotel.hotel_id !== hotel_id); //can be done
            },
            nameWithCity({name, city}) {
                return `${name} — ${city}`
            },
            getAllHotels() {
                apiRequests.getHotels(this.country_code)
                    .then(response => {
                        var dataArray = Object.keys(response.data.data).map((key) => {
                            return response.data.data[key]
                        })
                        // use Vuex store
                        this.options = dataArray
                    })
                    .catch(error => {
                        console.log('There was an error:' + error.response)
                    })
            },
            updateSelectedHotels() {
                this.updateSelectedHotelsHasan()
                this.updateSelectedHotelsWilhelm()
            },
            updateSelectedHotelsHasan() {
                if (this.value.length) {

                    var competitorsArray = JSON.parse(JSON.stringify(this.value))
                    var last = competitorsArray.pop();

                    this.$store.dispatch('storeCompetitor', {
                            user_id: JSON.parse(localStorage.getItem('user')).user.id,
                            hotel_id: last.hotel_id,
                            name: last.name,
                            address: last.address,
                            city: last.city
                        }
                    ).then(() => {
                        this.getSelectedCompetitors()
                        // console.log('added');
                    })
                }

            },
            updateSelectedHotelsWilhelm() {
                // console.log('store')
                var competitorsArray = JSON.parse(JSON.stringify(this.value))
                this.$store.dispatch('setCompetitorsArray', competitorsArray)
                // console.log(competitorsArray)
            }


        },
        // computed: {
        //     // a computed getter
        //     showCounter: function () {
        //         if (this.competitors.length) {
        //             return true
        //         }
        //         return false
        //     },
        //     getCounters: function () {
        //             return this.competitors.length
        //     },
        // }

    }

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
