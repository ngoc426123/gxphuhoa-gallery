export default {
  state: {
    src: '',
    isShow: false,
    isLoad: false,
  },

  getters: {

  },

  mutations: {
    src: (state, data) => state.src = data,
    isShow: (state, data) => state.isShow = data,
    isLoad: (state, data) => state.isLoad = data,
  },

  actions: {
    setSrc: ({commit}, data) => commit('src', data),
    setIsShow: ({commit}, data) => commit('isShow', data),
    setIsLoad: ({commit}, data) => commit('isLoad', data),
  },
}