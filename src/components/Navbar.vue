<template>
    <nav>
        <v-toolbar app>
            <v-toolbar-side-icon class="indigo--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <router-link style="text-decoration: none;" :to="{name: 'home'}">
                <v-toolbar-title class="indigo--text">
                    <span class="font-weight-light display-1">Soli</span>
                    <span class="display-1">DPS</span>
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn flat v-for="mainLink in mainLinks" :key="mainLink.text" router :to="{name: mainLink.routename}">
                <span class="indigo--text">{{mainLink.text}}</span>
                <v-icon right class="indigo--text">{{mainLink.icon}}</v-icon>
            </v-btn>
        </v-toolbar>
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
    </nav>
</template>

<script>
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
                mainLinks: [
                    {icon: 'person_add', text: 'Register', routename: 'register'},
                    {icon: 'person', text: 'Login', routename: 'login'},
                    {icon: 'exit_to_app', text: 'Logout', routename: 'login'},
                ]
            }
        },
    }
</script>

<style scoped>

</style>