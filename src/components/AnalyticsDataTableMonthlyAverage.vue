<template>
    <div class="pa-2">
        <v-data-table
                :headers="headers"
                :items="tableData"
                :sort-desc="[false, true]"
                multi-sort
                class="elevation-1"
        ></v-data-table>
    </div>
</template>

<script>
    export default {
        name: "AnalyticsDataTableMonthlyAverage",
        props: {
            myDataTableMonthlyAverage: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                headers: this.myDataTableMonthlyAverage.headers,
                tableData: this.myDataTableMonthlyAverage.tableData,
            }
        },
        created() {
            this.testingMethod()
        },
        methods: {
            testingMethod() {
                // console.log(typeof this.tableData)
                // console.log(typeof this.myDataTableAllDates.tableData)
                // console.log(this.myDataTableMonthlyAverage.tableData)
            }
        }
    }
</script>

<style scoped>

</style>