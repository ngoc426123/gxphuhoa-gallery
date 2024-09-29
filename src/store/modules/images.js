import api from '../../api/index'
import { callAPI } from '../../utils/https'

export default {
  state: {
    name: '',
    sl: '',
    date: '',
    images: [],
  },

  getters: {

  },

  mutations: {
    name: (state, data) => state.name = data,
    sl: (state, data) => state.sl = data,
    date: (state, data) => state.date = data,
    images: (state, data) => state.images = data,
  },

  actions: {
    getAlbumsDetail: async function ({commit}, data) {
      commit('images', []);
      const param = {
        slug: data.slug
      }
      const ret = await callAPI(api.images, param);

      commit('name', ret.name);
      commit('sl', ret.sl);
      commit('date', ret.date);
      commit('images', ret.images);
    }
  },
}