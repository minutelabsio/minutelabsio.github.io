<template lang="pug">
.wrap
  p Hello World wee
</template>

<script>
export default {
  name: 'Test'
  , props: {
  }
  , data: () => ({

  })
  , computed: {
  }
  , created(){
    console.log('hello')
  }
  , components: {
  }
  , methods: {
  }
}
</script>

<style lang="sass" scoped>
@import '@/styles/_variables.scss'
.test
  background: red
</style>
