<template lang="pug">
.lab-list-display.container.is-fluid
  b-loading(:active="labs.loading", :is-full-page="false")
  transition-group.columns.is-multiline(tag="div", appear, name="lab")
    .column(v-for="lab in shownLabs", :key="lab.url", :class="colClasses")
      a(:href="lab.url")
        article.lab.card
          .card-image
            figure.image.is-3by2
              img(:src="lab.image")
          .card-content
            .content
              h1.title.is-size-3 {{ lab.title }}
              .details(v-html="lab.content")
            .end-content
              .date published {{ lab.date | date }}
              b-taglist
                b-tag(v-for="tag in lab.tags", :key="tag") {{ tag }}
    .column(v-if="numLabsShown < labs.data.length", key="load-more", :class="colClasses")
      a.see-more(@click="loadMore")
        span load more...
    .column.has-text-centered(key="decoration-1", :class="colClasses")
        img(src="http://labs.minutelabs.io/assets/images/decorations/Rocket-Sheep.png", width="200")
</template>

<script>
import _debounce from 'lodash/debounce'
import Promise from 'bluebird'
import axios from 'axios'

function Resource( url, opts = {} ){

  const getter = axios.create({
    baseURL: url
    , timeout: 10000
    , ...opts
  })

  const fetch = _debounce(function(){
    this._promise = Promise.resolve( getter.get() )
      .then( res => {
        this.data = res.data
      })
      .catch( err => {
        this.error = err
      })
      .finally(() => {
        this.loading = false
      })
  }, 300)

  const resource = {
    data: []
    , loading: false
    , error: null
    , _promise: null
    , getter
    , fetch(){
      this.error = null
      this.loading = true
      fetch.call(this)
    }
  }

  return resource
}

export default {
  name: 'lab-list-display'
  // , props: {
  // }
  , data: () => ({
    labs: Resource('/labs.json')
    , numLabsShown: 4
  })
  , components: {
  }
  , mounted(){
    this.labs.fetch()
  }
  , computed: {
    shownLabs(){
      return this.labs.data.slice(0, this.numLabsShown)
    }
    , colClasses(){
      return [
        'is-one-quarter-fullhd'
        , 'is-one-third-desktop'
        , 'is-half-tablet'
      ]
    }
  }
  , methods: {
    loadMore(){
      this.numLabsShown += 3
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/styles/_variables.scss'
.lab-enter-active
  transition: opacity 1s ease
.lab-enter
  opacity: 0

.lab-list-display
  position: relative
  min-height: 300px
  padding: 1.5rem
  // max-width: $tablet * 2/3

  @media screen and (min-width: $tablet)
    &
      max-width: none

  .see-more
    height: 100%
    border: 2px dashed $grey-light
    color: darken($grey-light, 30)
    font-size: 2.5rem
    font-family: $family-monospace
    display: flex;
    align-items: center;
    justify-content: center;
    span
      text-align: center

    &:hover
      background: hsla(0, 0%, 100%, 0.5)
      color: hsl(hue($blue), 100%, 70%)
      border-style: solid
      border-color: hsl(hue($blue), 100%, 90%)

  .card
    height: 100%
    display: flex
    flex-direction: column
    flex-grow: stretch
  .lab
    position: relative

    .card-content
      flex: 1
      display: flex
      flex-direction: column

      .content
        flex: 1

      .end-content
        // display: flex
        flex-direction: row
        justify-self: flex-end
        flex-wrap: wrap
        align-items: flex-end
        margin-top: -1rem
        .tags
          float: left
          flex: 1
          margin-bottom: -0.25rem
          margin-top: 1rem
        .date
          display: inline-block
          float: right
          margin-top: 1rem
          color: $grey
          text-align: right
          justify-self: flex-end
          white-space: nowrap

    .card-image:before
      content: ''
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: hsla(hue($yellow), 70%, 5%, 0.75)
      z-index: 1
      opacity: 0

    .card-image:after
      content: 'Run the Lab'
      position: absolute
      left: 0
      right: 0
      top: 50%
      margin-top: -0.5em
      z-index: 2
      font-size: 2rem
      color: $grey-light
      font-family: $family-monospace
      text-shadow: 1px 1px 2px darken($blue, 5)
      vertical-align: middle
      text-align: center
      opacity: 0

    .card-image:before,
    .card-image:after
      transition: opacity 0.15s ease-in-out
    &:hover
      .card-image
        overflow: hidden
        img
          filter: blur(2px)
      .card-image:before,
      .card-image:after
        opacity: 1

  .title
    font-family: $family-monospace
</style>
