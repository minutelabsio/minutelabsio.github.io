// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Filters from './plugins/filters'
import Buefy from 'buefy'
import Affix from 'vue-affix'
import App from '@/app'
import MlLogo from '@/components/ml-logo'
import MlNav from '@/components/ml-nav'
import LabListDisplay from '@/components/lab-list-display'
import ResponsiveEmbed from '@/components/responsive-embed'

import './styles/main.scss'

Vue.use(Buefy, {
  // defaultContainerElement: '#app'
  // , defaultIconPack: 'fas'
})

Vue.use(Affix)

Vue.use(Filters)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app'
  , components: {
    App
    , MlLogo
    , MlNav
    , LabListDisplay
    , ResponsiveEmbed
  }
})
