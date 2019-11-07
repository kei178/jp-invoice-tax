<template>
  <div class="ui text container">
    <instruction></instruction>
    <calculator></calculator>
    <result></result>
  </div>
</template>

<script>
import Instruction from './components/Instruction.vue'; 
import Calculator from './components/Calculator.vue'; 
import Result from './components/Result.vue'; 

export default {
  components: {
    Instruction,
    Calculator,
    Result
  },
  created() {
    this.$store.dispatch('initEntries')
  }
}
</script>

<style>
  body {
    padding: 3rem;
  }
  /* Animation */
  .fade-enter-active {
    animation: fade-in 200ms ease-in forwards;
  }
  .fade-leave-active {
    animation: fade-out 200ms ease-out forwards;
  } 
  @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
  } 
  @keyframes fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
  }
</style>