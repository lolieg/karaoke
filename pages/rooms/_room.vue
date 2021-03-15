<template>
  <div>
    <p v-if="!fetched" class="has-text-centered">Loading...</p>
    <div v-else>
      <h1>{{ room }}</h1>
      <players :room="room" :socket="socket"></players>
      <chat :room="room" :socket="socket"></chat>
      <karaoke :room="room" :socket="socket" :is-leader="isLeader"></karaoke>
    </div>
  </div>
</template>
<script>
import Chat from '~/components/Chat.vue'
import Karaoke from '~/components/Karaoke.vue'
import Players from '~/components/Players.vue'
export default {
  components: {
    Karaoke,
    Chat,
    Players,
  },
  middleware: 'roomExists',
  data() {
    return {
      fetched: false,
      room: null,
    }
  },
  async fetch() {
    const roomId = this.$route.params.room
    this.socket = this.$nuxtSocket({
      channel: '/',
      persist: 'mySocket',
    })
    this.room = await new Promise((resolve) =>
      this.socket.emit('getRoom', { id: roomId }, (resp) => resolve(resp))
    )
    let found = false
    for (const player of this.room.players) {
      if (player.id === this.socket.id) {
        found = true
      }
    }
    if (!found) {
      this.$router.push('/')
    }
    this.fetched = true
  },
  computed: {
    isLeader() {
      for (const player of this.room.players) {
        if (player.id === this.socket.id && player.leader) {
          return true
        }
      }
      return false
    },
  },
  fetchOnServer: false,
  mounted() {
    window.onbeforeunload = function () {
      return 'Are you sure?'
    }
    this.socket.on('roomChange', (data) => {
      this.room = data.room
    })
    // TODO Doesn't yet work when user goes back a page
    this.socket.on('roomDelete', (data) => {
      this.socket.disconnect()
      this.socket.connect()
      this.$router.replace('/')
    })
    this.socket.on('roomLeave', (data) => {
      if (this.socket.id === data.id) {
        this.socket.disconnect()
        this.socket.connect()
        this.$router.replace('/')
        setTimeout(
          () => this.$toasts.toastDanger('You have been kicked!', this.$buefy),
          500
        )
      }
    })
  },
}
</script>
<style></style>
