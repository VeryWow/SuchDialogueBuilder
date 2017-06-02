<template lang="pug">
  div.test-component
    p {{ class_name }}
</template>

<script>
// import testing
import { TestClass } from '../modules/TestModule.js'

export default {
  data () {
    return {
      class_name: '',
    }
  },
  created () {
    // class instances testing
    this.cls = new TestClass()
    this.class_name = this.cls.name
  }
}
</script>
