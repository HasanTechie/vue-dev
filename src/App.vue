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
        today: '',
        data() {
            return {
                //
            }
        },
        created() {
            this.checkStatus()
            this.today = this.getTodayDate()
            // dispatch to vuex
            this.$store.dispatch('setToday', this.today)
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
            },
            getTodayDate(){
                const toTwoDigits = num => num < 10 ? '0' + num : num
                let today = new Date()
                let year = today.getFullYear()
                let month = toTwoDigits(today.getMonth() + 1)
                let day = toTwoDigits(today.getDate())
                return `${year}-${month}-${day}`
      },
        }
    }
</script>
