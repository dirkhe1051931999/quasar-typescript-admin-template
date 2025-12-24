/* eslint-disable */
/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.config file > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/


import { createApp } from 'vue'







import '@quasar/extras/material-icons/material-icons.css'

import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'



import '@quasar/extras/animate/fadeIn.css'

import '@quasar/extras/animate/fadeOut.css'

import '@quasar/extras/animate/fadeInUp.css'

import '@quasar/extras/animate/fadeOutDown.css'

import '@quasar/extras/animate/slideInLeft.css'

import '@quasar/extras/animate/slideOutRight.css'


// We load Quasar stylesheet file
import 'quasar/dist/quasar.sass'





import createQuasarApp from './app.js'
import quasarUserOptions from './quasar-user-options.js'








const publicPath = `/v3-admin/`


async function start ({
  app,
  router
  
}, bootFiles) {
  
  let hasRedirected = false
  const getRedirectUrl = url => {
    try { return router.resolve(url).href }
    catch (err) {}

    return Object(url) === url
      ? null
      : url
  }
  const redirect = url => {
    hasRedirected = true

    if (typeof url === 'string' && /^https?:\/\//.test(url)) {
      window.location.href = url
      return
    }

    const href = getRedirectUrl(url)

    // continue if we didn't fail to resolve the url
    if (href !== null) {
      window.location.href = href
      window.location.reload()
    }
  }

  const urlPath = window.location.href.replace(window.location.origin, '')

  for (let i = 0; hasRedirected === false && i < bootFiles.length; i++) {
    try {
      await bootFiles[i]({
        app,
        router,
        
        ssrContext: null,
        redirect,
        urlPath,
        publicPath
      })
    }
    catch (err) {
      if (err && err.url) {
        redirect(err.url)
        return
      }

      console.error('[Quasar] boot error:', err)
      return
    }
  }

  if (hasRedirected === true) return
  

  app.use(router)

  

    

    
      app.mount('#q-app')
    
  

}

createQuasarApp(createApp, quasarUserOptions)

  .then(app => {
    // eventually remove this when Cordova/Capacitor/Electron support becomes old
    const [ method, mapFn ] = Promise.allSettled !== void 0
      ? [
        'allSettled',
        bootFiles => bootFiles.map(result => {
          if (result.status === 'rejected') {
            console.error('[Quasar] boot error:', result.reason)
            return
          }
          return result.value.default
        })
      ]
      : [
        'all',
        bootFiles => bootFiles.map(entry => entry.default)
      ]

    return Promise[ method ]([
      
      import(/* webpackMode: "eager" */ 'boot/i18n'),
      
      import(/* webpackMode: "eager" */ 'boot/axios'),
      
      import(/* webpackMode: "eager" */ 'boot/main')
      
    ]).then(bootFiles => {
      const boot = mapFn(bootFiles).filter(entry => typeof entry === 'function')
      start(app, boot)
    })
  })

