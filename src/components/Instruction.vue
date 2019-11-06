<template>
  <div class="ui segment basic">
    <h1>課税事業者成りシミュレーター</h1>
    <p 
      class="header" 
      @click="showInstruction = !showInstruction">説明文をみる</p>
    <div class="ui segment" v-if="showInstruction">
      <p>
        2023年10月から始まるインボイス制度。もし何も対策をしなければ、これのせいで<strong>フリーランスの収入は10%も減る可能性があります。</strong>
        一方、事前に対策をおこない（＝課税事業者になって）、引き続き消費税を請求できるようにすれば、<strong>年収減は半分以下に抑えられます。</strong>
      </p>
      <p>
        このシミュレーターでは、設定値を入力するだけで「課税事業者成り」で見込める手取りの増加額をざっくり計算します。
        少しでも年収減を食い止められるように、2022年までにしっかり準備しておきましょう！
      </p>
      <p>
        ※ インボイス制度でフリーランスが受ける影響の詳細はこちら。 
      </p>
    </div>
  </div>  
</template>

<script>  
export default {
  data() {
    return {
      showInstruction: false
    }
  }
}
</script>

<style scoped>
  h1 {
    text-align: center;
  }
  p.header {
     text-align: center;
     cursor: pointer;
     color: #2185d0;
  }
</style>