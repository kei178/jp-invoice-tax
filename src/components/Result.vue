<template>
  <div class="ui segment basic center aligned">
    <h2>手取り増加額</h2>
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
            <th class="three wide">差引手取り</th>  
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
const CONSUMPTION_TAX_RATE = 0.1,
      CONSUMPTION_TAX_EXEMPT_SALES_LIMIT = 10000000,
      RESIDENT_TAX_RATE = 0.1,
      BUSINESS_TAX_RATE = 0.05, // 一般的な5%のみで計算
      BUSIBESS_TAX_DEDUCTION = 2900000

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
    incomeTaxImpact(incomeChange) {
      const income = this.incomeTaxTaxableIncome + incomeChange
      if(income > 0) {
        return incomeChange * this.incomeTaxRate
      } else {
        return 0
      }
    },
    residentTaxImpact(incomeChange) {
      const income = this.incomeTaxTaxableIncome + incomeChange
      if(income > 0) {
        return incomeChange * RESIDENT_TAX_RATE
      } else {
        return 0
      }
    },
    businessTaxImpact(incomeChange) {
      const income = this.businessTaxTaxableIncome + incomeChange 
      if(income > 0) {
        return incomeChange * BUSINESS_TAX_RATE
      } else {
        return 0
      }
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
    otherIncome() {
      return this.$store.getters.entries.otherIncome
    },
    taxReduction() {
      return this.$store.getters.entries.taxReduction
    },
    selectedBiz() {
      return this.$store.getters.entries.selectedBiz
    },
    blueTaxDeduction() {
      return this.$store.getters.entries.blueTaxDeduction
    },

    // 共通 - 消費税
    isCalculatable() {
      return this.sales < CONSUMPTION_TAX_EXEMPT_SALES_LIMIT
    },
    salesCosumptionTax() {
      return this.calcConsumptionTax(this.sales)
    },
    costCosumptionTax() {
      return this.calcConsumptionTax(this.cost)
    },
    
    // 共通 - 所得税
    bizIncomeTaxableIncome() {
      return this.sales - this.cost - this.blueTaxDeduction 
    },
    incomeTaxTaxableIncome() {
      return (this.bizIncomeTaxableIncome + this.otherIncome) - this.taxReduction
    },
    incomeTaxRate() {
      const income = this.incomeTaxTaxableIncome
      // 税率: 平成27年分以降
      if(income <= 1950000) {
        return 0.05
      } else if(income <= 3300000) {
        return 0.10
      } else if(income <= 6950000) {
        return 0.20
      } else if(income <= 9000000) {
        return 0.23
      } else if(income <= 18000000) {
        return 0.33
      } else if(income <= 40000000) {
        return 0.40
      } else {
        return 0.45
      }
    },
    
    // 共通 - 事業税
    businessTaxTaxableIncome() {
      return this.sales - this.cost - BUSIBESS_TAX_DEDUCTION
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
      return this.incomeTaxImpact(-this.taxBizConsumptionTax)
    },
    taxBizResidentTax() {
      return this.residentTaxImpact(-this.taxBizConsumptionTax)
    },
    taxBizBusinessTax() {
      return this.businessTaxImpact(-this.taxBizConsumptionTax)
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
      return (
        this.simpleTaxBizIncomTax +
          this.simpleTaxBizResidentTax +
          this.simpleTaxBizBusinessTax
      )
    },
    simpleTaxBizIncomTax() {
      return this.incomeTaxImpact(-this.simpleTaxBizConsumptionTax)
    },
    simpleTaxBizResidentTax() {
      return this.residentTaxImpact(-this.simpleTaxBizConsumptionTax)
    },
    simpleTaxBizBusinessTax() {
      return this.businessTaxImpact(-this.simpleTaxBizConsumptionTax)
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