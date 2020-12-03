<template>
  <div class="mx-3">
    
    <section class="flex justify-between my-2 text-xl border-b">
      <h2> {{currentMonthName}} </h2>
      <h2> {{currentYear}} </h2>
    </section>

    <section class="day-names flex justify-start">
      <p 
        v-for="day in days"
        :key="day"
        class="p-2 w-10 h-10 text-center"
        :style="dayWidth"> {{day}} </p>
    </section> 

    <section class="numbers flex justify-start flex-wrap" style="height: 240px;">
      <p 
      v-for="num2 in daysInCurrentMonth+firstDayOfMonth"
      :key="num2"
      class="p-2 w-10 h-10 text-center border-white border-2"
      :style="dayWidth"
      :class="isCurrentDay(num) ? 'bg-blue-200' : ''">
        <span v-if="num2 > firstDayOfMonth"> {{ num2-firstDayOfMonth }} </span>
      </p>
    </section>

    <nav class="my-2 py-2 border-t flex justify-between">
      <button @click="prevMonth" class="px-3 py-1 bg-gradient-to-br h-11 text-lg  from-blue-700 to-teal-500 text-white w-3/12 hover:from-orange-500 hover:to-green-500"> Previous </button>
      <button @click="nextMonth" class="px-3 py-1 bg-gradient-to-br h-11 text-lg from-blue-700 to-teal-500 text-white w-3/12"> Next </button>
    </nav>

  </div>
</template>

<script>
export default {
  data() {
    return {
      days             : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      currentMonthIndex: new Date().getMonth(),
      currentYear      : new Date().getFullYear(),
      dayWidth         : 'width: ' + 100/7 + '%',
      currentDayOfMonth: new Date().getDate()
    }
  },
  methods: {
    prevMonth() {
      if (this.currentMonthIndex === 0) {
        this.currentYear--
        this.currentMonthIndex = 11
      } else {
        this.currentMonthIndex--
      }
      
    },
    nextMonth() {
      if (this.currentMonthIndex === 11) {
        this.currentYear++
        this.currentMonthIndex = 0
      } else {
        this.currentMonthIndex++
      }
    },
    isCurrentDay(num) {
      const currentIterationDate = new Date(this.currentYear, this.currentMonthIndex, num)
      const currentDate = new Date()
      return currentIterationDate === currentDate
    }
  },
  computed: {
    firstDayOfMonth() {
      return new Date(this.currentYear, this.currentMonthIndex, 1).getDay()
    },
    daysInCurrentMonth() {
      var d= new Date(this.currentYear, this.currentMonthIndex+1, 0);
      return d.getDate();
    },
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonthIndex).toLocaleString('default', { month: 'long' })
    }
  }
}
</script>

<style>

</style>