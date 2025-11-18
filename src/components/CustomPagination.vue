<template>
  <v-pagination
    v-bind="$attrs"
    :class="['custom-pagination', styleClass]"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  ></v-pagination>
</template>

<script>
export default {
  name: "CustomPagination",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
    styleType: {
      type: String,
      default: "default", // default, rounded, minimal
      validator: (value) => ["default", "rounded", "minimal"].includes(value),
    },
  },
  emits: ["update:modelValue"],
  computed: {
    styleClass() {
      return `custom-pagination--${this.styleType}`;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/components/Pagination";
</style>
