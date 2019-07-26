<template>
    <v-container fluid grid-list-xl>
        <v-layout wrap align-center>
            <v-flex xs12 sm3 d-flex>

                <v-file-input
                        v-model="files"
                        color="indigo accent-4"
                        counter
                        label="Upload CSV"
                        multiple
                        placeholder="Select your CSV"
                        prepend-icon="mdi-paperclip"
                        outlined
                        :display-size="1000"
                >
                    <template v-slot:selection="{ index, text }">
                        <v-chip
                                v-if="index < 2"
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
            </v-flex>
            <v-flex xs12 sm3 d-flex>
                <v-btn color="success" @click="uploadCSV">
                    <v-icon left>cloud_done</v-icon>
                    Upload CSV
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "UploadCSV",
        data() {
            return {
                files: []
            }
        },
        methods: {
            uploadCSV(){

            }
        }
    }
</script>

<style scoped>

</style>