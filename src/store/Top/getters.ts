import { GetterTree } from 'vuex'
import { RootState, TopMoviesStore } from '@/store/types'
import MovieShortInfo from '@/models/MovieShortInfo'

export const getters: GetterTree<TopMoviesStore, RootState> = {
  total ({ favoritesId }): number {
    return favoritesId.length
  },

  movies ({ movies }): MovieShortInfo[] {
    return movies
  },

  favoriteIds ({ favoritesId, page, perPage }): string[] {
    const startOffset = page * perPage - perPage

    return [...favoritesId].splice(startOffset, perPage)
  }
}
