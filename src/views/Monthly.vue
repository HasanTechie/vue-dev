<template>
    <div>
        <v-container class="my-4">
            <h1 class="display-2 mb-2 font-weight-light">Monthly View</h1>
            <v-layout wrap>
                <v-flex
                        xs12
                        class="mb-3"
                >
                    <v-sheet height="500">
                        <v-calendar
                                ref="calendar"
                                v-model="start"
                                :type="type"
                                :end="end"
                                color="primary"
                        ></v-calendar>
                    </v-sheet>
                </v-flex>

                <v-flex
                        sm6
                        xs12
                        class="text-sm-left text-xs-center"
                >
                    <v-btn @click="$refs.calendar.prev()">
                        <v-icon
                                dark
                                left
                        >
                            keyboard_arrow_left
                        </v-icon>
                        Prev
                    </v-btn>
                </v-flex>
<!--                <v-flex-->
<!--                        sm4-->
<!--                        xs12-->
<!--                        class="text-xs-center"-->
<!--                >-->
<!--                    &lt;!&ndash;                    <v-select&ndash;&gt;-->
<!--                    &lt;!&ndash;                            v-model="type"&ndash;&gt;-->
<!--                    &lt;!&ndash;                            :items="typeOptions"&ndash;&gt;-->
<!--                    &lt;!&ndash;                            label="Type"&ndash;&gt;-->
<!--                    &lt;!&ndash;                    ></v-select>&ndash;&gt;-->
<!--                </v-flex>-->
                <v-flex
                        sm6
                        xs12
                        class="text-sm-right text-xs-center"
                >
                    <v-btn @click="$refs.calendar.next()">
                        Next
                        <v-icon
                                right
                                dark
                        >
                            keyboard_arrow_right
                        </v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'monthly',
        data: () => ({
            type: 'month',
            start: '2019-04-12',
            end: '2019-12-31',
            // typeOptions: [
            //     {text: 'Day', value: 'day'},
            //     {text: '4 Day', value: '4day'},
            //     {text: 'Week', value: 'week'},
            //     {text: 'Month', value: 'month'},
            // ]
        })
    }
</script>

<style scoped>

</style>