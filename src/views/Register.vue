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
                        <!--                                                <v-form ref="form">-->
                        <!--                                                    <v-text-field prepend-icon="person" v-model="name" label="Your Name"-->
                        <!--                                                                  type="text" :error-messages="nameErrors"-->
                        <!--                                                                  :counter="10"-->
                        <!--                                                                  required-->
                        <!--                                                                  @input="$v.name.$touch()"-->
                        <!--                                                                  @blur="$v.name.$touch()"-->
                        <!--                                                    ></v-text-field>-->
                        <!--                                                    <v-text-field prepend-icon="email" v-model="email" label="Your Email"-->
                        <!--                                                                  type="text"></v-text-field>-->
                        <!--                                                    <v-text-field id="password" prepend-icon="lock" v-model="password" label="Your Password"-->
                        <!--                                                                  type="password" required></v-text-field>-->
                        <!--                                                    <v-layout>-->
                        <!--                                                        <v-icon>hotel</v-icon>&nbsp;&nbsp;<multiselect v-model="value" :options="options"-->
                        <!--                                                                                                       :custom-label="nameWithCity"-->
                        <!--                                                                                                       placeholder="Select your Hotel"-->
                        <!--                                                                                                       label="selecthotel"-->
                        <!--                                                                                                       track-by="name"></multiselect>-->
                        <!--                                                    </v-layout>-->
                        <!--                                                    <v-switch-->
                        <!--                                                            v-model="terms"-->
                        <!--                                                            label="indigo"-->
                        <!--                                                            color="indigo"-->
                        <!--                                                            value="indigo"-->
                        <!--                                                            hide-details-->
                        <!--                                                            required-->
                        <!--                                                    ></v-switch>-->
                        <!--                                                </v-form>-->

                        <form @submit.prevent="submit">
                            <v-text-field
                                    prepend-icon="person"
                                    v-model="name"
                                    :error-messages="nameErrors"
                                    :counter="10"
                                    label="Your Name"
                                    required
                                    @input="$v.name.$touch()"
                                    @blur="$v.name.$touch()"
                            ></v-text-field>
                            <v-text-field
                                    prepend-icon="email"
                                    v-model="email"
                                    :error-messages="emailErrors"
                                    label="Your E-mail"
                                    required
                                    @input="$v.email.$touch()"
                                    @blur="$v.email.$touch()"
                            ></v-text-field>
                            <v-text-field
                                    prepend-icon="lock"
                                    v-model="password"
                                    :error-messages="passwordErrors"
                                    label="Your Password"
                                    required
                                    @input="$v.password.$touch()"
                                    @blur="$v.password.$touch()"
                            ></v-text-field>
<!--                            <v-layout>-->
<!--                                <v-icon>hotel</v-icon>&nbsp;&nbsp;<multiselect v-model="value" :options="options"-->
<!--                                                                               :custom-label="nameWithCity"-->
<!--                                                                               placeholder="Select your Hotel"-->
<!--                                                                               label="selecthotel"-->
<!--                                                                               track-by="name"></multiselect>-->
<!--                            </v-layout>-->
                            <!--                            <v-select-->
                            <!--                                    v-model="select"-->
                            <!--                                    :items="items"-->
                            <!--                                    :error-messages="selectErrors"-->
                            <!--                                    label="Item"-->
                            <!--                                    required-->
                            <!--                                    @change="$v.select.$touch()"-->
                            <!--                                    @blur="$v.select.$touch()"-->
                            <!--                            ></v-select>-->

<!--                            <v-switch-->
<!--                                    v-model="checkbox"-->
<!--                                    label="Do you agree?"-->
<!--                                    :error-messages="checkboxErrors"-->
<!--                                    color="indigo"-->
<!--                                    value="indigo"-->
<!--                                    hide-details-->
<!--                                    required-->
<!--                                    @change="$v.checkbox.$touch()"-->
<!--                                    @blur="$v.checkbox.$touch()"-->
<!--                            ></v-switch>-->

                            <!--                            <v-checkbox-->
                            <!--                                    v-model="checkbox"-->
                            <!--                                    :error-messages="checkboxErrors"-->
                            <!--                                    label="Do you agree?"-->
                            <!--                                    required-->
                            <!--                                    @change="$v.checkbox.$touch()"-->
                            <!--                                    @blur="$v.checkbox.$touch()"-->
                            <!--                            ></v-checkbox>-->

                            <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>
                            <v-btn @click="clear">clear</v-btn>
                        </form>
                    </v-card-text>

                    <!--                    <v-card-actions class="pa-3">-->
                    <!--                        <v-spacer></v-spacer>-->
                    <!--                        <v-btn color="primary" @click="register">Register</v-btn>-->
                    <!--                    </v-card-actions>-->

                    <v-card-text>
                        <router-link to="/login">
                            Already have an account? Login
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
    import {validationMixin} from 'vuelidate'
    import {required, maxLength, minLength, email} from 'vuelidate/lib/validators'

    export default {
        name: 'Register',
        components: {
            Multiselect
        },
        props: {
            source: String
        },
        mixins: [validationMixin],

        validations: {
            name: {required, maxLength: maxLength(10)},
            email: {required, email},
            password: {required, minLength: minLength(6)},
            select: {required},
            checkbox: {
                checked(val) {
                    return val
                }
            }
        },
        data() {
            return {
                name: '',
                email: null,
                password: null,
                hotel_id: null,
                select: null,
                submitStatus: null,
                items: ['awein', 'pmne more'],
                inputRules: [
                    v => !!v || 'This field is required',
                    v => v && v.length >= 3 || 'Minimum length is 3 characters'

                ],
                checkbox: false,
                terms: false,
                value: [],
                options: [],
            }
        },
        created() {
            this.getAllHotels()
        },
        computed: {
            checkboxErrors() {
                const errors = []
                if (!this.$v.checkbox.$dirty) return errors
                !this.$v.checkbox.checked && errors.push('You must agree to continue!')
                return errors
            },
            selectErrors() {
                const errors = []
                if (!this.$v.select.$dirty) return errors
                !this.$v.select.required && errors.push('Item is required')
                return errors
            },
            nameErrors() {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
                !this.$v.name.required && errors.push('Name is required.')
                return errors
            },
            emailErrors() {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be valid e-mail')
                !this.$v.email.required && errors.push('E-mail is required')
                return errors
            },
            passwordErrors() {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.minLength && errors.push('Password must be at least 6 characters long')
                !this.$v.password.required && errors.push('Password is required.')
                return errors
            }
        },
        methods: {
            submit() {
                console.log('submit!')
                this.$v.$touch()
                if (this.$v.$invalid) {
                    console.log('submit Invalid')
                    this.submitStatus = 'ERROR'
                } else {
                    console.log('submit Valid')
                    // do your submit logic here
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500)
                }
            },
            clear() {
                this.$v.$reset()
                this.name = ''
                this.email = ''
                this.select = null
                this.checkbox = false
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

                // console.log('submit!')
                // this.$v.$touch()
                // if (this.$v.$invalid) {
                //     this.submitStatus = 'ERROR'
                //     console.log('reachedError!')
                // } else {
                //     console.log('reachedElse!')
                //     // do your submit logic here
                //     this.$store.dispatch('register', {
                //         name: this.name,
                //         email: this.email,
                //         password: this.password,
                //         hotel_id: this.value.hotel_id
                //     }).then(() => {
                //         location.reload()
                //         this.$router.push({name: 'home'})
                //     })
                //     //
                //     this.submitStatus = 'PENDING'
                //     setTimeout(() => {
                //         this.submitStatus = 'OK'
                //     }, 500)
                // }

                // this.$v.$touch()
                // if (this.$v.$invalid) {
                //     this.submitStatus = 'ERROR'
                //     console.log('reachedErorr')
                // } else {
                //     console.log('reached')
                //     this.$store.dispatch('register', {
                //         name: this.name,
                //         email: this.email,
                //         password: this.password,
                //         hotel_id: this.value.hotel_id
                //     }).then(() => {
                //         location.reload()
                //         this.$router.push({name: 'home'})
                //     })
                // }

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