/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %>
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue'
import App from './app.vue'

function destroyVue() {
  this.$destroy()
  document.removeEventListener('turbolinks:before-cache', destroyVue)
}

document.addEventListener('turbolinks:load', () => {
  let element = document.getElementById('hello')
  if (element != null) {
    let app = new Vue({
      beforeMount: function() {
        this.$originalElement = this.$el.outerHTML
        document.addEventListener('turbolinks:before-cache', destroyVue.bind(this))
      },
      destroyed: function() {
        this.$el.outerHTML = this.$originalElement
      },
      render: h => h(App),
    }).$mount('#hello')
  }
})
