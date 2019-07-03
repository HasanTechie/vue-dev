
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
    //import Chart from '@/components/Chart.vue';

    export default {
        name: 'Monthly',
        components: {
            Calender,
            //Chart,
            //DataTable, 
            RoomDataTable
        }
    }
</script>

<style scoped>

</style>