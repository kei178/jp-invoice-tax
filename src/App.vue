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
</style>