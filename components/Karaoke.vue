<template>
  <div>
    <div v-if="isLeader">
      <song-selector
        v-if="!playing"
        @songSelected="songSelected"
      ></song-selector>
      <section class="section is-centered">
        <b-button v-if="playing" @click="stop()">Stop</b-button>
      </section>
    </div>
    <section class="section">
      <b-field label="Volume">
        <b-slider
          v-model="volume"
          type="is-link"
          @change="volumeChange()"
        ></b-slider>
      </b-field>
    </section>

    <lyrics
      :song-name="songName"
      :artist-name="artistName"
      :progress="progress"
      :playing="playing"
    ></lyrics>
  </div>
</template>
<script>
import Lyrics from './Lyrics.vue'
import SongSelector from './SongSelector.vue'
let sound = null
export default {
  components: {
    Lyrics,
    SongSelector,
  },
  props: {
    room: {
      type: Object,
      required: true,
    },
    socket: {
      type: Object,
      required: true,
    },
    isLeader: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      songName: '',
      artistName: '',
      songLength: '',
      volume: 10,
      progress: 0,
      playing: false,
    }
  },
  mounted() {
    setInterval(() => {
      if (sound) {
        this.progress = sound.currentTime
      }
    })
    this.socket.on('play', (data) => {
      this.songLength = data.songLength
      this.songName = data.songName
      this.artistName = data.artistName
      let n = 3
      const countdown = setInterval(() => {
        this.$toasts.toastSuccess(`${n}`, this.$buefy)
        n -= 1
        if (n === 0) {
          clearInterval(countdown)
        }
      }, 1000)
      const checkIfStarted = setInterval(() => {
        if (Date.now() >= data.startTime) {
          this.play()
          clearInterval(checkIfStarted)
        }
      }, 1)
    })
    this.socket.on('stop', (data) => {
      if (sound) {
        this.playing = false
        sound.pause()
        sound = null
        this.progress = 0
      }
    })
  },
  methods: {
    async songSelected(songName, artistName, length) {
      await new Promise((resolve) =>
        this.socket.emit(
          'play',
          {
            room: this.room.id,
            songName,
            artistName,
            songLength: length,
          },
          (resp) => resolve(resp)
        )
      )
    },
    play() {
      if (!sound) {
        sound = new Audio(
          require(`../assets/songs/${this.songName} - ${
            this.artistName
          } - ${this.songLength.replace(':', '.')}.mp3`)
        )
        sound.addEventListener('ended', () => {
          this.playing = false
          this.sound = null
        })
      }
      sound.volume = this.volume / 100
      sound.play()
      this.playing = true
    },
    async stop() {
      await new Promise((resolve) =>
        this.socket.emit(
          'stop',
          {
            room: this.room.id,
          },
          (resp) => resolve(resp)
        )
      )
    },
    volumeChange() {
      if (sound) {
        sound.volume = this.volume / 100
      }
    },
  },
}
</script>
<style></style>
