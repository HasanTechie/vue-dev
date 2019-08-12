<template>
    <v-container fluid grid-list-xl>
        <v-alert
                dismissible
                border="top"
                colored-border
                type="info"
                elevation="2"
        >
            Upload your Hotel's images.
        </v-alert>
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
            }
        },
        methods: {
            uploadImages() {

                if (this.files.length) {

                    var form = new FormData

                    for (let i = 0; i < this.files.length; i++) {
                        form.append('images[]', this.files[i])
                    }

                    this.files = [];
                    this.$store.dispatch('uploadImagesToServer', form).then(() => {
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>