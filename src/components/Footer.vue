<template>
  <div>
    <div class="ui divider hidden"></div>
    <div class="ui divider"></div>
    <div class="ui segment basic center aligned">
      <p>Created by <a href="https://github.com/kei178" target="_blank">@kei178</a></p>
      <p>© {{ year }} Keisuke Inaba</p>
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