<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="email" v-model="email" name="email" label="Your Email"
                                          type="text"></v-text-field>
                            <v-text-field id="password" prepend-icon="lock" v-model="password" name="Your Password"
                                          label="Password"
                                          type="password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="pa-3">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login">Login</v-btn>
                    </v-card-actions>
                    <v-card-text>
                        <router-link to="/register">
                            Dont have an account? Register
                        </router-link>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email: null,
                password: null,
            }
        },
        created() {
        },
        methods: {
            login() {
                this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                }).then(() => {
                    location.reload()
                    this.$router.push({name: 'home'})
                })
            },
        }
    }
</script>

<style scoped>

</style>