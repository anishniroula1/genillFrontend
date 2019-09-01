<template>
    <div>
        <input type="hidden"
               :value="value"
               @input="updateValue"
               v-bind="$attrs"
        />
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class Hiddeninput extends Vue{
    inheritAttrs!: false;
    @Prop() value!: [string, number];

    public updateValue(event: any) {
      this.$emit('input', event.target.value)
    }
  }
</script>

<style scoped>

</style>
