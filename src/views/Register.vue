<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Register</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="person" name="name" label="Your Name"
                                          type="text"></v-text-field>
                            <v-text-field prepend-icon="email" name="email" label="Your Email"
                                          type="text"></v-text-field>
                            <v-text-field id="password" prepend-icon="lock" name="password" label="Your Password"
                                          type="password"></v-text-field>
                            <v-layout>
                                <v-icon>hotel</v-icon>&nbsp;&nbsp;<multiselect v-model="value" :options="options" :custom-label="nameWithCity"
                                             placeholder="Select your Hotel"
                                             label="selecthotel" track-by="name"></multiselect>
                            </v-layout>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-3">
                        <v-spacer></v-spacer>
                        <v-btn color="primary">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import apiRequests from '@/services/apiRequests.js'
    import Multiselect from 'vue-multiselect'

    export default {
        name: 'Register',
        components: {
            Multiselect
        },
        props: {
            source: String
        },
        data() {
            return {
                value: [],
                options: [],
                drawer: null
            }
        },
        created() {
            this.getAllHotels()
        },
        methods: {
            nameWithCity({name, city}) {
                return `${name} — ${city}`
            },
            getAllHotels() {
                apiRequests.getHotels()
                    .then(response => {
                        var dataArray = Object.keys(response.data.data).map((key) => {
                            return response.data.data[key]
                        })

                        this.options = dataArray;
                    })
                    .catch(error => {
                        console.log('There was an error:' + error.response)
                    })
            },
        }
    }
</script>

<style scoped>

</style>