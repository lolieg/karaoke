<template>
  <section class="section">
    <b-table :data="songs" :paginated="true" per-page="4">
      <b-table-column
        v-slot="props"
        field="song_name"
        label="Song Name"
        searchable
        sortable
        >{{ props.row.song_name }}</b-table-column
      >
      <b-table-column
        v-slot="props"
        field="artist_name"
        label="Artist Name"
        searchable
        sortable
        >{{ props.row.artist_name }}</b-table-column
      >
      <b-table-column v-slot="props" field="length_" label="Song Length">{{
        props.row.length_
      }}</b-table-column>
      <b-table-column v-slot="props" label="Play"
        ><b-button
          @click="
            songSelected(
              props.row.song_name,
              props.row.artist_name,
              props.row.length_
            )
          "
          >Play</b-button
        ></b-table-column
      >
    </b-table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      songs: [],
    }
  },
  async mounted() {
    const unformattedSongs = await this.$axios.$get(`/api/getSongs`)
    unformattedSongs.forEach((el) => {
      const [songName, artistName, length] = el.split(' - ', 3)
      this.songs.push({
        song_name: songName,
        artist_name: artistName,
        length_: length.replace('.', ':'),
      })
    })
  },
  methods: {
    songSelected(songName, artistName, length) {
      this.$emit('songSelected', songName, artistName, length)
    },
  },
}
</script>
<style lang="scss"></style>
