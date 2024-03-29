<template>
    <div>
        <h1 class="display-2 mb-3 font-weight-light">Events</h1>
        <v-layout row wrap>
            <v-flex
                    sm12
                    lg12
                    class="pa-3 mb-3 feature-pane"
            >
                <v-btn
                        fab
                        outlined
                        small
                        absolute
                        left
                        color="primary"
                        @click="$refs.calendar.prev()"
                >
                    <v-icon dark>
                        keyboard_arrow_left
                    </v-icon>
                </v-btn>
                <v-btn
                        fab
                        outlined
                        small
                        absolute
                        right
                        color="primary"
                        @click="$refs.calendar.next()"
                >
                    <v-icon
                            dark
                    >
                        keyboard_arrow_right
                    </v-icon>
                </v-btn>
                <br><br><br>

                <v-menu
                        ref="startMenu"
                        v-model="startMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="start"
                        transition="scale-transition"
                        min-width="290px"
                        offset-y
                        full-width
                >

                    <v-date-picker
                            v-model="start"
                            no-title
                            scrollable
                    >
                        <v-spacer></v-spacer>
                        <v-btn
                                text
                                color="primary"
                                @click="startMenu = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                                text
                                color="primary"
                                @click="$refs.startMenu.save(start)"
                        >
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <v-menu
                        v-if="hasEnd"
                        ref="endMenu"
                        v-model="endMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="end"
                        transition="scale-transition"
                        min-width="290px"
                        offset-y
                        full-width
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                                v-model="end"
                                label="End Date"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                            v-model="end"
                            no-title
                            scrollable
                    >
                        <v-spacer></v-spacer>
                        <v-btn
                                text
                                color="primary"
                                @click="endMenu = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                                text
                                color="primary"
                                @click="$refs.endMenu.save(end)"
                        >
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <v-menu
                        ref="nowMenu"
                        v-model="nowMenu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="now"
                        transition="scale-transition"
                        min-width="290px"
                        offset-y
                        full-width
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                                v-model="today"
                                label="Today"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                            v-model="today"
                            no-title
                            scrollables
                    >
                        <v-spacer></v-spacer>
                        <v-btn
                                text
                                color="primary"
                                @click="nowMenu = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                                text
                                color="primary"
                                @click="$refs.nowMenu.save(now)"
                        >
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <v-text-field
                        v-if="type === 'custom-weekly'"
                        v-model="minWeeks"
                        label="Minimum Weeks"
                        type="number"
                ></v-text-field>
                <v-select
                        v-if="hasIntervals"
                        v-model="intervals"
                        :items="intervalsOptions"
                        label="Intervals"
                ></v-select>
                <v-select
                        :items="roomtypes"
                        v-model="roomtype"
                        label="Room Type"
                        v-on:close="updateRoomType"
                ></v-select>
            </v-flex>
            <v-flex
                    sm12
                    lg12
                    class="pa-3 mb-3 feature-pane"
            >

                <v-sheet height="1000">
                    <v-calendar
                            ref="calendar"
                            v-model="today"
                            :type="type"
                            :start="start"
                            :end="end"
                            :min-weeks="minWeeks"
                            :max-days="maxDays"
                            :now="today"
                            :value="today"
                            :dark="dark"
                            :weekdays="weekdays"
                            :first-interval="intervals.first"
                            :interval-minutes="intervals.minutes"
                            :interval-count="intervals.count"
                            :interval-height="intervals.height"
                            :show-interval-label="showIntervalLabel"
                            :color="color"
                    >
                        <template v-slot:day="{ date }">
                            <template v-for="event in eventsMap[date]">
                                <v-menu
                                        :key="event.name"
                                        v-model="event.open"
                                        full-width
                                        offset-x
                                >
                                    <template v-slot:activator="{ on }">
                                        <div
                                                v-if="!event.time"
                                                v-ripple
                                                class="my-event"
                                                v-on="on"
                                                v-html="event.name"
                                        ></div>
                                    </template>
                                    <v-card
                                            color="grey lighten-4"
                                            min-width="350px"
                                            text
                                    >
                                        <v-toolbar
                                                color="primary"
                                                dark
                                        >
                                            <v-btn icon>
                                                <v-icon>edit</v-icon>
                                            </v-btn>
                                            <v-toolbar-title v-html="event.name"></v-toolbar-title>
                                            <v-spacer></v-spacer>
                                            <v-btn icon>
                                                <v-icon>favorite</v-icon>
                                            </v-btn>
                                            <v-btn icon>
                                                <v-icon>more_vert</v-icon>
                                            </v-btn>
                                        </v-toolbar>
                                        <v-card-title primary-title>
                                            <span v-html="event.url"></span>
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-btn
                                                    text
                                                    color="secondary"
                                            >
                                                Cancel
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-menu>
                            </template>
                        </template>
                        <template v-slot:header="day">
                            <div
                                    v-if="day.weekday % 2"
                                    class="day-header"
                            >
                                day-header slot {{ day.date }}
                            </div>
                        </template>
                        <template v-slot:day-body="day">
                            <div
                                    v-if="day.weekday % 3 === 2"
                                    class="day-body"
                            >
                                day-body slot {{ day.date }}
                            </div>
                        </template>
                    </v-calendar>
                </v-sheet>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import apiRequests from '@/services/apiRequests.js'
    //import RoomDataTable from '@/components/RoomDataTable.vue'

    const weekdaysDefault = [0, 1, 2, 3, 4, 5, 6]

    const intervalsDefault = {
        first: 0,
        minutes: 60,
        count: 24,
        height: 40
    }


    export default {
        name: "Calender",
        components: {
            //RoomDataTable
        },
        data: () => ({
            dark: false,
            today: null,
            startMenu: false,
            start: '2019-01-12',
            endMenu: false,
            end: '2019-01-27',
            nowMenu: false,
            minWeeks: 1,
            now: null,
            type: 'month',
            roomtypes: [],
            roomtype: 'All',
            events: [],
            hotelid: JSON.parse(localStorage.getItem('user')).user.hotel_id,
            typeOptions: [
                {text: 'Day', value: 'day'},
                {text: '4 Day', value: '4day'},
                {text: 'Week', value: 'week'},
                {text: 'Month', value: 'month'},
                {text: 'Custom Daily', value: 'custom-daily'},
                {text: 'Custom Weekly', value: 'custom-weekly'}
            ],
            weekdays: weekdaysDefault,
            weekdaysOptions: [
                {text: 'Sunday - Saturday', value: weekdaysDefault},
                {text: 'Mon, Wed, Fri', value: [1, 3, 5]},
                {text: 'Mon - Fri', value: [1, 2, 3, 4, 5]},
                {text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0]}
            ],
            intervals: intervalsDefault,
            intervalsOptions: [
                {text: 'Default', value: intervalsDefault},
                {text: 'Workday', value: {first: 16, minutes: 30, count: 20, height: 40}}
            ],
            maxDays: 7,

            color: 'primary',

        }),

        watch: {
            today(newValue) {
                this.$store.dispatch('setToday', newValue)
            },
            roomtype(newValue) {
                this.$store.dispatch('setRoomType', newValue)
            }
        },
        created() {
            // get date from vuex
            this.today = this.$store.getters.today
            this.getRoomTypes()
            this.getEvents()
            this.updateRoomType()
        },
        methods: {
            updateRoomType() {
                this.$store.dispatch('setRoomType', this.roomtype)
            },
            getEvents() {
                console.log("=> download events...")
                apiRequests.getEvents()
                    .then(response => {
                        this.events = response.data.data
                        //console.log(response.data)
                    })
                    .catch(error => {
                        console.log('There was an error:' + error.response)
                    })
            },
            todayDate() {
                var today = new Date()
                var dd = today.getDate()

                var mm = today.getMonth() + 1
                var yyyy = today.getFullYear()
                if (dd < 10) {
                    dd = '0' + dd
                }

                if (mm < 10) {
                    mm = '0' + mm
                }
                today = yyyy + '-' + mm + '-' + dd
                return today
            },

            getSelectedCompetitorPrices() {
                console.log('started api request')
                apiRequests.getCompetitorAvgPrices()
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(error => {
                        console.log('There was an error:' + error.response)
                    })
            },
            showIntervalLabel(interval) {
                return interval.minute === 0
            },
            getRoomTypes() {
                apiRequests.getCompetitorPricesApex(this.hotelid, this.competitors, this.roomtype)
                    .then(response => {
                        this.myData = response.data.data
                        this.roomtypes = this.myData.rooms
                    })
            }
        },
        computed: {

            hasIntervals() {
                return this.type in {
                    'week': 1, 'day': 1, '4day': 1, 'custom-daily': 1
                }
            },
            hasEnd() {
                return this.type in {
                    'custom-weekly': 1, 'custom-daily': 1
                }
            },
            // convert the list of events into a map of lists keyed by date
            eventsMap() {
                const map = {}
                this.events.forEach(e => (map[e.event_date] = map[e.event_date] || []).push(e))
                return map
            }
        },

    }
</script>

<style lang="stylus" scoped>
    .my-event {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 2px;
        background-color: #1867c0;
        color: #ffffff;
        border: 1px solid #1867c0;
        width: 100%;
        font-size: 8px;
        padding: 3px;
        cursor: pointer;
        margin-bottom: 1px;
    }

    .feature-pane {
        position: relative;
        padding-top: 10px;
        box-shadow: 0 10px 10px rgba(63, 81, 181, 0.3);
        border-radius: 20px;

    }

    .day-header {
        margin: 0px 2px 2px 2px;
        padding: 2px 6px;
        background-color: #1867c0;
        color: #ffffff;
        border: 1px solid #1867c0;
        border-radius: 2px;
        user-select: none;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .day-body {
        position: absolute;
        top: 400px;
        height: 36px;
        margin: 2px;
        padding: 2px 6px;
        background-color: #1867c0;
        color: #ffffff;
        border: 1px solid #1867c0;
        border-radius: 2px;
        left: 0;
        right: 0;
        user-select: none;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .day {
        position: relative;
        height: 24px;
        margin: 0px;
        padding: 0px 6px;
        background-color: #1867c0;
        color: #fafafa;
        border: 1px solid #1867c0;
        border-radius: 2px;
        left: 0;
        right: 0;
        user-select: none;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

</style>