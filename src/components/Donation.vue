<template>
  <div class="ui segment basic center aligned">
    <h2>
      このページを支援<i class="paypal icon"></i>
    </h2>
    <p>
      当シミュレーターが役に立ったよ！という方は<br>
      コーヒー1杯分(300円)のご支援をいただけると幸いです。<br>
      以下のボタンをクリックするとPayPalの決済ページに飛びます。<br>
      支援金は当ページの運営費用として使わせていただきます。
    </p>
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick">
      <input type="hidden" name="hosted_button_id" value="3K2V57PCUHUGN">
      <input type="submit" name="submit" value="¥300 支援" class="ui blue button">
    </form>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>