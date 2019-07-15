<template>
    <div>
        <v-container>
            <div class="uploader"
                 @dragenter="OnDragEnter"
                 @dragleave="OnDragLeave"
                 @dragover.prevent
                 @drop="onDrop"
                 :class="{ dragging: isDragging }">

                <div class="upload-control" v-show="images.length">
                    <label for="file">Select a file</label>
                    <button @click="upload">Upload</button>
                </div>


                <div v-show="!images.length">
                    <i class="fa fa-cloud-upload"></i>
                    <p>Drag your images here</p>
                    <div>OR</div>
                    <div class="file-input">
                        <label for="file">Select a file</label>
                        <input type="file" id="file" @change="onInputChange" multiple>
                    </div>
                </div>

                <div class="images-preview" v-show="images.length">
                    <div class="img-wrapper" v-for="(image, index) in images" :key="index">
                        <img :src="image" :alt="`Image Uplaoder ${index}`">
                        <div class="details">
                            <span class="name" v-text="files[index].name"></span>
                            <span class="size" v-text="getFileSize(files[index].size)"></span>
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Image",
        data() {
            return {
                isDragging: false,
                dragCount: 0,
                files: [],
                images: []
            }
        },
        methods: {
            OnDragEnter(e) {
                e.preventDefault();

                this.dragCount++;
                this.isDragging = true;
                return false;
            },
            OnDragLeave(e) {
                e.preventDefault();
                this.dragCount--;
                if (this.dragCount <= 0)
                    this.isDragging = false;
            },
        }
    }
</script>

<style scoped>

</style>