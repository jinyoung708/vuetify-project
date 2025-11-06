<template>
  <NotFoundPage />
</template>

<script>
import { defineComponent } from "vue";

// Components
import NotFoundPage from "@/pages/Error/NotFoundPage.vue";

export default defineComponent({
  name: "NotFoundView",

  components: {
    NotFoundPage,
  },
});
</script>
