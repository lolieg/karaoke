<template>
  <section class="section">
    <b-field label="Message">
      <b-input
        id="text"
        v-model="text"
        type="textarea"
        disabled
        rows="5"
      ></b-input>
    </b-field>
    <b-field label="Send Message">
      <b-input
        v-model="message"
        @keypress.native.enter="sendMessage()"
      ></b-input>
      <b-button @click="sendMessage()">Send</b-button>
    </b-field>
  </section>
</template>
<script>
export default {
  props: {
    room: {
      type: Object,
      required: true,
    },
    socket: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      text: '',
      message: '',
    }
  },
  mounted() {
    this.socket.on('message', (resp) => {
      this.text += resp.author + ': ' + resp.message + '\n'
      const textarea = this.$el.querySelector('#text')
      textarea.scrollTop = textarea.scrollHeight
    })
  },
  methods: {
    async sendMessage() {
      if (this.isEmpty(this.message)) {
        return
      }
      await new Promise((resolve) =>
        this.socket.emit(
          'sendMessage',
          { message: this.message, room: this.room.id },
          (resp) => resolve(resp)
        )
      )
      this.message = ''
    },
    isEmpty(string) {
      return string.length === 0 || !string.trim() || string.length < 2
    },
  },
}
</script>
<style lang="scss">
#text {
  resize: none !important;
  background-color: #2e2e2e;
  color: white;
  border-color: #220070;
}
</style>
