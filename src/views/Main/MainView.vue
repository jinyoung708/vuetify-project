<template>
  <MainPage />
</template>

<script>
import { defineComponent } from "vue";

// Components
import MainPage from "@/pages/Main/MainPage.vue";

export default defineComponent({
  name: "MainView",

  components: {
    MainPage,
  },
});
</script>
