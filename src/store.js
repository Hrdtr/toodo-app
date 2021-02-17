import { createStore } from 'vuex'
import appwrite from "./appwrite";

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false

export const store = createStore({
  state () {
    return {
      loading: true,
      isLoggedIn: isLoggedIn,
      user: null,
      projects: [],
      tasks: []
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setIsLoggedIn (state, payload) {
      state.isLoggedIn = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setProjects (state, payload) {
      state.projects = payload
    },
    setTasks (state, payload) {
      state.tasks = payload
    },
  },
  actions: {
    authCheck ({ commit }) {
      appwrite.account.get()
        .then((res) => {
          commit('setUser', res)
          commit('setIsLoggedIn', true)
          localStorage.setItem('isLoggedIn', 'true')
        })
        .catch((error) => {
          commit('setUser', null)
          commit('setIsLoggedIn', false)
          localStorage.setItem('isLoggedIn', 'false')
          console.log(error)
        })
    },
    fetchData ({ commit }) {
      appwrite.database.listDocuments('6027d9bbdcb36')
        .then((res) => {
          commit('setLoading', false)
          const handleEmptyTask = res.documents.map((p) => {
            if (p.tasks === undefined) {
              return { ...p, tasks: [] }
            } else {
              return { ...p }
            }
          })
          commit('setProjects', handleEmptyTask)
          const taskArr = handleEmptyTask.map((p) => {
            return p.tasks.map((t) => {
              return {
                ...t,
                project: p.name,
                projectId: p.$id,
                expanded: false
              }
            })
          })
          const tasks = Array.prototype.concat.apply([], taskArr)
          commit('setTasks', JSON.parse(JSON.stringify(tasks.sort((a, b) => a.status - b.status))))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})