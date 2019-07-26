<template>
    <v-container fluid grid-list-xl>
        <v-layout wrap align-center>
            <v-flex xs12 sm3 d-flex>

                <v-file-input
                        v-model="files"
                        color="indigo accent-4"
                        counter
                        label="Upload Images"
                        multiple
                        placeholder="Select your images"
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
                <v-btn color="success" @click="uploadImages">
                    <v-icon left>cloud_done</v-icon>
                    Upload Images
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "UploadImage",
        data() {
            return {
                files: [],
                form: new FormData
            }
        },
        methods: {
            uploadImages() {


                this.form.append('picture',this.files[0])

                this.$store.dispatch('uploadImages', {
                   form : this.form
                }).then(() => {
                    // location.reload()
                })
                // console.log(this.files[0])
            }
        }
    }
</script>

<style scoped>

</style>