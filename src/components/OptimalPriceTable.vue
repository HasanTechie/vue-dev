<template>
<div>
  <div class="container">
    <div class="panel panel-sm">
      <div class="panel-heading"> 
        <h4>Optimal Price List, Last Update: 10/08/2019 </h4>
      </div>
      <div class="panel-body">
        <div class="form-group">
        
        <vue-csv-import url="/url/to/post" :map-fields="['array', 'of', 'field', 'names']"></vue-csv-import>
  
        </div>    
      </div>
    </div>
  </div>
</div>
</template>

<script>
    import { VueCsvImport } from 'vue-csv-import'
    export default {
        name: "CSVImport",
        components: { VueCsvImport },
        data() {
            return {
                channel_name: '',
                channel_fields: [],
                channel_entries: [],
                parse_header: [],
                parse_csv: [],
                sortOrders:{},
                sortKey: '',
                mockheaders: [
                    {
                        text: 'Date',
                        align: 'left',
                        sortable: false,
                        value: 'date',
                    },
                    { text: 'Room Categroy', value: 'category' },
                    { text: 'Optimal Price', value: 'optprice' },
                ],
                mockitems: [
                    {
                        date: '11/08/2019',
                        category: 'Superior Room',
                        optprice: 80.9,
                    },
                    {
                        date: '12/084/2019',
                        category: 'Superior Room',
                        optprice: 55.1,
                    },
                    {
                        date: '13/08/2019',
                        category: 'Superior Room',
                        optprice: 64.5,
                    },
                    {
                        date: '14/08/2019',
                        category: 'Superior Room',
                        optprice: 60.8,
                    },
                    {
                        date: '15/08/2019',
                        category: 'Superior Room',
                        optprice: 60.8,
                    },
                    {
                        date: '16/08/2019',
                        category: 'Superior Room',
                        optprice: 80.6,
                    },
                    {
                        date: '17/084/2019',
                        category: 'Superior Room',
                        optprice: 81.4,
                    },
                    {
                        date: '18/08/2019',
                        category: 'Superior Room',
                        optprice: 84.3,
                    },
                    {
                        date: '19/08/2019',
                        category: 'Superior Room',
                        optprice: 66.9,
                    },
                    {
                        date: '20/08/2019',
                        category: 'Superior Room',
                        optprice: 50.6,
                    },
                ],
            }
        },
        filters: {
            capitalize: function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
            }
        },
        methods: {
            sortBy: function (key) {
                var vm = this
                vm.sortKey = key
                vm.sortOrders[key] = vm.sortOrders[key] * -1
            },
            csvJSON(csv){
                var vm = this
                var lines = csv.split("\n")
                var result = []
                var headers = lines[0].split(",")
                vm.parse_header = lines[0].split(",") 
                lines[0].split(",").forEach(function (key) {
                    vm.sortOrders[key] = 1
            })
            
            lines.map(function(line, indexLine){
                if (indexLine < 1) return // Jump header line
                
                var obj = {}
                var currentline = line.split(",")
                
                headers.map(function(header, indexHeader){
                obj[header] = currentline[indexHeader]
                })
                
                result.push(obj)
            })
            
            result.pop() // remove the last item because undefined values
            
            return result // JavaScript object
            },
            loadCSV(e) {
                var vm = this
                if (window.FileReader) {
                    var reader = new FileReader()
                    reader.readAsText(e.target.files[0])
                    // Handle errors load
                    reader.onload = function(event) {
                        var csv = event.target.result
                        vm.parse_csv = vm.csvJSON(csv)
                    }
                    reader.onerror = function(evt) {
                        if(evt.target.error.name == "NotReadableError") {
                            alert("Can not read file !")
                        }
                    }
                } else {
                    alert('FileReader are not supported in this browser.')
                }
            }
        }
    }
</script>
<style scoped>
    html, body {
        margin: 0;
        padding: 0;
    }
    body {
        margin: 32px auto;
    }
    .panel {
        border: 2px solid #dfdfdf;
        box-shadow: rgba(0, 0, 0, 0.15) 0 1px 0 0;
        margin: 10px;
    } 
    .panel.panel-sm {
        max-width: 700px;
        margin: 10px auto;
    }
    .panel-heading {
        border-bottom: 2px solid #dfdfdf;
    }
        .panel-heading h1, .panel-heading h2, .panel-heading h3, .panel-heading h4, .panel-heading h5, .panel-heading h6 {
        margin: 0;
        padding: 0;
    }
        .panel-body .checkbox-inline {
        padding: 15px 20px;
    }
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>
