<template>
  <ErrorPage />
</template>

<script>
import { defineComponent } from "vue";

// Components
import ErrorPage from "../pages/Error/ErrorPage.vue";

export default defineComponent({
  name: "ErrorView",

  components: {
    ErrorPage,
  },
});
</script>
