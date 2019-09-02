<template>
    <div>
        <button type="submit" v-on="$listeners" v-bind="$attrs" class="button" :class="buttonClass"><slot/></button>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component({
        inheritAttrs: false,
    })
    export default class BaseButton extends Vue {
        @Prop() buttonClass: string | undefined;
    }
</script>

<style scoped>
    .button {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        height: 2em;
        padding: 0 40px;
        background: transparent;
        border: none;
        border-radius: 6px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        white-space: nowrap;
        transition: all 0.2s linear;
    }
    .button:hover {
        -webkit-transform: scale(1.02);
        transform: scale(1.02);
        box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .button:active {
        -webkit-transform: scale(1);
        transform: scale(1);
        box-shadow: none;
    }
    .button:focus {
        outline: 0;
    }
    .button.-fill-gradient {
        background: linear-gradient(to right, #1b3c13, #7d395c);
        color: #ffffff;
    }
    .button:disabled {
        -webkit-transform: scale(1);
        transform: scale(1);
        box-shadow: none;
        background: #eeeeee;
    }
    .button + .button {
        margin-left: 1em;
    }
    .button.-fill-gray {
        background: rgba(0, 0, 0, 0.5);
        color: #ffffff;
    }
    .button.-size-small {
        height: 32px;
    }
    .button.-icon-right {
        text-align: left;
        padding: 0 20px;
    }
    .button.-icon-right > .icon {
        margin-left: 10px;
    }
    .button.-icon-left {
        text-align: right;
        padding: 0 20px;
    }
    .button.-icon-left > .icon {
        margin-right: 10px;
    }
    .button.-icon-center {
        padding: 0 20px;
    }
</style>
