<template>
    <v-app>
        <Navbar/>
        <v-content class="ma-4">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import Navbar from '@/components/Navbar'

    export default {
        name: 'App',
        components: {
            Navbar
        },
        data() {
            return {
                //
            }
        },
        created() {
            this.checkStatus()
        },
        methods: {
            checkStatus() {
                if (localStorage.getItem('user')) {

                    if (JSON.parse(localStorage.getItem('user')).user) {
                        if (!JSON.parse(localStorage.getItem('user')).user.status) {
                            this.$swal('Account not active!',
                                'Please contact for account activation',
                                'info');
                            this.$store.dispatch('logout')

                            // alert('Please contact for activation')
                        }
                    } else {
                        this.$store.dispatch('logout')
                        alert('Incorrect password')
                    }

                }
            }
        }
    }
</script>
