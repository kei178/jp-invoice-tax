<template>
  <div>
    <div class="ui divider hidden"></div>
    <div class="ui divider"></div>
    <div class="ui segment basic center aligned">
      <p>Created by <a href="https://twitter.com/kskinaba" target="_blank">@kskinaba</a></p>
      <p>© {{ year }} @kskinaba</p>
    </div>
    <div class="ui divider hidden"></div>
    <div class="ui divider hidden"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear( )
    }
  }
}
</script> 