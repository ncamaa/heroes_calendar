<template>
  <div class="h-screen w-full flex items-center justify-center bg-gradient-to-tr from-yellow-500 to-purple-400">
    <div class="rounded bg-white border-gray-300 p-4 m-4 border sm:w-96 mx-auto">
    
      <section class="flex px-2 justify-between my-2 text-xl border-b">
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
        :class="isCurrentDay(num2) ? 'bg-blue-200' : ''">
          <span v-if="num2 > firstDayOfMonth"> {{ num2-firstDayOfMonth }} </span>
        </p>
      </section>
      
      <section>
        <nav class="my-2 py-2 border-t flex justify-between w-full">
          <button @click="prevMonth" class="px-3 py-1 bg-gradient-to-br h-11 text-lg  from-blue-700 to-blue-500 text-white w-3/12 hover:from-blue-700 hover:to-green-500"> Previous </button>
          <button @click="nextMonth" class="px-3 py-1 bg-gradient-to-br h-11 text-lg  from-blue-700 to-blue-500 text-white w-3/12 hover:from-blue-700 hover:to-green-500"> Next </button>
        </nav>
      </section>
    </div>
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
      currentDayOfMonth: new Date().getDate(),
      dateNow          : new Date(),
      yearNow          : new Date().getFullYear(),
      monthNow         : new Date().getMonth(),
      monthDayNow      : new Date().getDate()
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
      if (this.yearNow === this.currentYear)
        if (this.monthNow === this.currentMonthIndex)
          if (this.monthDayNow === num-2)
            return true
      return false
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