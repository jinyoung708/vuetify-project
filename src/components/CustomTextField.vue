<template>
  <v-text-field v-bind="$attrs" :class="['custom-text-field', styleClass]" />
</template>

<script>
export default {
  name: "CustomTextField",
  inheritAttrs: false,
  props: {
    styleType: {
      type: String,
      default: "default", // default, rounded, minimal, filled
      validator: (value) =>
        ["default", "rounded", "minimal", "filled"].includes(value),
    },
  },
  computed: {
    styleClass() {
      return `custom-text-field--${this.styleType}`;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/components/TextField";
</style>
