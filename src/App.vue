<template>
  <div class="ui text container">
    <instruction></instruction>
    <entries></entries>
    <result></result>
    <disclaimer></disclaimer>
    <div class="ui divider hidden"></div>
    <div class="ui divider"></div>
    <twitter></twitter>
    <donation></donation>
    <contact></contact>
    <div class="ui divider hidden"></div>
    <div class="ui divider"></div>
    <app-footer></app-footer>
    <div class="ui divider hidden"></div>
    <div class="ui divider hidden"></div>
  </div>
</template> 

<script>
import Instruction  from './components/Simulator/Instruction.vue'; 
import Entries      from './components/Simulator/Entries.vue'; 
import Result       from './components/Simulator/Result.vue'; 
import Disclaimer   from './components/Simulator/Disclaimer.vue'; 
import Twitter      from './components/Twitter.vue';
import Donation     from './components/Donation.vue';
import Contact      from './components/Contact.vue';
import Footer       from './components/Footer.vue';

export default {
  components: {
    Instruction,  
    Entries,
    Result,
    Disclaimer,
    Twitter,
    Donation,
    Contact,
    appFooter: Footer
  },
  created() {
    this.$store.dispatch('initEntries')
  }
}
</script>

<style>
  body {
    padding: 1.5rem 0;
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