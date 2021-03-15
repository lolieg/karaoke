<template>
  <div>
    <start :socket="socket"></start>
  </div>
</template>

<script>
import Start from '~/components/Start.vue'
export default {
  components: { Start },
  data() {
    return {
      socket: null,
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
      persist: 'mySocket',
    })
  },
}
</script>
