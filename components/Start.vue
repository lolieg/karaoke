<template>
  <div>
    <section class="section">
      <div class="content"><h3>Create/Join Room</h3></div>
      <b-field label="Username">
        <b-input v-model="username"></b-input>
      </b-field>
      <b-field label="Join Code">
        <b-input v-model="code" placeholder="Needed to join"></b-input>
      </b-field>
      <b-button @click="joinRoom()">Join Room</b-button>
      <b-button @click="createRoom()">Create Room</b-button>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    socket: {
      // type: Object,
      required: true,
    },
  },
  data() {
    return {
      username: '',
      code: '',
    }
  },
  methods: {
    async createRoom() {
      const resp = await new Promise((resolve) =>
        this.socket.emit('createRoom', { username: this.username }, (resp) =>
          resolve(resp)
        )
      )
      this.$router.push('/rooms/' + resp.id)
    },
    async joinRoom() {
      if (this.isEmpty(this.code)) {
        return this.$toasts.toastDanger(
          'Please enter a code to join a room!',
          this.$buefy
        )
      }
      const resp = await new Promise((resolve) =>
        this.socket.emit(
          'joinRoom',
          { username: this.username, code: this.code },
          (resp) => resolve(resp)
        )
      )
      if (resp.status === 'invalid') {
        return this.$toasts.toastDanger(
          'This is not a valid invite Code!',
          this.$buefy
        )
      }
      this.$router.replace('/rooms/' + resp.id)
    },
    isEmpty(string) {
      return string.length === 0 || !string.trim() || string.length < 2
    },
  },
}
</script>
<style lang="scss"></style>
