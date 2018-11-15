<template lang="pug">
.tabs.is-centered.is-large
  slot
</template>

<script>
export default {
  name: 'ml-nav'
  // , props: {
  // }
  , data: () => ({
  })
  , components: {
  }
  // , computed: {
  // }
  , methods: {
  }
}
</script>

<style lang="sass" scoped>
@import '@/styles/_variables.scss'
.tabs
  font-family: $family-monospace
  ul, a
    border-bottom-width: 2px
  a
    margin-bottom: -2px

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

.tabs ul
  flex-direction: column

.tabs li
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

@media screen and (min-width: $tablet)
  .tabs ul
    flex-direction: row
</style>
