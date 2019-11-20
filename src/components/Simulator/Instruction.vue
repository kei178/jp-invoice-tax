<template>
  <div class="ui segment basic">
    <h1>課税事業者成りシミュレーター</h1>
    <transition name="fade" mode="out-in">
      <template v-if="!showInstruction">
        <p class="header">
          <span class="show" @click="toggleShowInstruction()">説明文をみる</span>
        </p>
      </template>
      <template v-else>
        <div>
          <p class="header">
            <span class="hide" @click="toggleShowInstruction()">説明文をとじる</span>
          </p>
          <div id="instruction-body" class="ui segment">
            <p>
              2023年10月からインボイス制度が始まります。もし何も対策をしなければ、これのせいで<strong>フリーランスの収入は10%も減る可能性があります。</strong>
              一方、事前に対策をおこない（＝課税事業者になって）、引き続き消費税を請求できるようにすれば、<strong>年収減は半分以下に抑えられます。</strong>
            </p>
            <p>
              このシミュレーターでは、確定申告書から数値を入力するだけで「課税事業者成り」で見込める手取りの増加額をざっくり計算します。
              少しでも年収減を食い止められるように、2022年までにしっかり準備しておきましょう！
            </p>
            <p>
              ※ インボイス制度でフリーランスが受ける影響の詳細は<a href="#" target="_blank">こちら</a>。 
            </p>
          </div>
        </div>
      </template>
    </transition>
  </div>  
</template>

<script>  
export default {
  data() {
    return {
      showInstruction: false
    }
  },
  methods: {
    toggleShowInstruction() {
      this.showInstruction = !this.showInstruction 
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
  }
  p.header span {
    cursor: pointer;
    color: #2185d0;
  }
</style>