<template>
  <div class="ui segment basic center aligned">
    <h2>最大節税額</h2>
    <div v-if="isCalculatable">
      <div class="ui statistic blue">
        <div class="value">¥{{ result | formatNumber }}</div>
        <div class="label">① - {{ minResultNum }}</div>
      </div>
      <h4>インボイス制度後</h4>
      <table class="ui celled table">
        <thead>
          <tr>
            <th class="four wide">対策</th>
            <th class="three wide">請求額減</th>
            <th class="three wide">消費税納付</th>
            <th class="three wide">所得/住民/事業</th>
            <th class="three wide">影響額</th>  
          </tr>
        </thead>  
        <tbody>
          <tr>
            <td>対策なし（免税）</td>
            <td>{{ taxExemptIncomeCut | formatNumber }}</td>
            <td>{{ taxExemptConsumptionTax | formatNumber }}</td>
            <td>{{ taxExemptOtherTaxes | formatNumber }}</td>
            <td>
              <strong>{{ taxExemptImpact | formatNumber }}</strong>
              <small> ①</small>
            </td>
          </tr> 
          <tr>
            <td>課税事業者</td>
            <td>{{ taxBizIncomeCut | formatNumber }}</td>
            <td>{{ taxBizConsumptionTax | formatNumber }}</td>
            <td>{{ taxBizOtherTaxes | formatNumber }}</td>
            <td>
              <strong>{{ taxBizImpact | formatNumber }}</strong>
              <small> ②</small>
            </td>
          </tr>
          <tr>
            <td>簡易課税事業者</td>
            <td>{{ simpleTaxBizIncomeCut | formatNumber }}</td>
            <td>{{ simpleTaxBizConsumptionTax | formatNumber }}</td>
            <td>{{ simpleTaxBizOtherTaxes | formatNumber }}</td>
            <td>
              <strong>{{ simpleTaxBizImpact | formatNumber }}</strong>
              <small> ③</small>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      あなたは既に課税事業者です。
      <br>
      <small>（売上1000万円超）</small>
    </div>
  </div>
</template>

<script>
const CONSUMPTION_TAX_RATE = 0.1
export default {
  data() {
    return {
    }
  },
  filters: {
    formatNumber(value) {
      return String(Math.floor(value)).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
    } 
  },
  methods: {  
    calcConsumptionTax(amount) {
      return amount - amount / (1 + CONSUMPTION_TAX_RATE)
    },
    calcTaxableIncome() {
      return 0
    }
  },
  computed: {
    // 設定値
    sales() {
      return this.$store.getters.entries.sales
    },  
    cost() {
      return this.$store.getters.entries.cost
    },
    selectedBiz() {
      return this.$store.getters.entries.selectedBiz
    },  
    salesCosumptionTax() {
      return this.calcConsumptionTax(this.sales)
    },
    costCosumptionTax() {
      return this.calcConsumptionTax(this.cost)
    },
    
    // 設定値判定
    isCalculatable() {
      return this.sales < 10000000
    },

    // 対策なし（免税）
    taxExemptImpact() {
      return (
        this.taxExemptIncomeCut + 
          this.taxExemptConsumptionTax + 
          this.taxExemptOtherTaxes
      )
    },
    taxExemptIncomeCut() {
      return this.sales * CONSUMPTION_TAX_RATE
    },
    taxExemptConsumptionTax(){
      return 0
    },
    taxExemptOtherTaxes(){
      return (
        this.taxExemptIncomTax +
          this.taxExemptResidentTax +
          this.taxExemptBusinessTax
      )
    },
    taxExemptIncomTax() {
      return 0
    },
    taxExemptResidentTax() {
      return 0
    },
    taxExemptBusinessTax() {
      return 0
    },

    // 課税事業者
    taxBizImpact() {
      return (
        this.taxBizIncomeCut +
          this.taxBizConsumptionTax +
          this.taxBizOtherTaxes
      )
    },
    taxBizIncomeCut() {
      return 0
    },
    taxBizConsumptionTax() {
      return this.salesCosumptionTax - this.costCosumptionTax
    },
    taxBizOtherTaxes() {
      return (
        this.taxBizIncomTax +
          this.taxBizResidentTax +
          this.taxBizBusinessTax
      )
    },
    taxBizIncomTax() {
      return 0
    },
    taxBizResidentTax() {
      return 0
    },
    taxBizBusinessTax() {
      return 0
    },

    // 簡易課税事業者
    simpleTaxBizImpact() {
      return (
        this.simpleTaxBizIncomeCut +
          this.simpleTaxBizConsumptionTax +
          this.simpleTaxBizOtherTaxes
      )
    },
    simpleTaxBizIncomeCut() {
      return this.taxBizIncomeCut 
    },
    simpleTaxBizConsumptionTax() {
      return this.salesCosumptionTax * this.selectedBiz
    },
    simpleTaxBizOtherTaxes() {
      return 0
    },
    
    // 計算結果
    result() {
      const arr = [this.taxBizImpact, this.simpleTaxBizImpact]
      return this.taxExemptImpact - Math.min.apply(0,arr)
    },
    minResultNum() {
      return this.taxBizImpact > this.simpleTaxBizImpact ? '②' : '③'
    }
  }
}
</script>

<style scoped>
  table.ui.celled.table td {
    text-align: right;
  }  
  table.ui.celled.table td:first-child {
    text-align: left;  
  }
</style>