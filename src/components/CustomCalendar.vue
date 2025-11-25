<template>
  <v-container class="calendar-container">
    <v-card max-width="400" class="mx-auto calendar-card" elevation="3">
      <v-card-text class="pa-0">
        <!-- 달력 헤더 -->
        <div class="calendar-nav">
          <v-btn
            icon
            @click="prevMonth"
            variant="text"
            color="white"
            aria-label="이전 달"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <div class="date-selector">
            <!-- 년도 선택 -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="text"
                  color="white"
                  class="selector-btn"
                >
                  {{ currentYear }}년
                  <v-icon size="small" class="ml-1">mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list max-height="300">
                <v-list-item
                  v-for="year in yearOptions"
                  :key="year"
                  @click="currentYear = year"
                  :active="currentYear === year"
                >
                  <v-list-item-title>{{ year }}년</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <!-- 월 선택 -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="text"
                  color="white"
                  class="selector-btn"
                >
                  {{ currentMonth }}월
                  <v-icon size="small" class="ml-1">mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="month in 12"
                  :key="month"
                  @click="currentMonth = month"
                  :active="currentMonth === month"
                >
                  <v-list-item-title>{{ month }}월</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <v-btn
            icon
            @click="nextMonth"
            variant="text"
            color="white"
            aria-label="다음 달"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>

        <!-- 요일 헤더 -->
        <div class="weekday-header">
          <div
            v-for="(day, idx) in WEEK_DAYS"
            :key="day"
            class="weekday-cell"
            :class="getWeekdayClass(idx)"
          >
            {{ day }}
          </div>
        </div>

        <!-- 날짜 그리드 -->
        <div class="calendar-grid">
          <template v-for="(dayObj, idx) in days" :key="idx">
            <!-- 빈 칸 -->
            <div v-if="!dayObj" class="date-cell-empty"></div>

            <!-- 날짜 버튼 -->
            <v-btn
              v-else
              :variant="isSelected(dayObj.date) ? 'elevated' : 'text'"
              :color="isSelected(dayObj.date) ? 'primary' : ''"
              class="date-cell"
              @click="selectedDate = dayObj.date"
              :class="getDateCellClass(dayObj.date)"
              :aria-label="getDateAriaLabel(dayObj.date)"
            >
              <span :class="getTextColor(dayObj.date)">
                {{ dayObj.date.getDate() }}
              </span>

              <!-- 이벤트 점 표시 -->
              <div v-if="getEvents(dayObj.date)" class="event-dots">
                <span
                  v-for="(event, evtIdx) in getEvents(dayObj.date).slice(0, 3)"
                  :key="evtIdx"
                  class="event-dot"
                  :style="{ backgroundColor: event.colorCode }"
                ></span>
              </div>
            </v-btn>
          </template>
        </div>

        <!-- 선택된 날짜 정보 -->
        <v-divider class="my-4 my-md-6"></v-divider>

        <div class="selected-date-info">
          <p class="info-label">선택된 날짜</p>
          <p class="selected-date-text">{{ formatDate(selectedDate) }}</p>

          <!-- 이벤트 리스트 -->
          <div
            v-if="getEvents(selectedDate)?.length > 0"
            class="events-section"
          >
            <p class="events-title">
              일정 ({{ getEvents(selectedDate).length }})
            </p>

            <v-card
              v-for="(event, idx) in getEvents(selectedDate)"
              :key="idx"
              class="event-card"
              elevation="0"
            >
              <div class="event-content">
                <span
                  class="event-indicator"
                  :style="{ backgroundColor: event.colorCode }"
                ></span>
                <div class="event-details">
                  <p class="event-label">{{ event.label }}</p>
                  <p class="event-time">{{ event.time }}</p>
                </div>
              </div>
            </v-card>
          </div>

          <p v-else class="no-events">이 날짜에는 예정된 일정이 없습니다.</p>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CustomCalendar",

  data() {
    const YEAR_RANGE = 10;
    const currentYearValue = new Date().getFullYear();

    return {
      WEEK_DAYS: ["일", "월", "화", "수", "목", "금", "토"],
      YEAR_RANGE,
      selectedDate: new Date(),
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),

      yearOptions: Array.from(
        { length: YEAR_RANGE * 2 + 1 },
        (_, i) => currentYearValue - YEAR_RANGE + i
      ),

      events: {
        "2025-11-15": [
          { colorCode: "#f44336", label: "팀 회의", time: "10:00 AM" },
        ],
        "2025-11-20": [
          { colorCode: "#2196F3", label: "프로젝트 마감", time: "6:00 PM" },
          { colorCode: "#9C27B0", label: "고객 미팅", time: "2:00 PM" },
        ],
        "2025-11-25": [{ colorCode: "#4CAF50", label: "연차", time: "종일" }],
        "2025-11-28": [
          { colorCode: "#FF9800", label: "워크샵", time: "9:00 AM" },
        ],
      },
    };
  },

  computed: {
    days() {
      const year = this.currentYear;
      const month = this.currentMonth - 1;

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const result = [];
      for (let i = 0; i < startingDayOfWeek; i++) {
        result.push(null);
      }
      for (let i = 1; i <= daysInMonth; i++) {
        result.push({ date: new Date(year, month, i) });
      }
      return result;
    },
  },

  methods: {
    formatDateKey(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    formatDate(date) {
      return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      }).format(date);
    },

    isToday(date) {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    },

    isSelected(date) {
      return date.toDateString() === this.selectedDate.toDateString();
    },

    getEvents(date) {
      return this.events[this.formatDateKey(date)] || null;
    },

    getTextColor(date) {
      if (this.isSelected(date)) return "text-white";
      if (date.getDay() === 0) return "text-red";
      if (date.getDay() === 6) return "text-blue";
      return "";
    },

    getWeekdayClass(idx) {
      if (idx === 0) return "text-red";
      if (idx === 6) return "text-blue";
      return "";
    },

    getDateCellClass(date) {
      return {
        "today-ring": this.isToday(date) && !this.isSelected(date),
        "has-events": this.getEvents(date)?.length > 0,
      };
    },

    getDateAriaLabel(date) {
      const dateStr = this.formatDate(date);
      const eventsCount = this.getEvents(date)?.length || 0;
      return eventsCount > 0 ? `${dateStr}, ${eventsCount}개의 일정` : dateStr;
    },

    prevMonth() {
      if (this.currentMonth === 1) {
        this.currentMonth = 12;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },

    nextMonth() {
      if (this.currentMonth === 12) {
        this.currentMonth = 1;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
  },
};
</script>

<style scoped>
.calendar-container {
  padding: 16px;
}

.calendar-card {
  border-radius: 16px !important;
}

.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 16px 20px;
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)) 0%,
    rgb(var(--v-theme-primary-darken-1)) 100%
  );
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.date-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.selector-btn {
  font-size: 1.125rem !important;
  font-weight: 700 !important;
  padding: 8px 12px !important;
}

.weekday-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
  padding: 0 4px;
}

.weekday-cell {
  text-align: center;
  padding: 12px 0;
  font-weight: 700;
  font-size: 0.875rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 4px;
  grid-auto-rows: 1fr;
}

/* 날짜 셀 — 100% 너비 + 정사각형 유지 */
.date-cell,
.date-cell-empty {
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  border-radius: 50% !important;
}

.date-cell {
  min-width: 0;
  height: 100%;
  transition: all 0.2s ease;
  font-weight: 600;
}

.date-cell.has-events {
  font-weight: 700;
}

.today-ring {
  border: 1px solid rgb(var(--v-theme-primary)) !important;
}

.event-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 3px;
}

.event-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.selected-date-info {
  padding: 20px;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 8px;
}

.selected-date-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #4527a0;
  margin: 0 0 20px 0;
}

.events-section {
  margin-top: 16px;
}

.events-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 12px;
}

.event-card {
  background: white !important;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px !important;
  margin-bottom: 8px;
  padding: 12px 16px;
}

.event-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.event-indicator {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 3px;
}

.event-details {
  flex: 1;
}

.event-label {
  font-weight: 700;
  color: rgba(0, 0, 0, 0.87);
  margin: 0 0 4px 0;
  font-size: 0.9375rem;
}

.event-time {
  font-size: 0.8125rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
}

.no-events {
  padding: 16px;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.5);
  font-style: italic;
  text-align: center;
}
</style>
