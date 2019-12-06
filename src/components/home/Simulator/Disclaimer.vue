<template>
  <div class="ui segment basic" style="padding-top: 0;">
    <div class="ui bulleted list small">
      <div class="item">当シミュレーターは課税事業者成りで得する金額の目安を計算するものです。</div>
      <div class="item">青色申告の個人事業主（特にフリーランス）を前提にしています。</div>
      <div class="item">住民税（所得割）は「所得税の課税所得金額 x 10%」で計算しています。</div>
      <div class="item">不動産所得は事業税課税標準の算出にのみ使っています。（インボイス制度の影響は無視しています）</div>
      <div class="item">実際の計算式は<a href="https://github.com/kei178/jp-invoice-tax" target="_blank">ソースコード</a>をご覧ください。</div>
    </div>
    <app-share></app-share>
  </div>
</template> 

<script>  
import Share from '@/components/shared/Share.vue'

export default {
  components: {
    appShare: Share
  }
}
</script>

<style scoped>
  .ui.list { 
    padding: auto 0.5rem;
  }
  div.item {
    color: grey;
  }
</style>