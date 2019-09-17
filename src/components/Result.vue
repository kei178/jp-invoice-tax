<template>
  <div class="ui segment basic center aligned">
    <h2>計算結果</h2>
    <div v-if="isCalculatable">
      <div class="ui statistic blue">
        <div class="value">¥{{ result | formatNumber }}</div>
        <div class="label">最大節税額</div>
      </div>
      <table class="ui celled table">
        <thead>
          <tr>
            <th rowspan="2" class="four wide">対策</th>
            <th rowspan="2" class="three wide">収入減</th>
            <th colspan="2" class="eight wide">節税額</th>
            <th rowspan="2" class="three wide">影響額</th>
          </tr>
          <tr>
            <th class="three wide">消費税</th>
            <th class="three wide">所得/住民/事業</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Name">対策なし</td>
            <td data-label="Age">24</td>
            <td data-label="Age">24</td>
            <td data-label="Job">Engineer</td>
            <td data-label="Job">Engineer</td>
          </tr>
          <tr>
            <td data-label="Name">課税事業者</td>
            <td data-label="Age">24</td>
            <td data-label="Age">24</td>
            <td data-label="Job">Engineer</td>
            <td data-label="Job">Engineer</td>
          </tr>
          <tr>
            <td data-label="Name">簡易課税事業者</td>
            <td data-label="Age">24</td>
            <td data-label="Age">24</td>
            <td data-label="Job">Engineer</td>
            <td data-label="Job">Engineer</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      売上1000万円超なので、課税事業者です。
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  filters: {
    formatNumber(value) {
      return String(value).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    } 
  },
   computed: {
    isCalculatable() {
      return this.$store.getters.entries.sales < 10000000;
    },
    result() {
      // TODO: 計算を書く
      return this.$store.getters.entries.sales - this.$store.getters.entries.cost
    }
  }
}
</script> 