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
                            <v-text-field prepend-icon="person" v-model="name" label="Your Name"
                                          type="text"></v-text-field>
                            <v-text-field prepend-icon="email" v-model="email" label="Your Email"
                                          type="text"></v-text-field>
                            <v-text-field id="password" prepend-icon="lock" v-model="password" label="Your Password"
                                          type="password"></v-text-field>
                            <v-layout>
                                <v-icon>hotel</v-icon>&nbsp;&nbsp;<multiselect v-model="value" :options="options"
                                                                               :custom-label="nameWithCity"
                                                                               placeholder="Select your Hotel"
                                                                               label="selecthotel"
                                                                               track-by="name"></multiselect>
                            </v-layout>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-3">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="register">Register</v-btn>
                    </v-card-actions>

                    <router-link to="/login">
                        Already have an account? Login
                    </router-link>
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
                name: null,
                email: null,
                password: null,
                hotel_id: 110,
                value: [],
                options: [],
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
            register() {

                this.$store.dispatch('register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    hotel_id: this.hotel_id

                }).then(() => {
                    this.$router.push({name: 'login'})
                })

                // axios.post('/register', {
                //     name: this.name,
                //     email: this.email,
                //     password: this.password
                // }).then((response) => {
                //     console.log('req response' + response)
                // }).catch((error) => {
                //     console.log('req error' + error)
                // })
            }
        }
    }
</script>

<style scoped>

</style>