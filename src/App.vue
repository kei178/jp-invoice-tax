<template>
  <div class="ui text container">
    <instruction></instruction>
    <entries></entries>
    <result></result>
    <disclaimer></disclaimer>
    <div class="ui divider hidden"></div>
    <div class="ui divider"></div>
    <donation></donation>
    <contact></contact>
    <twitter></twitter>
  </div>
</template> 

<script>
import Instruction  from './components/Simulator/Instruction.vue'; 
import Entries      from './components/Simulator/Entries.vue'; 
import Result       from './components/Simulator/Result.vue'; 
import Disclaimer   from './components/Simulator/Disclaimer.vue'; 
import Donation     from './components/Donation.vue';
import Contact      from './components/Contact.vue';
import Twitter      from './components/Twitter.vue';

export default {
  components: {
    Instruction,  
    Entries,
    Result,
    Disclaimer,
    Donation,
    Contact,
    Twitter
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