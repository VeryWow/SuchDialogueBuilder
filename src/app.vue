<template lang="pug">
  div.app
    h1 {{ msg }}
    p.ddd {{ name }}
    test-component
</template>

<script>
// inner components testing
import TestComponent from './components/TestComponent.vue'

export default {
  components: {
    TestComponent
  },
  data () {
    return {
      msg: 'Hello, my friend!',
      name: 'Very Wow! Such friend'
    }
  }
}
</script>
