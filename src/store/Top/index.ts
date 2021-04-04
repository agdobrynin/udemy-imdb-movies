import { Module } from 'vuex'
import { RootState, TopMoviesStore } from '@/store/types'
import { getters } from '@/store/Top/getters'
import { mutations } from '@/store/Top/mutations'
import { actions } from '@/store/Top/actions'

export const LOCALSTORAGE_KEY = 'app-imdb-movies-favorites'

export const storeFavoritesId = (state: TopMoviesStore): void => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state.favoritesId))
}

const restoreFavoritesId = (): string [] => {
  const storedFavoritesId = localStorage.getItem(LOCALSTORAGE_KEY)
  if (storedFavoritesId) {
    return JSON.parse(storedFavoritesId)
  }

  return []
}

export const state: TopMoviesStore = {
  favoritesId: restoreFavoritesId(),
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
