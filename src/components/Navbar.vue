<template>
    <nav>
        <v-toolbar app>
            <v-toolbar-side-icon v-if="loggedIn" class="indigo--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <router-link style="text-decoration: none;" :to="{name: 'home'}">
                <v-toolbar-title class="indigo--text">
                    <span class="font-weight-light display-1">Soli</span>
                    <span class="display-1">DPS</span>
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <div v-if="!loggedIn">
                <v-btn flat router
                       :to="{name: 'register'}">
                    <span class="indigo--text">Register</span>
                    <v-icon right class="indigo--text">person_add</v-icon>
                </v-btn>
                <v-btn flat router
                       :to="{name: 'login'}">
                    <span class="indigo--text">Login</span>
                    <v-icon right class="indigo--text">person</v-icon>
                </v-btn>
            </div>
            <div v-if="loggedIn">
                <v-btn flat @click="logout">
                    <span class="indigo--text">Logout</span>
                    <v-icon right class="indigo--text">exit_to_app</v-icon>
                </v-btn>
            </div>
        </v-toolbar>
        <div v-if="loggedIn">
            <v-navigation-drawer v-model="drawer" app class="indigo">
                <v-list>
                    <v-list-tile v-for="link in links" :key="link.text" router :to="{name: link.routename}">
                        <v-list-tile-action>
                            <v-icon class="white--text">{{link.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
        </div>
    </nav>
</template>

<script>
    import {authComputed} from "../vuex/helpers";

    export default {
        name: "Navbar",
        data() {
            return {
                drawer: false,
                links: [
                    {icon: 'home', text: 'Home', routename: 'home'},
                    {icon: 'list', text: 'Select Competitor Hotels', routename: 'selectcompetitor'},
                    {icon: 'bar_chart', text: 'Analytics', routename: 'analytics'},
                    {icon: 'calendar_today', text: 'Monthly View', routename: 'monthly'},
                ],
            }
        },
        computed: {
            ...authComputed
        },
        created() {
            this.checkStatus()
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            checkStatus() {
                if (localStorage.getItem('user')) {
                    if (!JSON.parse(localStorage.getItem('user')).user.status) {
                        this.$store.dispatch('logout')
                        alert('Please contact for activation')
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>