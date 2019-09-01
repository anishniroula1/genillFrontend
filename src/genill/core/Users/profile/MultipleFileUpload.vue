<template>
    <div>
        <form @submit.prevent="onUpload">
            <input type="file" @change="onFileSelected" multiple accept="image/*,video/mp4"><br>
            <input type="text" v-model="albumname"><br>
            <progress :value="percent" max="100"></progress>{{percent}}%<br>
            <br>
            <button type="submit">Upload</button><br>
            {{message}}
        </form>
    </div>
</template>

<script lang="ts">
    import { getUsername } from '@/genill/core/Users/signin/signin.getters';
    import { Component, Vue } from 'vue-property-decorator';
    import axios from 'axios';
    import { uploadUserAlbum } from '../user/user.service';

    @Component({})
    export default class example extends Vue{
        percent: number = 0;
        albumname: string = '';
        message: string = '';
        selectedFile: any;

        public onFileSelected(event: any) {
            this.selectedFile = event.target.files;
        }

        onUpload() {
            let _this = this;
            const formData = new FormData();
            formData.set('username', getUsername());
            formData.set('albumname', this.albumname);

            for( var i = 0; i < this.selectedFile.length; i++ ){
                let file = this.selectedFile[i];

                formData.append('image', file, file.name);
            }
            axios.post(uploadUserAlbum(), formData, {
                onUploadProgress: function(uploadEvent) {
                    _this.percent = Math.round((uploadEvent.loaded / uploadEvent.total)*100);
                }
            }).then(({data}) => {
                _this.message = data;
            }).catch(() => {
                this.message = 'Problem Occur During Uploading Please try again';
            })
        }
    }
</script>

<style scoped>
    .errorMessage {
        color: red;
    }
</style>
