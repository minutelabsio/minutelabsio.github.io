<template lang="pug">
.wrap
  form(action="/search", method="GET")
    b-field
      b-input(type="text", name="q", autocomplete="off", placeholder="whatcha lookin' for?")
      button.button(type="submit") search
</template>

<script>
export default {
  name: 'site-search'
  // , props: {
  // }
  // , data: () => ({
  // })
  // , computed: {
  // }
  // , components: {
  // }
  // , methods: {
  // }
}
</script>

<style lang="sass" scoped>
@import '@/styles/_variables.scss'
</style>
