<template>
  <div class="ui segment basic center aligned">
    <h2>
      手取り増加額
      <span
        style="color: darkgrey;"
        data-inverted=""
        data-tooltip="課税事業者成りで得する金額">
        <i class="info circle icon small"></i>
      </span>
    </h2>
    <transition name="fade" mode="out-in">
      <template v-if="!allEntered">
        <div>
          <p>計算中...</p>
          <i class="sync icon rotating"></i>
        </div>
      </template>
      <template v-else-if="isCalculatable">
        <div>
          <div class="ui statistic blue">
            <div class="value">¥{{ result | formatNumber }}</div>
            <div class="label">① - {{ minResultNum }}</div>
          </div>
          <p>
            年収減10%
            <span v-show="sales > 0">
              <i class="long arrow alternate small right icon"></i>{{ incomeCutRate }}%
            </span> 
          </p>
          <h4>インボイス制度後（2023年10月〜）</h4>
          <table class="ui celled table">
            <thead>
              <tr>
                <th class="four wide">対策</th>
                <th class="three wide">請求額減</th>
                <th class="three wide">消費税納付</th>  
                <th class="three wide">所得/住民/事業</th>
                <th class="three wide">手取り減</th>  
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>対策なし（免税）</td>
                <td :style="{color: numColor(taxExemptIncomeCut)}">¥ {{ taxExemptIncomeCut | formatNumber }}</td>
                <td :style="{color: numColor(taxExemptConsumptionTax)}">¥ {{ taxExemptConsumptionTax | formatNumber }}</td>
                <td :style="{color: numColor(taxExemptOtherTaxes)}">¥ {{ taxExemptOtherTaxes | formatNumber }}</td>
                <td>
                  <span :style="{color: numColor(taxExemptImpact)}">
                    <strong>¥ {{ taxExemptImpact | formatNumber }}</strong>
                  </span>
                  <small> ①</small>
                </td>
              </tr> 
              <tr>
                <td>課税事業者</td>
                <td :style="{color: numColor(taxBizIncomeCut)}">¥ {{ taxBizIncomeCut | formatNumber }}</td>
                <td :style="{color: numColor(taxBizConsumptionTax)}">¥ {{ taxBizConsumptionTax | formatNumber }}</td>
                <td :style="{color: numColor(taxBizOtherTaxes)}">¥ {{ taxBizOtherTaxes | formatNumber }}</td>
                <td>
                  <span :style="{color: numColor(taxBizImpact)}">
                    <strong>¥ {{ taxBizImpact | formatNumber }}</strong>
                  </span>
                  <small> ②</small>
                </td>
              </tr>
              <tr>
                <td>簡易課税事業者</td>
                <td :style="{color: numColor(simpleTaxBizIncomeCut)}">¥ {{ simpleTaxBizIncomeCut | formatNumber }}</td>
                <td :style="{color: numColor(simpleTaxBizConsumptionTax)}">¥ {{ simpleTaxBizConsumptionTax | formatNumber }}</td>
                <td :style="{color: numColor(simpleTaxBizOtherTaxes)}">¥ {{ simpleTaxBizOtherTaxes | formatNumber }}</td>
                <td>
                  <span :style="{color: numColor(simpleTaxBizImpact)}">
                    <strong>¥ {{ simpleTaxBizImpact | formatNumber }}</strong>
                  </span>
                  <small> ③</small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template v-else>
        <p>
          あなたは既に課税事業者です。<br>
          <small>（売上1000万円超）</small>
        </p>
      </template>
    </transition>
  </div>
</template>

<script>
const CONSUMPTION_TAX_RATE = 0.1,
      CONSUMPTION_TAX_EXEMPT_SALES_LIMIT = 10000000,
      RESIDENT_TAX_RATE = 0.1,
      BUSIBESS_TAX_DEDUCTION = 2900000,
      BLUE_TAX_DEDUCTION = 650000

export default {
  data() {
    return {}
  },
  filters: {
    formatNumber(value) {
      return Number(Math.floor(value)).toLocaleString()
    }
  },
  methods: {  
    numColor(num) {
      if(num > 0) {
        return '#db2828'
      } else if(num == 0) {
        return '#dddddd'
      } else {
        return '#2185d0'
      }
    },
    // 共通 - 所得税
    incomeTaxRate(income) {
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
    // 共通 - 消費税
    calcConsumptionTax(amount) {
      return Math.floor(amount - (amount / (1 + CONSUMPTION_TAX_RATE)))
    },
    // 共通 - 事業税
    isBizIncomeTaxable(incomeChange) {
      return (this.sales - this.cost + incomeChange) > BLUE_TAX_DEDUCTION
    },
    // 影響額 - 所得税
    incomeTaxImpact(incomeChange) {
      const income = this.taxableIncome + incomeChange
      if(income > 0 && this.isBizIncomeTaxable(incomeChange)) {
        return incomeChange * this.incomeTaxRate(income)
      } else {
        return 0
      }
    },
    // 影響額 - 住民税
    residentTaxImpact(incomeChange) {
      const income = this.taxableIncome + incomeChange
      if(income > 0 && this.isBizIncomeTaxable(incomeChange)) {
        return incomeChange * RESIDENT_TAX_RATE
      } else {
        return 0
      }
    },
    // 影響額 - 事業税
    businessTaxImpact(incomeChange) {
      const income = this.businessTaxTaxableIncome + incomeChange 
      if(income > 0 && this.isBizIncomeTaxable(incomeChange)) {
        return incomeChange * this.selectedBizTaxRate
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
    taxableIncome() {
      return this.$store.getters.entries.taxableIncome
    },
    realEstateIncome() {
      return this.$store.getters.entries.realEstateIncome
    },
    selectedBiz() {
      return this.$store.getters.entries.selectedBiz
    },
    selectedBizTaxRate() {
      return this.$store.getters.entries.selectedBizTaxRate
    },
    allEntered() {
      return this.sales > 0 && this.cost > 0 && this.taxableIncome > 0
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
    
    // 共通 - 事業税
    businessTaxTaxableIncome() {
      return (this.sales - this.cost) + this.realEstateIncome - BUSIBESS_TAX_DEDUCTION
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
      return this.calcConsumptionTax(this.sales)
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
      return this.taxBizImpact > this.simpleTaxBizImpact ? '③' : '②'
    },
    incomeCutRate () {
      return ((this.result / this.sales) * 100).toFixed(1)
    }
  }
}
</script>

<style scoped>
  .ui.segment.basic {
    padding-top: 0;
  }
  table.ui.celled.table td {
    text-align: right;
  }  
  table.ui.celled.table td:first-child {
    text-align: left;  
  }

  /* animation */
  @-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  .rotating {
    -webkit-animation: rotating 2s linear infinite;
    -moz-animation: rotating 2s linear infinite;
    -ms-animation: rotating 2s linear infinite;
    -o-animation: rotating 2s linear infinite;
    animation: rotating 2s linear infinite;
  }
</style>