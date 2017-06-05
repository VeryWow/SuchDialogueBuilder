<template lang="pug">
  div.test-component
    p {{ class_name }}
    a.button(@click="modal({ name: 'first_modal', show: true })") Bulma button

    //- Modal testing
    b-modal(:active.sync="modals.first_modal.show", :width="640")
      .card
        .card-image
          figure.image.is-4by3
            img(src="http://lorempixel.com/1280/960/" alt="Image")
        .card-content
          .media
            .media-left
              figure.image.is-48x48
                img(src="http://lorempixel.com/1280/960/" alt="Image")
            .media-content
              p.title.is-4 John Smith
              p.subtitle.is-6 @johnsmith
          .content
            |Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
            br
            small 11:09 PM - 1 Jan 2016
</template>

<script>
// import testing
import { TestClass } from '../modules/TestModule.js'

export default {
  data () {
    return {
      class_name: '',
      modals: {
        first_modal: {
          show: false,
          data: {}
        }
      }
    }
  },
  created () {
    // class instances testing
    this.cls = new TestClass()
    this.class_name = this.cls.name
  },
  methods: {
    modal (params) {
      let m_name = params.name
      let data = params.data || {}
      if (this.modals && this.modals[m_name]) {
        this.modals[m_name].show = params.show
        this.modals[m_name].data = data
      }
    }
  }
}
</script>
