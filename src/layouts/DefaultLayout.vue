<template>
  <v-app>
    <!-- 네비게이션 바 -->
    <v-app-bar app color="primary" dark elevation="1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>My App</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- 사이드바 -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <!-- 1뎁스: 홈 -->
        <v-list-item to="/" title="홈" prepend-icon="mdi-home"></v-list-item>

        <!-- 1뎁스: 대시보드 (2뎁스 있음) -->
        <v-list-group value="dashboard">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-view-dashboard"
              title="대시보드"
            ></v-list-item>
          </template>

          <v-list-item
            to="/dashboard/overview"
            title="개요"
            prepend-icon="mdi-chart-line"
          ></v-list-item>
          <v-list-item
            to="/dashboard/analytics"
            title="분석"
            prepend-icon="mdi-google-analytics"
          ></v-list-item>
          <v-list-item
            to="/dashboard/reports"
            title="리포트"
            prepend-icon="mdi-file-chart"
          ></v-list-item>
        </v-list-group>

        <!-- 1뎁스: 관리 (2뎁스 있음) -->
        <v-list-group value="management">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-cog"
              title="관리"
            ></v-list-item>
          </template>

          <v-list-item
            to="/management/users"
            title="사용자 관리"
            prepend-icon="mdi-account-group"
          ></v-list-item>
          <v-list-item
            to="/management/settings"
            title="설정"
            prepend-icon="mdi-cog-outline"
          ></v-list-item>
        </v-list-group>

        <!-- 1뎁스: 에러페이지 -->
        <v-list-item
          to="/error"
          title="에러페이지"
          prepend-icon="mdi-alert-circle"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- 메인 컨텐츠 영역 -->
    <v-main>
      <v-container fluid>
        <router-view />
        <!-- 자식 라우트가 여기 렌더링 -->
      </v-container>
    </v-main>

    <!-- 푸터 -->
    <v-footer app>
      <span>&copy; 2025 My App</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: true, // 초기 상태: 열림
    };
  },
  methods: {
    logout() {
      this.$router.push("/auth/login");
    },
  },
};
</script>
