<template>
    <div class="pa-2">
        <v-data-table
                :headers="headers"
                :items="tableData"
                :items-per-page="12"
                :sort-desc="[false, true]"
                multi-sort
                class="elevation-1"
        ></v-data-table>
    </div>
</template>

<script>
    export default {
        name: "AnalyticsDataTable",
        props: {
            myDataTableAllDates: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                headers: this.myDataTableAllDates.headers,
                tableData: this.myDataTableAllDates.tableData
            }
        },
        created() {
            this.testingMethod()
        },
        methods: {
            testingMethod() {
                // console.log(typeof this.tableData)
                // console.log(typeof this.myDataTableAllDates.tableData)
                // console.log(this.myDataTableAllDates.tableData)
            }
        }
    }
</script>

<style scoped>

</style>