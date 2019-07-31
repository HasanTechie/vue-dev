<template>
    <v-layout row wrap >
            
            <v-flex d-flex 
                    xs12 
                    sm12 
                    md3
                    lg3 class="pa-3 mb-3 feature-pane">
                <v-container fluid grid-list-xl>
                    <v-layout wrap>
                        <v-flex d-flex >

                            <v-file-input
                            v-model="files"
                            color="indigo accent-4"
                            counter
                            label="Upload Occupancy"
                            multiple
                            placeholder="Select Your Occupancy Sheet"
                            prepend-icon="mdi-paperclip"
                            outlined
                            :display-size="1000"
                            >
                                <template v-slot:selection="{ index, text }">
                                    <v-chip
                                            v-if="index < 4"
                                            color="indigo accent-4"
                                            dark
                                            label
                                            small
                                    >
                                        {{ text }}
                                    </v-chip>

                                    <span
                                            v-else-if="index === 4"
                                            class="overline grey--text text--darken-3 mx-2"
                                    >
                                    +{{ files.length - 4 }} File(s)
                                    </span>
                                </teMplate>
                            </v-file-input>

                        </v-flex>
                        
                        <v-flex xs12 sm12 md12 lg12 d-flex>
                            <v-divider></v-divider>
                        </v-flex>

                        <v-flex xs12 sm12 md12 align-center="true">
                            <v-btn color="success" @click="uploadCSVs">
                                <v-icon left>cloud_done</v-icon>
                                Upload
                            </v-btn>
                        </v-flex>
                        <v-flex xs12 sm12 md12 d-flex>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex d-flex xs12 sm12 md12>
                            <v-select
                                :items="capacities"
                                v-model="currentcapacity"
                                label="Select Capacity"
                                v-on:close="showCSV"
                            ></v-select>
                            
                        </v-flex>
                        <v-flex xs12 sm12 md12 d-flex>
                            <v-divider ></v-divider>
                        </v-flex>
                    </v-layout>
                </v-container>

            </v-flex>
            <v-flex xs12 sm12 md9 lg9 class="pa-3 mb-3 feature-pane">
                <v-data-table
                    :headers="headers"
                    :items="ratedata"
                    :items-per-page="5"
                    class="elevation-1"
                ></v-data-table>
            </v-flex>
    </v-layout>
</template>

<script>
    import apiRequests from '@/services/apiRequests.js'
    //import VueCsvImport from '@/components/VueCsvImport.vue'
    //import axios from 'axios/index'

    export default {
        name: "UploadCSV",
        components: {
            //VueCsvImport
        },
         data() {
            return {
                files: [],
                capacities: [],
                currentcapacity: 20,
                csv: null,
                userid: JSON.parse(localStorage.getItem('user')).user.id,

                headers: [
                    { text: 'Date', sortable: true, value: 'date' },
                    { text: 'Optimal Price', sortable: false, value: 'optprice' },
                ],
                ratedata: [],
            }
        },
        methods: {
            uploadCSVs() {

                if (this.files.length) {

                    var form = new FormData

                    for (let i = 0; i < this.files.length; i++) {
                        form.append('CSVs[]', this.files[i])
                    }

                    this.files = [];
                    this.$store.dispatch('uploadCSVs', form).then(() => {
                    })
                }
            },
            processData(allText) {
                var allTextLines = allText.split(/\r\n|\n/);
                var headers = allTextLines[0].split(',');
                var lines = [];

                for (var i=1; i<allTextLines.length; i++) {
                    var data = allTextLines[i].split(',');
                    if (data.length == headers.length) {

                        var tarr = [];
                        for (var j=0; j<headers.length; j++) {
                            tarr.push(headers[j]+":"+data[j]);
                        }
                        lines.push(tarr);
                    }
                }
            },
            hello(){
                console.log('hello, you clicked me')
            },
            showCSV(){
                //console.log('userid :' + this.userid)

                apiRequests.getProcessedCSVs(this.userid)
                .then(response => {
                    //console.log(response.data)
                    var responseDataArray = Object.keys(
                                                response.data.data).map((key) => {
                                                    return response.data.data[key]
                                                })
                    console.log(String(responseDataArray[11]['file_url']))
                    
                    var request = require("request");
                    const csv=require('csvtojson')

                    var options = { 
                        method: 'GET',
                        url: 'https://cors-anywhere.herokuapp.com/'+
                        String(responseDataArray[11]['file_url'])
                    };

                    csv()
                    .fromStream(
                        request(options, function (error) {
                            if (error) throw new Error(error);})
                    )
                    .then((jsonObj)=>{
                        let ratedata = []
                        for (let i=0; i<jsonObj.length; i+=1) {
                            let obj = {}
                            obj.date = (jsonObj[i].field1),

                            obj.optprice =  Number(
                                                jsonObj[i][this.currentcapacity][0]
                                            ).toFixed(2)

                            console.log('jsonObj[0]: '+
                                jsonObj[0][this.currentcapacity][0])

                            ratedata.push(obj)
                        }
                        this.ratedata = ratedata
                    })
                })
                .catch(error => {
                    console.log('There was an error:' + error.response)
                })
            },
            getCapacities(){
                
                
                apiRequests.getProcessedCSVs(this.userid)
                .then(response => {
                    console.log(response.data)
                    var responseDataArray = Object.keys(
                                                response.data.data).map((key) => {
                                                    return response.data.data[key]
                                                })
                    console.log(String(responseDataArray[11]['file_url']))
                    
                    var request = require("request");
                    const csv=require('csvtojson')

                    var options = { 
                        method: 'GET',
                        url: 'https://cors-anywhere.herokuapp.com/'+
                        String(responseDataArray[11]['file_url'])
                    };

                    csv()
                    .fromStream(
                        request(options, function (error) {
                            if (error) throw new Error(error);})
                    )
                    .then((jsonObj)=>{
                        // here we finally build in the ratedata
                        
                        // rebuild the incoming data into something as above
                        // get all possible capacities
                        let capacities = []
                        for (var key in jsonObj[0]) {
                            capacities.push(key)
                        }
                        //console.log(capacities.capacity)
                        // the last entry is the date...
                        this.capacities = capacities
                        console.log("this.capacities[0]"+this.capacities[0])

                        this.currentcapacity = this.capacities[0]
                    })
                })
                .catch(error => {
                    console.log('There was an error:' + error.response)
                })

            }
        },
        created() {
            this.getCapacities()
            this.showCSV()
        },
        mounted() {
        
        },
        watch: {
            currentcapacity(newCapacity){
                console.log('capacity changed to:' + newCapacity)
                //this.getCompetitorAvPrices()
                this.showCSV()
                //this.getCompetitorRoomPrices()
            }
        }
    }
</script>

<style>

</style>