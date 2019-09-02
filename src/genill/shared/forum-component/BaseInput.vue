<template>
    <div>
        <input type="text" :value="value"
               @input="updateValue"
               v-bind="$attrs"
               v-on="listeners"
               class="inputfield">
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    inheritAttrs: false,
    props: {
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
  export default class BaseInput extends Vue {

  }
</script>

<style scoped>
    .inputfield {
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
    }
</style>
