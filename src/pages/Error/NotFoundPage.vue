<template>
  <div class="error-page">
    <v-icon size="120">mdi-alert-circle-outline</v-icon>
    <h1 class="error-code">404</h1>
    <h2 class="error-title">페이지를 찾을 수 없습니다</h2>
    <p class="error-message">요청하신 페이지가 존재하지 않습니다.</p>
    <v-btn variant="outlined" size="large" @click="goHome">
      홈으로 돌아가기
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/pages/Error/NotFoundPage.scss";
</style>
