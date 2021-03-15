<template>
  <div>
    <!-- <b-button @click="start()">Start Recording</b-button>
    <b-button @click="stop()">Stop Recording</b-button> -->
  </div>
</template>
<script>
// const RecordRTC = require('recordrtc')
// const ss = require('socket.io-stream')
// let recordAudio = null
export default {
  data() {
    return {
      socketStream: null,
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      persist: 'mySocket',
    })
    // this.socketStream = ss(this.socket)
    // this.socketStream.on('streamBack', (stream, data) => {
    //   console.log('incoming')
    //   const audioCtx = new AudioContext()
    //   const audio = audioCtx.createBufferSource()
    //   const parts = []
    //   stream.on('data', function (chunk) {
    //     parts.push(chunk)
    //   })
    //   stream.on('end', async function () {
    //     const blob = new Blob(parts)
    //     const arrayBuffer = await blob.arrayBuffer()
    //     const buffer = await audioCtx.decodeAudioData(arrayBuffer)
    //     audio.buffer = buffer
    //   })
    //   audio.connect(audioCtx.destination)
    //   audio.start()
    // })
  },
  methods: {
    // start() {
    //   const socketStream = this.socketStream
    //   navigator.getUserMedia(
    //     {
    //       audio: true,
    //     },
    //     function (stream) {
    //       recordAudio = RecordRTC(stream, {
    //         type: 'audio',
    //         mimeType: 'audio/wav',
    //         sampleRate: 44100,
    //         desiredSampRate: 16000,
    //         recorderType: RecordRTC.StereoAudioRecorder,
    //         numberOfAudioChannels: 1,
    //         // 1)
    //         // get intervals based blobs
    //         // value in milliseconds
    //         // as you might not want to make detect calls every seconds
    //         timeSlice: 1000,
    //         // 2)
    //         // as soon as the stream is available
    //         ondataavailable(blob) {
    //           // 3
    //           // making use of socket.io-stream for bi-directional
    //           // streaming, create a stream
    //           const stream = ss.createStream()
    //           // stream directly to server
    //           // it will be temp. stored locally
    //           socketStream.emit('stream', stream, {
    //             name: 'stream.wav',
    //             size: blob.size,
    //           })
    //           // pipe the audio blob to the read stream
    //           ss.createBlobReadStream(blob).pipe(stream)
    //         },
    //       })
    //       recordAudio.startRecording()
    //     },
    //     function (error) {
    //       console.error(JSON.stringify(error))
    //     }
    //   )
    // },
    // stop() {},
  },
}
</script>
<style lang=""></style>
