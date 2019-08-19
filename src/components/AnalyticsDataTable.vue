<template>
    <v-data-table
            :headers="headers"
            :items="desserts"
            :sort-by="['calories', 'fat']"
            :sort-desc="[false, true]"
            multi-sort
            class="elevation-1"
    ></v-data-table>
</template>

<script>
    export default {
        name: "AnalyticsDataTable"
    }
</script>

<style scoped>

</style>