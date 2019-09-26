<template>
    <div>
        <img :src="profileImage">
        <form @submit.prevent="onUpload">
            <input type="file" @change="onFileSelected">
            <button type="submit">Upload</button>
        </form>
        {{imageSuccess}}
    </div>
</template>

<script lang="ts">
    import { getUsername } from '@/genill/core/Users/signin/signin.getters';
    import { Component, Vue } from 'vue-property-decorator';
    import axios from 'axios';
    import { uploadProfilePicture } from '../user/user.service';
    import { UserImageProfile } from '../user/User.model';
    import {getFullProfile} from "@/genill/core/Users/profile/profile.getters";

    @Component({})
    export default class FileUpload extends Vue {
        image = `/assets/Userpic/${getUsername()}/ProfilePictures/`;
        imageSuccess: string = '';
        selectedFile: any;

        public onFileSelected(event: any) {
            this.selectedFile = event.target.files[0];
        }

        get profileImage() {
            if(!this.imageSuccess) {
                return `${this.image}${this.currentProfileImage}`;
            }
            else {
                return `${this.image}${this.imageSuccess}`;
            }
        }

        onUpload() {
            let vm = this;
            const formData = new FormData();
            formData.set('username', getUsername());
            formData.append("image", this.selectedFile, this.selectedFile.name);
            axios.post(uploadProfilePicture(), formData).then(({data}) => {
                vm.imageSuccess = data;
            })
        }

        get currentProfileImage() {
            return getFullProfile().profilePicture;
        }
    }
</script>

<style scoped>
    .errorMessage {
        color: red;
    }
</style>
