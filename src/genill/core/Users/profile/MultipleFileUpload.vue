<template>
    <div>
        <form @submit.prevent="onUpload">
            <input type="file" @change="onFileSelected" multiple accept="image/*,video/mp4">
            <input type="text" v-model="albumname">
            <button type="submit">Upload</button>
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
    albumname: string = '';
    selectedFile: any;

    public onFileSelected(event: any) {
      console.log(event);
      this.selectedFile = event.target.files;
    }

    onUpload() {
      const formData = new FormData();
      formData.set('username', getUsername());
      formData.set('albumname', this.albumname);

      for( var i = 0; i < this.selectedFile.length; i++ ){
        let file = this.selectedFile[i];

        formData.append('image', file, file.name);
      }
      axios.post(uploadUserAlbum(), formData).then(({data}) => {
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
