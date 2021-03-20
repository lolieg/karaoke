<template>
  <div>
    <b-field label="Players">
      <ul>
        <li v-for="player in room.players" :key="player.id">
          <div class="card cards">
            <div class="card-content">
              <div class="columns">
                <div class="column">{{ player.username }}</div>
                <div v-if="isLeader && player.id !== socket.id" class="column">
                  <b-tooltip
                    label="Kick"
                    class="is-pulled-right"
                    position="is-left"
                    ><b-button
                      icon-left="karate"
                      @click="kick(player.id)"
                    ></b-button
                  ></b-tooltip>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </b-field>
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
  computed: {
    isLeader() {
      let found = false
      for (const player of this.room.players) {
        if (player.id === this.socket.id && player.leader) {
          found = true
          break
        }
      }
      return found
    },
  },
  methods: {
    async kick(id) {
      await new Promise((resolve) =>
        this.socket.emit('kickPlayer', { id, room: this.room.id })
      )
    },
  },
}
</script>
<style lang="scss">
.cards {
  margin: 1vh 5vh 1vh 1vh;
  width: 50%;
}
</style>
