<template>
    <div>
        <v-container fulid>
            <Calender/>
            <RoomDataTable/>
        </v-container>

    </div>
</template>

<script>
    import Calender from '@/components/Calender.vue'
    //import DataTable from '@/components/DataTable.vue';
    import RoomDataTable from '@/components/RoomDataTable.vue';

    export default {
        name: 'Monthly',
        components: {
            Calender,
            //DataTable, 
            RoomDataTable
        }
    }
</script>

<style scoped>

</style>