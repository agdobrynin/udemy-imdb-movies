import { MutationTree } from 'vuex'
import { SearchMovies } from '@/store/types'
import MovieShortInfo from '@/models/MovieShortInfo'

export const mutations: MutationTree<SearchMovies> = {
  addMovies (state, movies: MovieShortInfo[]) {
    state.movies = movies
  },

  resetMovies (state) {
    state.movies = []
    state.page = 1
    state.total = 0
  },

  setPage (state, page: number): void {
    state.page = page
  },

  setTotal (state, total: number): void {
    state.total = total
  },

  setPerPage (state, perPage: number): void {
    state.perPage = perPage
  }
}
