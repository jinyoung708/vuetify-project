<template>
  <v-select
    v-bind="$attrs"
    :class="['custom-select', styleClass]"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    hide-details
    variant="outlined"
  />
</template>

<script>
export default {
  name: "CustomSelect",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Array, Object],
      default: null,
    },
    styleType: {
      type: String,
      default: "default", // default, rounded, minimal, filled
      validator: (value) =>
        ["default", "rounded", "minimal", "filled"].includes(value),
    },
  },
  emits: ["update:modelValue"],
  computed: {
    styleClass() {
      return `custom-select--${this.styleType}`;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/components/Select";
</style>
