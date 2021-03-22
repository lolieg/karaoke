<template>
  <section class="section">
    <p v-if="!fetched || !playing">Waiting...</p>
    <div v-else class="lyrics content has-text-centered">
      <h3>LYRICS:</h3>
      <div v-for="line in lyrics" :key="lyrics.indexOf(line)">
        <h3 v-if="!line.lit && line.visible">{{ line.lyrics }}</h3>
        <h3 v-else-if="line.visible" style="color: green">{{ line.lyrics }}</h3>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    songName: {
      type: String,
      required: true,
    },
    artistName: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
    playing: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      lines: [],
      fetched: false,
    }
  },
  computed: {
    lyrics() {
      if (this.lines[0].notFound !== undefined) {
        return this.lines
      }
      const lyrics = [...this.lines]
      lyrics.map((line, index, array) => {
        let next = array[index + 3]
        if (next === undefined) {
          next = { seconds: 999 }
        }
        if (this.progress >= line.seconds - 1 && this.progress < next.seconds) {
          line.visible = true
        } else {
          line.visible = false
        }

        return line
        // let next = index + 3
        // if (next + 1 > array.length) {
        //   next -= 1
        // }
        // if (
        //   line &&
        //   array[next] &&
        //   line.seconds - 2 < this.progress &&
        //   array[next].seconds - 2 > this.progress
        // ) {
        //   line.lit = true
        //   line.visible = true
        // } else {
        //   line.lit = false
        //   line.visible = false
        // }
        // return line
      })
      return lyrics
    },
  },
  watch: {
    async songName() {
      await this.getSong()
    },
  },
  async mounted() {},
  methods: {
    async getSong() {
      this.fetched = false
      this.lines = []
      const unformattedLyrics = await this.$axios.$get(
        `/api/getLyrics?songName=${this.songName}&artistName=${this.artistName}`
      )
      if (unformattedLyrics.lrc === null) {
        this.lines.push({
          notFound: true,
          lyrics: 'No Lyrics Found',
          lit: true,
        })
      } else {
        unformattedLyrics.lrc.map((el) =>
          Object.assign(el, { lit: false, visible: false })
        )
        this.lines.push(...unformattedLyrics.lrc)
      }
      this.fetched = true
    },
  },
}
</script>
<style scoped>
.lyrics {
  white-space: pre;
  max-height: 10vh;
}
</style>
