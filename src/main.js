// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Filters from './plugins/filters'
import Buefy from 'buefy'
import Test from '@/components/test'

import './styles/main.scss'

Vue.use(Buefy, {
  // defaultContainerElement: '#app'
  // , defaultIconPack: 'fas'
})

Vue.use(Filters)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app'
  , data: () => ({
  })
  , components: {
    // simple hack to run vue on existing html
    app: { template: '<div><slot></slot></div>' }
    , Test
  }
  , computed: {
  }
})
