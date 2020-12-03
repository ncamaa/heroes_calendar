<template>
  <h1 class="my-4 text-center text-xl">Calculator</h1>
  <div class="wrapper">
    <div id="calculator" class="w-10/12 mx-auto p-3 max-w-md">
      <div class="border-gray-400 border-b text-gray-800 text-3xl w-full p-3 mb-1 flex justify-end">
      {{currentValue}} </div>
      <small class="text-gray-600 w-full p-1 mb-1 h-8 flex justify-end items-center pr-4">
        {{showString}} </small>
      <div class="grid gap-2 grid-cols-4">
        <div class="numbers col-span-3">
          <div class="grid grid-cols-3 gap-2">
            <button @click="sendNum(num)" v-for="num in 9" :key="num" class="col-span-1" :class="defaultBtnClass">
              {{num}}
            </button>
            <button class="col-span-2" :class="defaultBtnClass" @click="sendNum(0)">0</button>
            <button class="col-span-1" :class="defaultBtnClass" @click="calculate()">=</button>
          </div>
        </div>
        <div class="operations grid grid-cols-1 gap-2">
          <button
             v-for="opr in operations"
             :key="opr"
             class="col-span-1"
             :class="defaultBtnClass"
             @click="setOperator(opr)">
            {{opr}}
          </button>
        </div>
      </div>
      <div class="grid grid-gap-2 grid-cols-1 mt-2">
        <button @click="reset()" class="col-span-2" :class="defaultBtnClass">C</button>
      </div>
    </div>
  </div>

</template>

<script>
import {ref} from 'vue'
export default {
  setup() {
    //vars
    const operations       = ref(['/','*','-','+']);
    const firstNum         = ref('')
    const secondNum        = ref('')
    const currentValue     = ref('0')
    const currentOperator  = ref('')
    const defaultBtnClass  = ref('h-10 border hover:bg-blue-100 trans')
    const currentStep      = ref('1')
    const resetBefore      = ref(false)
    const resetOnSend      = ref(false)
    const showString       = ref('')

    //functions
    const sendNum = (num) => {
      if (['/','*','-','+','0'].includes(currentValue.value) || resetBefore.value) {
        resetBefore.value = false
        currentValue.value = num.toString()
      } else {
        currentValue.value += ''+num
        if (currentStep.value == '1') {
          firstNum.value = currentValue.value
        } else {
          secondNum.value = currentValue.value
        }
      }
      showString.value = ''
    }
    const reset = ()=> {
      currentValue.value    = '0'
      currentOperator.value = null
      firstNum.value        = '0'
      secondNum.value       = '0'
      currentStep.value     = '1'
      showString.value = ''
    }

    const setOperator = (operator) => {
      if (currentStep.value === '1') {  
        firstNum.value        = parseFloat(currentValue.value)
        currentValue.value    = operator
        currentOperator.value = operator
        currentStep.value     = '2'
      }
      showString.value = ''
    }

    const calculate = ()=> {
      if (currentStep.value === '2') {
        secondNum.value = currentValue.value
        currentValue.value = eval(firstNum.value + currentOperator.value + secondNum.value)
        showString.value = firstNum.value + ' ' + currentOperator.value + ' ' + secondNum.value
        currentStep.value  = '1'
        resetBefore.value  = true
        // firstNum.value     = currentValue.value
      }
    }

    return {
      operations,
      firstNum,
      secondNum,
      currentValue,
      sendNum,
      currentStep,
      defaultBtnClass,
      reset,
      setOperator,
      currentOperator,
      calculate,
      resetBefore,
      showString,
      resetOnSend 
    }
  },
}
</script>

<style>
  .trans {
    transition: all .2s ease;
  }
</style>