<template lang="pug">
.app
  .top-nav
    slot(name="header")
  .main-container
    slot
  .footer-container
    .section
      .container
        slot(name="footer")
</template>

<script>
export default {
  name: 'app'
  // , props: {
  // }
  // , data: () => ({
  // })
  , components: {
  }
  , created(){
  }
  // , computed: {
  // }
  , methods: {
  }
}
</script>

<style lang="sass" scoped>
@import '@/styles/_variables.scss'
.app
  background: hsl(hue($cyan), 100%, 99%)
  min-height: 100vh
  display: flex
  flex-direction: column
.main-container
  flex: 1
  display: flex
  flex-direction: column
.top-nav
  background: white
  ul li
    display: inline-block
.site-search
  position: absolute
  top: 0
  right: 0
  margin: 1em
  z-index: 2
.footer-container
  background: $black
  color: $white
  .heading
    color: $white
  a
    color: lighten($primary, 10)
.logo
  text-align: center
  font-family: $family-monospace
  font-size: 1.625em
  line-height: 1.38462em
  margin: 0.5em 0 0.8em
  font-weight: normal

  small
    font-size: 1em
    color: darken($grey-light, 16)
</style>
