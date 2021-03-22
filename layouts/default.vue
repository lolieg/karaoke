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
  margin-right: 20vh;
  margin-left: 20vh;
  margin-top: 10vh;
  margin-bottom: 10vh;
  position: relative;
}
@import '~bulma/sass/utilities/_all';

$input-background-color: #2e2e2e;
$input-border-color: #220070;
$input-focus-border-color: #00ed67;
$input-color: white;

$button-background-color: #2e2e2e;
$button-color: white;
$button-border-color: #220070;
$button-focus-border-color: #00ed67;

$table-color: white;
$table-head-cell-color: white;
$table-background-color: #2e2e2e;

$card-color: white;
$card-background-color: #2e2e2e;

@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>
