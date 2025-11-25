<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mb-10">
        <v-img
          :src="require('@/assets/images/svg/common/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-10">
        <CustomTextField
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          class="mb-4"
        />

        <CustomPagination
          v-model="page"
          :length="15"
          :total-visible="6"
          styleType="rounded"
          class="mb-8"
        />

        <CustomSelect
          v-model="selected"
          :items="['사과', '바나나', '오렌지']"
          placeholder="과일 선택"
        />
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-row justify="center">
          <CustomCalendar />
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <v-row justify="center">
          <MonthlyCalendar />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CustomPagination from "@/components/CustomPagination.vue";
import CustomTextField from "@/components/CustomTextField.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import CustomCalendar from "@/components/CustomCalendar.vue";
import MonthlyCalendar from "@/components/MonthlyCalendar.vue";

export default {
  name: "MainPage",
  components: {
    CustomTextField,
    CustomPagination,
    CustomSelect,
    CustomCalendar,
    MonthlyCalendar,
  },
  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader/tree/next",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify/tree/next",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
    ],
    importantLinks: [
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com",
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify",
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs",
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify",
      },
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Roadmap",
        href: "https://vuetifyjs.com/introduction/roadmap/",
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
    page: 1,
    selected: null,
  }),
};
</script>
