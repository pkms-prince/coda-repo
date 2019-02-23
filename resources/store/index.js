export const state = () => ({
  songs: [],
  list: []
})

export const mutations = {

  setSongs (state, songs) {
    state.songs = songs
  },
  add (state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.songs) {
      commit('setSongs', req.songs)
    }
  }
}
