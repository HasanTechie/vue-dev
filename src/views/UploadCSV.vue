<template>
    <v-container fluid grid-list-xl>
        <v-layout wrap align-center>
            <v-flex xs12 sm3 d-flex>

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
            </v-flex>
            <v-flex xs12 sm3 d-flex>
                <v-btn color="success" @click="uploadCSVs">
                    <v-icon left>cloud_done</v-icon>
                    Upload CSVs
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
                files: [],
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
            }
        }
    }
</script>

<style scoped>

</style>