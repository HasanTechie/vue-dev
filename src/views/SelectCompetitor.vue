<template>
    <div id="app">
        <label class="typo__label">Select Competitor Hotels</label>
        <multiselect v-model="value" :options="options" :custom-label="nameWithCity" :multiple="true"
                     :close-on-select="false"
                     :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name"
                     track-by="name" :preselect-first="true" v-on:close="updateSelectedHotels">
            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single"
                                                                                     v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
            </template>
        </multiselect>
        <pre class="language-json"><code>{{ value }}</code></pre>
<!--        <div v-for="chip in chips" :key="chip.hotel_id">-->
<!--            <v-chip-->
<!--                    v-model="chip.h_status"-->
<!--                    @click="updateSelections()"-->
<!--                    close-->
<!--            >{{chip.hotel_name}}-->
<!--            </v-chip>-->
<!--        </div>-->

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
                chips: [
                    {h_status:true, hotel_name: 'Hotel On1', hotel_id:12},
                    {h_status:true, hotel_name: 'Hotel Two', hotel_id:23},
                ]
            }
        },

        created() {
            this.getAllHotels()
        },

        methods: {
            updateSelections(){
              console.log(this.chips)
            },
            nameWithCity({name, city}) {
                return `${name} — ${city}`
            },
            getAllHotels() {
                apiRequests.getHotels()
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
                console.log('store')
                var competitorsArray = JSON.parse(JSON.stringify(this.value))
                this.$store.dispatch('setCompetitorsArray', competitorsArray)
                console.log(competitorsArray)

            }

        }

    }

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
