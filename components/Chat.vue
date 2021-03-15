<template>
  <div>
    <b-field label="Message">
      <b-input
        id="text"
        v-model="text"
        type="textarea"
        disabled
        rows="5"
      ></b-input>
    </b-field>
    <b-field label="Message">
      <b-input
        v-model="message"
        @keypress.native.enter="sendMessage()"
      ></b-input>
    </b-field>
    <b-button @click="sendMessage()">Send</b-button>
  </div>
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
      await new Promise((resolve) =>
        this.socket.emit(
          'sendMessage',
          { message: this.message, room: this.room.id },
          (resp) => resolve(resp)
        )
      )
      this.message = ''
    },
  },
}
</script>
<style lang="scss">
.textarea {
  resize: none !important;
}
</style>
