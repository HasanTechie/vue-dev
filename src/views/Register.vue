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
                        <v-form ref="form">
                            <v-text-field prepend-icon="person" v-model="name" label="Your Name"
                                          type="text" :rules="inputNameRules"></v-text-field>
                            <v-text-field prepend-icon="email" v-model="email" label="Your Email"
                                          type="text" :rules="inputEmailRules"></v-text-field>
                            <v-text-field id="password" prepend-icon="lock" v-model="password" label="Your Password"
                                          type="password" :rules="inputPasswordRules"></v-text-field>
                            <v-layout>
                                <v-icon>hotel</v-icon>&nbsp;&nbsp;<multiselect v-model="value" :options="options"
                                                                               :custom-label="nameWithCity"
                                                                               @input="onChange"
                                                                               placeholder="Select your Hotel"
                                                                               label="selecthotel"
                                                                               track-by="name"
                            ></multiselect>
                            </v-layout>
                            <v-layout v-show="showSelectError">
                                <span class="red--text ml-4 caption">
                                    &nbsp;&nbsp;&nbsp;{{showSelectError}}
                                </span>
                            </v-layout>
                            <v-switch
                                    v-model="terms"
                                    color="indigo"
                                    value="indigo"
                                    hide-details
                                    label="I agree to all Terms and Conditions"
                                    :rules="inputSwitchRules"
                            ></v-switch>
                            <!--                            <v-layout>-->
                            <!--                                -->
                            <!--                            </v-layout>-->
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-3">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="register">Register</v-btn>
                    </v-card-actions>

                    <v-card-text>
                        <router-link to="/login">
                            <v-btn outlined color="blue">Already have an account? Login</v-btn>
                        </router-link>
                    </v-card-text>
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
                hotel_id: null,
                showSelectError: null,
                inputNameRules: [
                    v => !!v || 'Name is required',
                    v => v && v.length >= 3 || 'Minimum length is 3 characters'
                ],
                inputEmailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                inputPasswordRules: [
                    v => !!v || 'Password is required',
                    v => v && v.length >= 6 || 'Minimum length is 6 characters'
                ],
                inputSwitchRules: [
                    v => !!v || 'inValid',
                ],
                terms: false,
                value: [],
                options: [],
            }
        },
        created() {
            this.getAllHotels()
        },
        methods: {
            onChange() {
                this.showSelectError = null
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
                        this.options = dataArray;
                    })
                    .catch(error => {
                        console.log('There was an error:' + error.response)
                    })
            },
            register() {
                if (!this.value.hotel_id) {
                    this.showSelectError = 'Please Select your Hotel'
                }

                if (this.$refs.form.validate()) {
                    if (this.value.hotel_id) {
                        this.$store.dispatch('register', {
                            name: this.name,
                            email: this.email,
                            password: this.password,
                            hotel_id: this.value.hotel_id
                        }).then(() => {
                            location.reload()
                            this.$router.push({name: 'home'})
                        })
                    }
                }
            }
        }
    }
</script>

<style scoped>
</style>