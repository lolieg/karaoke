<template>
  <div>
    <section id="mainFrame" class="section">
      <div>
        <nuxt></nuxt>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
<style lang="scss">
html,
body {
  background-color: #051e3e;
  background-image: url('../assets/Background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: #c3d1e6;
  overflow: hidden;
}
.content h3 {
  color: #c3d1e6;
}
.label {
  color: #c3d1e6;
}
#mainFrame {
  background-color: #be9b7b;
  border-style: solid;
  border-color: black;
  right: 20vh;
  left: 20vh;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  margin: 0;
  position: absolute;
}
</style>
