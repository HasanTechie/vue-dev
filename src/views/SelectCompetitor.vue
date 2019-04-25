<template>
    <div id="app">
        <label class="typo__label">Select Competitor Hotels</label>
        <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false"
                     :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name"
                     track-by="name" :preselect-first="true" v-on:close="updateSelectedHotels">
            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single"
                                                                                     v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
            </template>
        </multiselect>
        <pre class="language-json"><code>{{ value }}</code></pre>
    </div>
</template>

<script>
    import apiRequests from '@/services/apiRequests.js'
    import Multiselect from 'vue-multiselect'
    import { close } from 'fs';

    export default {
        components: {
            Multiselect
        },

        data() {
            return {
                value: [],
                options: [],
            }
        },
        
        created() {
            this.getAllHotels()
        },

        methods: {
            getAllHotels() {
                apiRequests.getHotels()
                    .then(response => {

                        var dataArray = Object.keys(response.data.data).map((key) => {
                            return response.data.data[key]
                        })
                        // use Vuex store
                        this.options = dataArray
                        //console.log(' this is in options')
                        //console.log(this.options)
                    })
                    .catch(error => {
                        console.log('There was an error:' + error.response)
                    })
            },

            updateSelectedHotels(){
                console.log('updating selected hotels in vuex.store')
                var competitorsArray = JSON.parse(JSON.stringify(this.value))
                this.$store.dispatch('setCompetitorsArray', competitorsArray)
                console.log(competitorsArray)

            }

        }
        
    }
    
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
