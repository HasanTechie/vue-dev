<template>
    <nav>
        <v-app-bar app>
            <v-app-bar-nav-icon v-if="loggedIn" class="indigo--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <router-link style="text-decoration: none;" :to="{name: 'home'}">
                <v-toolbar-title class="indigo--text">
                    <span class="font-weight-light display-1">Soli</span>
                    <span class="display-1">DPS</span>
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <div v-if="!loggedIn">
                <v-btn text router
                       :to="{name: 'register'}">
                    <span class="indigo--text">Register</span>
                    <v-icon right class="indigo--text">person_add</v-icon>
                </v-btn>
                <v-btn text router
                       :to="{name: 'login'}">
                    <span class="indigo--text">Login</span>
                    <v-icon right class="indigo--text">person</v-icon>
                </v-btn>
            </div>
            <div v-if="loggedIn">
                <v-btn text>
                    <span class="indigo--text">{{hotel_name}}</span>
                </v-btn>
                <v-btn text @click="logout">
                    <span class="indigo--text">Logout</span>
                    <v-icon right class="indigo--text">exit_to_app</v-icon>
                </v-btn>
            </div>
        </v-app-bar>
        <div v-if="loggedIn">
            <v-navigation-drawer v-model="drawer" app class="indigo">
                <v-list>
                    <v-list-item v-for="link in links" :key="link.text" router :to="{name: link.routename}">
                        <v-list-item-action>
                            <v-icon class="white--text" >{{link.icon}}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="white--text subtitle-2">{{link.text}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-for="link in links2" :key="link.text" router :to="{name: link.routename}">
                        <v-list-item-action>
                            <v-icon class="white--text" >{{link.icon}}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="white--text subtitle-2"><small>{{link.text}} <v-icon x-small class="white--text" >build</v-icon></small></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
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
                drawer: true,
                dialog: false,
                hotel_name:'',
                links: [
                    {icon: 'home', text: 'Home', routename: 'home'},
                    {icon: 'list', text: 'Select Competitor Hotels', routename: 'selectcompetitor'},
                    {icon: 'bar_chart', text: 'Analytics', routename: 'analytics'},
                ],
                links2: [
                    {icon: 'calendar_today', text: 'Monthly View (coming soon)', routename: 'comingsoon'},
                    {icon: 'attachment', text: 'Connect PMS (coming soon)', routename: 'comingsoon'},
                    {icon: 'cloud_upload', text: 'Upload Images (coming soon)', routename: 'comingsoon'},
                ],
            }
        },
        created(){
          this.getName()
        },
        computed: {
            ...authComputed
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                location.reload()
            },
            getName(){
                if (this.loggedIn) {
                    this.hotel_name= JSON.parse(localStorage.getItem('user')).hotel_name;
                }
            }
        }
    }
</script>

<style scoped>

</style>