import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '@/store/types'
import { topMovies } from '@/store/Top'
import { searchMovies } from '@/store/Search'
import { mutations as rootMutation } from '@/store/Root/mutations'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    inProgress: false,
    notification: null
  },
  mutations: rootMutation,
  modules: {
    topMovies,
    searchMovies
  }
}
export default new Vuex.Store<RootState>(store)
