<template>
  <div class="ui text container">
    <app-instruction></app-instruction>
    <app-entries></app-entries>
    <app-result></app-result>
    <app-disclaimer></app-disclaimer>
    <div class="ui divider hidden"></div>
    <div class="ui divider"></div>
    <app-twitter></app-twitter>
    <app-contact></app-contact>
    <app-donation></app-donation>
    <div class="ui divider hidden"></div>
    <div class="ui divider"></div>
    <app-footer></app-footer>
    <div class="ui divider hidden"></div>
    <div class="ui divider hidden"></div>
  </div>
</template> 

<script>
import appInstruction  from './components/Simulator/Instruction.vue'; 
import appEntries      from './components/Simulator/Entries.vue'; 
import appResult       from './components/Simulator/Result.vue'; 
import appDisclaimer   from './components/Simulator/Disclaimer.vue'; 
import appTwitter      from './components/Twitter.vue';
import appDonation     from './components/Donation.vue';
import appContact      from './components/Contact.vue';
import appFooter       from './components/Footer.vue';

export default {
  components: {
    appInstruction,  
    appEntries,
    appResult,
    appDisclaimer,
    appTwitter,
    appContact,
    appDonation,
    appFooter
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