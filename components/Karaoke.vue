<template>
  <div>
    <div v-if="isLeader">
      <song-selector
        v-if="!playing"
        @songSelected="songSelected"
      ></song-selector>
      <b-button @click="stop()">Stop</b-button>
    </div>
    <b-field label="Volume">
      <b-slider v-model="volume" @change="volumeChange()"></b-slider>
    </b-field>
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
  watch: {
    async songName() {
      if (!this.playing) {
        await this.play()
      }
    },
    async artistName() {
      if (!this.playing) {
        await this.play()
      }
    },
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
    })
  },
  methods: {
    songSelected(songName, artistName, length) {
      this.songName = songName
      this.artistName = artistName
      this.songLength = length
    },
    async play() {
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
      await new Promise((resolve) =>
        this.socket.emit(
          'play',
          {
            room: this.room.id,
            songName: this.songName,
            artistName: this.artistName,
            songLength: this.songLength,
          },
          (resp) => resolve(resp)
        )
      )
    },
    stop() {
      if (sound) {
        this.playing = false
        this.sound = null
      }
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
