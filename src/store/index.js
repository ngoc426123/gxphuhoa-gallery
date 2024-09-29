import Vue from 'vue'
import Vuex from 'vuex'

// MODULES
import albums from './modules/albums.js'
import images from './modules/images.js'
import lightbox from './modules/lightbox.js'

Vue.use(Vuex);

const modules = {
  albums,
  images,
  lightbox
};

for (let mod in modules) {
  modules[mod].namespaced = true
}

export default new Vuex.Store({
  modules
});