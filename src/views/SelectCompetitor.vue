<template>
    <div>
        <label class="typo__label">Simple select / dropdown</label>
        <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false"
                     :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name"
                     track-by="name" :preselect-first="true">
            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single"
                                                                                     v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
            </template>
        </multiselect>
        <pre class="language-json"><code>{{ value  }}</code></pre>
    </div>
</template>

<script>
    import apiRequests from '@/services/apiRequests.js'
    import Multiselect from 'vue-multiselect'

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
            apiRequests.getHotels()
                .then(response => {
                    // this.events = response.data

                    var dataArray = Object.keys(response.data.data).map((key) => {
                        return response.data.data[key]
                    })

                    this.options = dataArray

                    console.log(dataArray)
                })
                .catch(error => {
                    console.log('There was an error:' + error.response)
                })
        }
    }

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
