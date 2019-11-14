<template>
  <div class="ui segment basic center aligned">
    <h2>設定値</h2>
    <p 
      style="color: #db2828;"
      v-show="!isEntered">
      あなたの情報を入力してください
      <i class="hand point down outline icon"></i>
    </p>
    <div class="ui form">
      <div class="three fields">
        <div class="field" :class="{error: sales <= 0}">
          <label>
            年間売上
            <span 
              data-inverted=""
              data-tooltip="青色申告決算書の「売上（収入）金額」">
              <i class="info circle icon"></i>
            </span>
          </label>
          <vue-numeric
            v-model="sales" 
            currency="¥" 
            :change="checkEnteries()"
            :min="0"
            autofocus></vue-numeric>
        </div>
        <div class="field" :class="{error: cost <= 0}">
          <label>
            年間経費
            <span 
              data-inverted=""
              data-tooltip="青色申告決算書の「経費 計」">
              <i class="info circle icon"></i>
            </span>
          </label>
          <vue-numeric 
            v-model="cost" 
            currency="¥" 
            :change="checkEnteries()"
            :min="0"></vue-numeric>
        </div>
        <div class="field">
          <label>業種（簡易課税用）</label>
          <select class="ui fluid search dropdown" v-model="selectedBiz">
            <option 
                v-for="bizOpt in bizOpts" 
                :value="bizOpt[1]" 
                :key="bizOpt[0]">
              {{ bizOpt[0] }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="ui form">
      <div class="three fields">
        <div class="field" :class="{error: taxableIncome <= 0}">
          <label>
            課税所得金額
            <span 
              data-inverted=""
              data-tooltip="確定申告書Bの「課税される所得金額」">
              <i class="info circle icon"></i>
            </span>
          </label>
          <vue-numeric 
            v-model="taxableIncome" 
            :change="checkEnteries()"
            :min=0
            currency="¥" ></vue-numeric>
        </div>
        <div class="field">
          <label>
            不動産所得（任意）
            <span 
              data-inverted=""
              data-tooltip="確定申告書Bの「所得金額 不動産」">
              <i class="info circle icon"></i>
            </span>
          </label>
          <vue-numeric 
            v-model="realEstateIncome" 
            currency="¥" 
            v-bind:min="0"></vue-numeric>
        </div>
        <div class="field">
          <label>
            事業税率
            <span 
              data-inverted=""
              data-tooltip="ほとんどの場合「5%」">
              <i class="info circle icon"></i>
            </span>
          </label>
          <select class="ui fluid search dropdown" v-model="selectedBizTaxRate">
            <option 
                v-for="bizTaxRateOpt in bizTaxRateOpts" 
                :value="bizTaxRateOpt[1]" 
                :key="bizTaxRateOpt[0]">
              {{ bizTaxRateOpt[0] }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueNumeric from 'vue-numeric'

export default {
  data() {
    return {
      sales:              this.$store.getters.entries.sales,
      cost:               this.$store.getters.entries.cost,
      selectedBiz:        this.$store.getters.entries.selectedBiz,
      bizOpts:            this.$store.getters.entries.bizOpts,
      selectedBizTaxRate: this.$store.getters.entries.selectedBizTaxRate,
      bizTaxRateOpts:     this.$store.getters.entries.bizTaxRateOpts,
      taxableIncome:      this.$store.getters.entries.taxableIncome,
      realEstateIncome:   this.$store.getters.entries.realEstateIncome,
      isEntered:          false
    }
  },
  components: {
    VueNumeric
  },
  watch: {
    sales: function() {
      this.updateEntries()
    },
    cost: function() {
      this.updateEntries()
    },
    selectedBiz: function() {
      this.updateEntries()
    },
    bizOpts: function() {
      this.updateEntries()
    },
    selectedBizTaxRate: function() {
      this.updateEntries()
    },
    bizTaxRateOpts: function() {
      this.updateEntries()
    },
    taxableIncome: function() {
      this.updateEntries()
    },
    realEstateIncome: function() {
      this.updateEntries()
    },
  },
  methods: {
    updateEntries() {
      this.$store.dispatch("updateEntries", {
        sales:              this.sales,
        cost:               this.cost,
        selectedBiz:        this.selectedBiz,
        bizOpts:            this.bizOpts,
        selectedBizTaxRate: this.selectedBizTaxRate,
        bizTaxRateOpts:     this.bizTaxRateOpts,
        taxableIncome:      this.taxableIncome,
        realEstateIncome:   this.realEstateIncome
      })
    },
    checkEnteries() {
      this.isEntered = this.sales > 0 && this.cost > 0 && this.taxableIncome > 0
    }
  }
}
</script> 

<style scoped>
  .ui.segment.basic {
    padding-top: 0;
  }
  i.info.circle.icon {
    color:darkgrey;
  }
</style>
