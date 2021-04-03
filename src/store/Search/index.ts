import { Module } from 'vuex'
import { RootState, SearchMovies } from '@/store/types'
import { mutations } from '@/store/Search/mutations'
import { actions } from '@/store/Search/actions'

export const state: SearchMovies = {
  page: 1,
  perPage: 10,
  movies: [],
  total: 0
}

const namespaced = true

export const searchMovies: Module<SearchMovies, RootState> = {
  namespaced,
  state,
  mutations,
  actions
}
