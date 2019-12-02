<template>
  <div class="ui segment basic center aligned">
    <h2>
      つぶやき
      <i class="twitter icon"></i>
    </h2>
    <div id="twitter-widget"></div>
      <a 
        href="https://twitter.com/intent/tweet?button_hashtag=課税事業者成り&ref_src=twsrc%5Etfw" 
        class="ui twitter button tiny">
        <i class="twitter icon"></i>#課税事業者成り
      </a>
  </div>
</template>

<script>
export default {
  mounted() {
    this.appendTwitterWidget()
  },
  methods: {
    // maybe-later: Be replaced with `vue-tweet-embed`
    appendTwitterWidget() {
      const tweetWidget = document.getElementById('twitter-widget')
      let recaptchaScript = document.createElement('script')
      recaptchaScript.async = true
      recaptchaScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
      tweetWidget.appendChild(recaptchaScript)
    }
  }
}
</script>

<style scoped>
</style>