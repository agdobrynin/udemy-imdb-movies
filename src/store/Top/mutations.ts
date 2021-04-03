import { MutationTree } from 'vuex'
import { TopMoviesStore } from '@/store/types'
import MovieShortInfo from '@/models/MovieShortInfo'

export const mutations: MutationTree<TopMoviesStore> = {
  setMovies (state, movies: MovieShortInfo[]) {
    state.movies = movies
  },

  addMovie (state, movie: MovieShortInfo) {
    state.favoritesId.push(movie.id)
  },

  deleteMovie (state, movie: MovieShortInfo) {
    state.favoritesId = state.favoritesId.filter((favoriteId) => movie.id !== favoriteId)
  },

  setPage (state, page: number): void {
    state.page = page
  }
}
