<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>{{ name }}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Hello',
        name: 'Very Wow!'
      }
    }
  }
</script>

<style>
  body {
    font : 100% Helvetica, sans-serif;
    color: #ecf0f1;
    text-align: center;
    background-color: #34495e;
  }
</style>
