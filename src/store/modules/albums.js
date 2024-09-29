import api from '../../api/index'
import { callAPI } from '../../utils/https'

export default {
  state: {
    page: 1,
    limit: 23,
    isMore: true,
    isLoading: false,
    listAlbums: [],
  },

  getter: {

  },

  mutations: {
    page: (state, data) => state.page = data,
    isMore: (state, data) => state.isMore = data,
    isLoading: (state, data) => state.isLoading = data,
    listAlbums: (state, data) => {
      data.forEach((item) => {
        state.listAlbums.push(item);
      });
    },
    emptyAlbum: (state) => state.listAlbums = [],
  },

  actions: {
    incrPage: function ({commit}, data) {
      commit('page', data);
    },

    getListAlbums: async function ({state, commit}) {
      const param = {
        page: state.page,
        limit: state.limit,
      }

      commit('isLoading', true);
      const ret = await callAPI(api.albums, param);

      setTimeout(() => {
        commit('listAlbums', ret.data);
        commit('isLoading', false);
        commit('isMore', ret.ismore);
      }, 1000);
    }
  },
}