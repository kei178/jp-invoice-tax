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
          <input type="number" v-model="sales" placeholder="円" min="0" autofocus>
        </div>
        <div class="field">
          <label>年間経費</label>
          <input type="number" v-model="cost" placeholder="円" min="0">
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
          <input type="number" placeholder="円" :value="blueTaxDeduction" readonly>
        </div>
        <div class="field">
          <label>事業以外の所得（任意）</label>
          <input type="number" v-model="otherIncome" placeholder="円" min="0">
        </div>
        <div class="field">
          <label>税額控除</label>
          <input type="number" v-model="taxReduction" placeholder="円" min="380000">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  watch: {
    sales: function() {
      this.updateEntries();
    },
    cost: function() {
      this.updateEntries();
    },
    selectedBiz: function() {
      this.updateEntries();
    },
    otherIncome: function() {
      this.updateEntries();
    },
    taxReduction: function() {
      this.updateEntries();
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
      });
    }
  }
}
</script>
