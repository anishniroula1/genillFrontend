<template>
    <div>
        <form @submit.prevent="onUpload">
            <input type="file" @change="onFileSelected">
            <button type="submit">Upload</button>
        </form>
    </div>
</template>

<script lang="ts">
  import { getUsername } from '@/genill/core/Users/signin/signin.getters';
  import { Component, Vue } from 'vue-property-decorator';
  import axios from 'axios';
  import { uploadProfilePicture } from '../user/user.service';
  import { UserImageProfile } from '../user/User.model';

  @Component({})
  export default class example extends Vue {
    userProfile = {} as UserImageProfile;
    selectedFile: any;

    public onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }

    onUpload() {
      const formData = new FormData();
      formData.set('username', getUsername());
      formData.append("image", this.selectedFile, this.selectedFile.name);
      axios.post(uploadProfilePicture(), formData).then(({data}) => {
        console.log(data)
      })
    }
  }
</script>

<style scoped>
    .errorMessage {
        color: red;
    }
</style>
