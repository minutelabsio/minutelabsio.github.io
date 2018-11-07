<template lang="pug">
.ml-logo
  img(width="100", src="@/../assets/images/logos/logo-minutelabs-no-text-100x100.png", alt="MinuteLabs.io")
  img.flicker(v-show="flicker", width="136", height="129", src="@/../assets/images/loader/logo-loading-small.gif")
</template>

<script>
export default {
  name: 'ml-logo'
  // , props: {
  // }
  , data: () => ({
    flicker: false
    , timeout: null
  })
  , components: {
  }
  , mounted(){
    // preload
    this.initLogoFlicker()
  }
  , destroyed(){
    clearTimeout(this.timeout)
  }
  // , computed: {
  // }
  , methods: {
    initLogoFlicker(){
      var light = this.$el
      if (!light) { return }

      this.flicker = true

      setTimeout(() => {
        this.flicker = false
      }, 1400)

      var randomDelay = (((Math.random() * 6) | 0) + 10) * 1000
      this.timeout = setTimeout(() => this.initLogoFlicker(), randomDelay)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/styles/_variables.scss'
.ml-logo
  position: relative
  width: 96px

  &,
  img
    display: block
    margin: auto

    &.flicker
      display: block
      position: absolute
      top: -33.4px
      left: -21px
      max-width: none
</style>
