<template>
  <div class="ui segment basic center aligned">
    <button 
      class="ui twitter button mini" 
      type="button"
      @click="shareOnTwitter()">
      <i class="twitter icon"></i>つぶやく
    </button>
  </div>
</template>

<script>
const twitter_url = "https://twitter.com/intent/tweet?url=https://finvoice.inabauer.blog&button_hashtag=課税事業者成り"

export default {
  methods: {
    shareOnTwitter() {
      this.openShareWindow(twitter_url)
    },
    openShareWindow(url) {
      window.open(url, 'sharewindow', 'width=550, height=450, personalbar=0, toolbar=0, scrollbars=1, resizable=!')
    }
  }
}
</script>