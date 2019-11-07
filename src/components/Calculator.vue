<template>
  <div class="ui segment basic center aligned">
    <h2>設定値</h2>
    <p>
      あなたの情報を入力してください
      <i class="hand point down outline icon"></i>
    </p>
    <div class="ui form">
      <div class="three fields">
        <div class="field">
          <label>年間売上</label>
          <vue-numeric 
            v-model="sales" 
            currency="¥" 
            v-bind:min="0"
            autofocus></vue-numeric>
        </div>
        <div class="field">
          <label>年間経費</label>
          <vue-numeric 
            v-model="cost" 
            currency="¥" 
            v-bind:min="0"></vue-numeric>
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
        <div class="field">
          <label>青色申告控除</label>
          <vue-numeric 
            v-model="blueTaxDeduction" 
            currency="¥" 
            v-bind:min="650000"
            readonly></vue-numeric>
        </div>
        <div class="field">
          <label>事業以外の所得（任意）</label>
          <vue-numeric 
            v-model="otherIncome" 
            currency="¥" 
            v-bind:min="0"></vue-numeric>
        </div>
        <div class="field">
          <label>税額控除</label>
          <vue-numeric 
            v-model="taxReduction" 
            currency="¥" 
            v-bind:min="380000"></vue-numeric>
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
      sales:        this.$store.getters.entries.sales,
      cost:         this.$store.getters.entries.cost,
      selectedBiz:  this.$store.getters.entries.selectedBiz,
      bizOpts:      this.$store.getters.entries.bizOpts,
      otherIncome:  this.$store.getters.entries.otherIncome,
      taxReduction: this.$store.getters.entries.taxReduction,
      blueTaxDeduction: this.$store.getters.entries.blueTaxDeduction
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
    otherIncome: function() {
      this.updateEntries()
    },
    taxReduction: function() {
      this.updateEntries()
    },
  },
  methods: {
    updateEntries() {
      this.$store.dispatch("updateEntries", {
        sales:        this.sales,
        cost:         this.cost,
        selectedBiz:  this.selectedBiz,
        bizOpts:      this.bizOpts,
        otherIncome:  this.otherIncome,
        taxReduction: this.taxReduction  
      })
    }
  }
}
</script>
