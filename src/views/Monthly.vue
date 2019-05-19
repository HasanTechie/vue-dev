<template>
    <div>
        <v-container fulid>
            <Calender/>
            <DataTable/>
        </v-container>

    </div>
</template>

<script>
    import Calender from '@/components/Calender.vue'
    import DataTable from '@/components/DataTable.vue';

    export default {
        name: 'Monthly',
        components: {
            Calender, DataTable
        }
    }
</script>

<style scoped>

</style>