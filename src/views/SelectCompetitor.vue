<template>
    <div id="app">
        <label class="typo__label">Select Competitor Hotels</label>
        <multiselect v-model="value" :options="options" :custom-label="nameWithCity" :multiple="true"
                     :close-on-select="true"
                     :clear-on-select="true" :preserve-search="false" placeholder="Pick some" label="name"
                     track-by="name" :preselect-first="true" v-on:close="updateSelectedHotels">
            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single"
                                                                                     v-if="values.length &amp;&amp; !isOpen">{{ values.length }} hotels selected</span>
            </template>
        </multiselect>
        <!--        <pre class="language-json"><code>{{ value }}</code></pre>-->

        <br>
        <h2 v-if="value.length" class="blue--text headline">Competitors Selected : {{ value.length }}</h2>
        <br>
        <div v-for="item in value" :key="item.hotel_id">
            <v-chip v-model="item.status" close color="blue title" dark text-color="white" @input="updateSelections(item.hotel_id)" label>
                <v-avatar>
                    <v-icon>arrow_right_alt</v-icon>
                </v-avatar>
                <strong>{{item.name}}</strong>&nbsp;
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
                trigger: true,
            }
        },

        created() {
            this.getAllHotels()
        },

        methods: {
            updateSelections(hotel_id) {

                this.value = this.value.filter(function (returnableObjects) {
                    return returnableObjects.hotel_id !== hotel_id;
                });

                // this.value = this.value.filter(hotel => hotel.hotel_id !== hotel_id); //can be done
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
