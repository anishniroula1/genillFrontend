<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input type="text" :value="value" @input="updateValue" v-bind="$attrs" v-on="listeners" class="login-input">
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    inheritAttrs: false,
    props: {
      label: {
        type: String,
        default: '',
      },
      value: [String, Number],
    },
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: this.updateValue,
        };
      },
    },
    methods: {
      updateValue(event) {
        this.$emit('input', event.target.value);
      },
    },
  })
  export default class EmailInput extends Vue {

  }
</script>

<style scoped>
  .login-input {
    width: 100%;
    font-size: 16px;
    padding: 12px 16px;
    outline: 0;
    border-radius: 3px;
    border: 1px solid lightgrey;
  }
</style>
