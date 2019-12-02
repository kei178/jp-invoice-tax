<template>
  <div>
    <app-instruction></app-instruction>
    <app-entries></app-entries>
    <div class="ui divider hidden"></div>
    <app-result></app-result>
    <app-disclaimer></app-disclaimer>
    <div class="ui divider"></div>
    <div class="ui divider hidden"></div>
    <app-contact></app-contact>
    <div class="ui divider hidden"></div>
    <app-author></app-author>
    <div class="ui divider hidden"></div>
    <app-donation></app-donation>
  </div>
</template> 

<script>
import appInstruction  from './Simulator/Instruction.vue'; 
import appEntries      from './Simulator/Entries.vue'; 
import appResult       from './Simulator/Result.vue'; 
import appDisclaimer   from './Simulator/Disclaimer.vue'; 
import appContact      from './Contact.vue';
import appAuthor       from './Author.vue';
import appDonation     from './Donation.vue';

export default {
  components: {
    appInstruction,  
    appEntries,
    appResult,
    appDisclaimer,
    appContact,
    appAuthor,
    appDonation
  }
}
</script>