import { Module } from 'vuex'
import { RootState, TopMoviesStore } from '@/store/types'
import { getters } from '@/store/Top/getters'
import { mutations } from '@/store/Top/mutations'
import { actions } from '@/store/Top/actions'

export const state: TopMoviesStore = {
  favoritesId: [
    'tt0407362',
    'tt0991178',
    'tt1286130',
    'tt1704292'
  ],
  page: 1,
  perPage: 8,
  movies: []
}

const namespaced = true

export const topMovies: Module<TopMoviesStore, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
