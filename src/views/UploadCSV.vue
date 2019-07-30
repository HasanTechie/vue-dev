<template>
    <v-container fluid grid-list-xl>
        <v-layout wrap align-center>
            <v-flex xs12 
                    sm12
                    lg12 
                    d-flex 
                    class="pa-3 mb-3 feature-pane"
            >

                <v-file-input
                        v-model="files"
                        color="indigo accent-4"
                        counter
                        label="Upload CSVs"
                        multiple
                        placeholder="Select your CSVs"
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
                    </template>
                </v-file-input>
            
                <v-btn color="success" @click="uploadCSVs">
                    <v-icon left>cloud_done</v-icon>
                    Upload CSVs
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap="">
            <v-flex
                    sm12
                    lg12
                    class="pa-3 mb-3 feature-pane"
            >
                <v-card color="primary">
                    <v-menu 
                        v-model="currentcapacity"
                    >
                        <template v-slot:activator="{ on }">
                            <v-btn
                            color="primary"
                            dark
                            v-on="on"
                            >
                            Select Current Capacity
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                            v-for="(item, index) in capacities"
                            :key="index"
                            @click="showCSV"
                            >
                                <v-list-item-title>{{ item.capacity }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card>
            </v-flex>
            <v-flex
                    sm12
                    lg12
                    class="pa-3 mb-3 feature-pane"
            ><v-data-table
                :headers="headers"
                :items="ratedata"
                :items-per-page="5"
                class="elevation-1"
            ></v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
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
                console.log('userid :' + this.userid)

                apiRequests.getProcessedCSVs(this.userid)
                .then(response => {
                    //console.log(response.data)
                    var responseDataArray = Object.keys(response.data.data).map((key) => {
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
                            obj.optprice = Number(jsonObj[i][this.currentcapacity][0]).toFixed(2)
                            console.log('jsonObj[0]: '+jsonObj[0][this.currentcapacity][0])

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
                    var responseDataArray = Object.keys(response.data.data).map((key) => {
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
                            let obj = {}
                            obj.capacity = (key)
                            capacities.push(obj)
                        }
                        //console.log(capacities[0].capacity)
                        // the last entry is the date...
                        capacities.pop()
                        this.capacities = capacities
                        this.currentcapacity = this.capacities[0].capacity
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
#csvtable {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .container {
        text-align: left;
    }
    pre code {
        background-color: #eee;
        border: 1px solid #999;
        display: block;
        padding: 20px;
    }
    #app .form {
        text-align: left;
    }
    .btn {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: .25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    .btn-primary {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
    }
</style>