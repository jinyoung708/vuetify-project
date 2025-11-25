<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <v-btn icon @click="prevMonth">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span>{{ currentYear }}년 {{ currentMonth }}월</span>
        <v-btn icon @click="nextMonth">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <!-- 요일 헤더 -->
        <div class="calendar-grid">
          <div v-for="day in weekDays" :key="day" class="calendar-header">
            {{ day }}
          </div>
        </div>

        <!-- 날짜 그리드 -->
        <div class="calendar-grid">
          <div
            v-for="(date, index) in calendarDates"
            :key="index"
            class="calendar-cell"
            :class="{ 'other-month': !date.isCurrentMonth }"
          >
            <div class="date-number">{{ date.day }}</div>

            <!-- 이벤트 막대 -->
            <div class="events-container">
              <div
                v-for="(event, eventIndex) in date.visibleEvents"
                :key="eventIndex"
                class="event-slot"
              >
                <div
                  v-if="event"
                  class="event-bar"
                  :class="{
                    'event-start': event.isStart,
                    'event-row-start': event.isRowStartContinue,
                    'event-middle': event.isMiddle,
                    'event-end': event.isEnd,
                  }"
                  :style="{
                    backgroundColor: event.color,
                  }"
                  :data-event-id="event.id"
                  @mouseenter="highlightEvent(event.id)"
                  @mouseleave="unhighlightEvent(event.id)"
                >
                  <span v-if="event.showTitle" class="event-title">{{
                    event.title
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "MonthlyCalendar",
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      weekDays: ["일", "월", "화", "수", "목", "금", "토"],
      events: [
        {
          id: 1,
          title: "프로젝트 회의",
          startDate: "2025-11-06",
          endDate: "2025-11-07",
          color: "#2196F3",
        },
        {
          id: 2,
          title: "출장",
          startDate: "2025-11-08",
          endDate: "2025-11-10",
          color: "#4CAF50",
        },
        {
          id: 3,
          title: "휴가",
          startDate: "2025-11-15",
          endDate: "2025-11-18",
          color: "#FF9800",
        },
        {
          id: 4,
          title: "팀 빌딩",
          startDate: "2025-11-08",
          endDate: "2025-11-20",
          color: "#E91E63",
        },
        {
          id: 5,
          title: "미팅",
          startDate: "2025-11-12",
          endDate: "2025-11-12",
          color: "#6d36d9",
        },
      ],
    };
  },
  computed: {
    calendarDates() {
      const year = this.currentYear;
      const month = this.currentMonth;

      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);
      const startWeekDay = firstDay.getDay();
      const daysInMonth = lastDay.getDate();

      const dates = [];

      // 이전 달 날짜
      const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
      for (let i = startWeekDay - 1; i >= 0; i--) {
        dates.push({
          day: prevMonthLastDay - i,
          isCurrentMonth: false,
          date: new Date(year, month - 2, prevMonthLastDay - i),
          visibleEvents: [],
        });
      }

      // 현재 달 날짜
      for (let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(year, month - 1, i);
        dates.push({
          day: i,
          isCurrentMonth: true,
          date: currentDate,
          visibleEvents: [],
        });
      }

      // 다음 달 날짜
      const remainingCells = 42 - dates.length;
      for (let i = 1; i <= remainingCells; i++) {
        dates.push({
          day: i,
          isCurrentMonth: false,
          date: new Date(year, month, i),
          visibleEvents: [],
        });
      }

      // 이벤트를 행별로 배치
      this.placeEventsInRows(dates);

      return dates;
    },
  },
  methods: {
    placeEventsInRows(dates) {
      const year = this.currentYear;
      const month = this.currentMonth;

      // 각 이벤트의 행 위치를 추적
      const eventRows = new Map();
      let currentRow = 0;

      this.events.forEach((event) => {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);

        // 이벤트가 현재 월과 겹치는지 확인
        const monthStart = new Date(year, month - 1, 1);
        const monthEnd = new Date(year, month, 0);

        if (endDate >= monthStart && startDate <= monthEnd) {
          // 이 이벤트가 들어갈 수 있는 행 찾기
          let row = 0;
          let placed = false;

          while (!placed) {
            let canPlace = true;

            // 현재 행에 이미 배치된 이벤트와 겹치는지 확인
            for (let [existingEvent, existingRow] of eventRows) {
              if (existingRow === row) {
                const existingStart = new Date(existingEvent.startDate);
                const existingEnd = new Date(existingEvent.endDate);

                if (!(endDate < existingStart || startDate > existingEnd)) {
                  canPlace = false;
                  break;
                }
              }
            }

            if (canPlace) {
              eventRows.set(event, row);
              placed = true;
              currentRow = Math.max(currentRow, row);
            } else {
              row++;
            }
          }
        }
      });

      // 각 날짜에 이벤트 배치
      dates.forEach((dateObj) => {
        const dateStr = this.formatDate(dateObj.date);
        const dayEvents = [];

        // 모든 행에 대해 빈 슬롯 생성
        for (let i = 0; i <= currentRow; i++) {
          dayEvents.push(null);
        }

        // 해당 날짜의 이벤트 배치
        this.events.forEach((event) => {
          if (dateStr >= event.startDate && dateStr <= event.endDate) {
            const row = eventRows.get(event);
            const isStart = dateStr === event.startDate;
            const isEnd = dateStr === event.endDate;
            const isMiddle = !isStart && !isEnd;

            // 주의 시작인지 확인 (각 row의 첫번째 날)
            const dayOfWeek = dateObj.date.getDay();
            const isRowStart = dayOfWeek === 0; // 일요일

            // 이벤트 시작이거나 row의 시작인 경우 제목 표시
            const showTitle = isStart || (isRowStart && isMiddle);

            // 실제 시작인지, row의 시작인지 구분
            const isRealStart = isStart;
            const isRowStartContinue = isRowStart && isMiddle;

            dayEvents[row] = {
              id: event.id,
              title: event.title,
              color: event.color,
              showTitle: showTitle,
              isStart: isRealStart,
              isRowStartContinue: isRowStartContinue,
              isMiddle: isMiddle && !isRowStart,
              isEnd: isEnd,
            };
          }
        });

        dateObj.visibleEvents = dayEvents;
      });
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
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
    highlightEvent(eventId) {
      const eventBars = document.querySelectorAll(
        `[data-event-id="${eventId}"]`
      );
      eventBars.forEach((bar) => {
        bar.classList.add("event-highlighted");
      });
    },
    unhighlightEvent(eventId) {
      const eventBars = document.querySelectorAll(
        `[data-event-id="${eventId}"]`
      );
      eventBars.forEach((bar) => {
        bar.classList.remove("event-highlighted");
      });
    },
  },
};
</script>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
  background-color: #e0e0e0;
  border: 1px solid #e0e0e0;
}

.calendar-header {
  background-color: #f5f5f5;
  padding: 12px;
  text-align: center;
  font-weight: bold;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.calendar-header:last-child {
  border-right: none;
}

.calendar-cell {
  background-color: white;
  min-height: 100px;
  padding: 4px;
  padding-left: 0;
  padding-right: 0;
  position: relative;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  overflow: visible;
}

.calendar-cell:nth-child(7n) {
  border-right: none;
}

.calendar-cell.other-month {
  background-color: #fafafa;
  color: #bdbdbd;
}

.date-number {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  padding-left: 4px;
}

.events-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.event-slot {
  height: 20px;
  width: 100%;
  margin-bottom: 2px;
}

.event-bar {
  padding: 2px 4px;
  font-size: 12px;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
}

.event-bar.event-start {
  border-radius: 3px 0 0 3px;
  padding-left: 8px;
  margin-left: 5px;
  width: calc(100% - 5px);
}

.event-bar.event-row-start {
  border-radius: 0;
  padding-left: 8px;
}

.event-bar.event-middle {
  border-radius: 0;
  padding-left: 4px;
  padding-right: 4px;
  width: calc(100% + 2px);
  margin-left: -1px;
}

.event-bar.event-end {
  border-radius: 0 3px 3px 0;
  padding-right: 8px;
  width: calc(100% - 4px);
  margin-left: -1px;
  margin-right: 5px;
}

.event-bar.event-start.event-end {
  border-radius: 3px;
  padding-left: 8px;
  padding-right: 8px;
  margin-left: 5px;
  margin-right: 5px;
  width: calc(100% - 10px);
}

.event-bar:hover,
.event-bar.event-highlighted {
  opacity: 0.8;
}

.event-title {
  font-weight: 500;
}
</style>
