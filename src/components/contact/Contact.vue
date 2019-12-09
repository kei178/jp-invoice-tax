<template>
  <div class="ui segment basic">
    <template v-if="!isSubmitted">
      <div class="ui feed">
        <div class="event">
          <div class="label">
            <img src="https://avatars0.githubusercontent.com/u/20009662?s=460&v=4" class="ui circular image">
          </div>
          <div class="content">
            当シミュレーターについてのご意見や、業務のご依頼・ご相談はこちらからお気軽にどうぞ。
          </div>
        </div>
      </div>
      <div class="ui divider hidden"></div>
      <div class="ui form">
        <div class="field">
          <label>名前*</label>
          <input 
                  type="text" 
                  name="name" 
                  v-model="contactData.name"
                  placeholder="" 
                  autofocus="true">
        </div>
        <div class="field" :class="{error: !validEmail}">
          <label>
            メールアドレス*
            <span 
              v-show="!validEmail"
              class="ui horizontal left pointing red basic label"
              style="margin-left: 0.75rem;">フォーマットが間違っています</span>
          </label>
          <input 
                  type="email" 
                  name="email"
                  v-model="contactData.email"
                  @change="validateEmail()"
                  placeholder="">
        </div>
        <div class="field">
          <label>件名*</label>
          <input 
                  type="text" 
                  name="subject" 
                  v-model="contactData.subject"
                  placeholder="どのような内容ですか？">
        </div>
        <div class="field">
          <label>メッセージ*</label>
          <textarea 
                  name="message" 
                  v-model="contactData.message"
                  placeholder="詳細を記載してください。"></textarea>
        </div>
        <div class="two fields">
          <div class="field">
            <router-link to="/" tag="div" class="ui button left floated">戻る</router-link>
          </div>
          <div class="field">
            <div 
              class="ui blue button right floated" 
              :class="{disabled: !isSubmittable}"
              @click="submitForm">送信</div>
          </div>
        </div>
        <div class="indetext">
          <input 
                  type="text"
                  name="z_zip"
                  v-model="honeypot">
        </div>
      </div>
    </template>
    <div 
      v-else 
      id="thank-you"
      class="ui segment basic center aligned">
      <h2 class="ui icon header">
        <i class="check circle icon teal"></i>
        <div class="content">
          送信しました
          <div class="sub header">返答には数日要する場合があります</div>
        </div>
      </h2>
      <table class="ui table">
        <tr>
          <td>名前：</td>
          <td>{{ contactData.name }}</td>
        </tr>
        <tr>
          <td>メールアドレス：</td>
          <td>{{ contactData.email }}</td>
        </tr>
        <tr>
          <td>件名：</td>
          <td>{{ contactData.subject }}</td>
        </tr>
          <tr>
          <td>メッセージ：</td>
          <td style="white-space: pre;">{{ contactData.message }}</td>
        </tr>
      </table>
      <router-link to="/" tag="div" class="ui button">戻る</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data(){
    return {
      contactData: {
        name:    '', 
        email:   '',
        subject: '',
        message: ''
      },
      isSubmitted: false,
      honeypot:    '',
      validEmail:  true // empty is true
    }
  },
  computed: {
    isSubmittable() {
      return this.inputAllPresent && this.validEmail
    },
    inputAllPresent() {
      const d = this.contactData
      return (d.name && d.email && d.subject && d.message) ? true : false
    },
    contactMsg() {
      return this.contactData.name + "さんからの問い合わせ" +
             "\n" + this.contactData.email +
             "\n件名: " + this.contactData.subject +
             "\n" + this.contactData.message           
    }
  },
  methods: {
    validateEmail() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      this.validEmail = this.contactData.email == '' || re.test(this.contactData.email)
    },
    isHoneypotEmpty() {
      return this.honeypot === ''
    },
    submitForm() {
      if(confirm('こちらの内容で送信しますか？')) {
        console('honeypot', this.honeypot)
        console(process.env.VUE_APP_TELEGRAM_CHAT_ID)
        if(this.isHoneypotEmpty()) this.notifyTelegram()
      }
    },
    notifyTelegram() {
      const base_url = 'https://api.telegram.org/bot',
            token = process.env.VUE_APP_TELEGRAM_TOKEN,
            method = '/sendMessage',
            url = base_url + token + method,
            chat_id = process.env.VUE_APP_TELEGRAM_CHAT_ID,
            data = {
              chat_id:    chat_id, 
              text:       this.contactMsg,
              parse_mode: 'HTML'
            }
      axios.post(url, data, {
        headers: {'Content-Type': 'application/json'},
      })
      .then(res => this.isSubmitted = true)
      .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
  .ui.segment {
    padding-top: 2rem;
  }
  .indetext{
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }
</style>  