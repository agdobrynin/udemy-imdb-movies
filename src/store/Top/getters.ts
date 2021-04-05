import { GetterTree } from 'vuex'
import { RootState, TopMoviesStore } from '@/store/types'

export const getters: GetterTree<TopMoviesStore, RootState> = {
  total ({ favoritesId }): number {
    return favoritesId.length
  },

  favoriteIdsOnPage ({ favoritesId, page, perPage }): string[] {
    const startOffset = page * perPage - perPage

    return [...favoritesId].splice(startOffset, perPage)
  }
}
