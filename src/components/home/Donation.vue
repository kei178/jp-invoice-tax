<template>
  <div class="ui segment basic center aligned">
    <h2>
      このページを支援<i class="paypal icon"></i>
    </h2>
    <p>
      <strong>役に立った！コーヒー奢ってやる！</strong>という方は、<br>
      PayPal経由でコーヒー1杯分(300円)をご支援いただけます。<br>
      いただいた支援金は当ページの運営費用に充てるか、<br>
      本当にコーヒーを頂戴させていただきます。
    </p>
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick">
      <input type="hidden" name="hosted_button_id" value="3K2V57PCUHUGN">
      <button
        type="submit"
        class="ui positive button">
        <i class="coffee icon"></i>支援
      </button>
    </form>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>