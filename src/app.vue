<template lang="pug">
  div
    h1 {{ msg }}
    p {{ name }}
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Hello1',
        name: 'Very Wow!'
      }
    }
  }
</script>

<style lang="scss">
  body {
    font : 100% Helvetica, sans-serif;
    text-align: center;
    background-color: #34495e;
    &.bad {
      color: #ecf0f1;
    }
  }
</style>
