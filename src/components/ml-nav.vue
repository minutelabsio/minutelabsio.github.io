<template lang="pug">
.ml-main-nav.tabs.is-centered.is-large
  affix(relative-element-selector="#viewport", :offset="{ top: height, bottom: 0 }")
    slot
</template>

<script>
import _debounce from 'lodash/debounce'
export default {
  name: 'ml-nav'
  // , props: {
  // }
  , data: () => ({
    height: 0
  })
  , components: {
  }
  , mounted(){
    this.adjust()

    window.addEventListener('resize', _debounce(() => this.adjust()), 20)
  }
  // , computed: {
  // }
  , methods: {
    adjust(){
      this.$el.style.height = ''
      this.height = this.$el.offsetHeight
      this.$el.style.height = this.height + 'px'
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/styles/_variables.scss'
.tabs
  font-family: $family-monospace
  font-size: 1.2rem

.tabs ul
  flex-direction: row
  // flex-direction: column

@media screen and (min-width: $tablet)
  .tabs
    font-size: 1.5rem
</style>

<style lang="sass">
@import '@/styles/_variables.scss'
.ml-main-nav
  ul, a
    border-bottom-width: 2px
  a
    margin-bottom: -2px
  .vue-affix
    background: $white
    z-index: 10
    width: 100%
    &.affix
      box-shadow: 0 1px 2px transparentize($black, 0.7)
      ul
        border-bottom-color: $white
      a
        border-bottom-color: transparent
      ul
        border-bottom-width: 0
  li
    position: relative
  li:after
    content: ''
    position: absolute
    bottom: -2px
    display: block
    height: 0px
    width: 100%
    transition: height 0.2s ease-in-out

  li:hover:after
    height: 5px
  li
    =ml-link($color)
      a
        transition: color 0.2s ease-in-out
      &:after
        background: $color
      &:hover a
        color: $color
        border-bottom-color: $grey-lighter
      &.is-active
        &:after
          display: none
        a
          color: $color
          border-bottom-color: $color

    &.ml-labs
      +ml-link($blue-dark)

    &.ml-support-us
      +ml-link($green-dark)

    &.ml-about
      +ml-link($red-orange-dark)
</style>
