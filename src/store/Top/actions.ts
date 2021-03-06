import { ActionTree } from 'vuex'
import { getMovieById } from '@/services/api'
import { RootState, TopMoviesStore } from '@/store/types'
import MovieShortInfo from '@/models/MovieShortInfo'
import { storeFavoritesId } from '@/store/Top/index'
import { MovieShortInfoResponseInterface } from '@/models/MovieShortInfoResponseInterface'

export const actions: ActionTree<TopMoviesStore, RootState> = {
  async fetchData ({ commit, getters }): Promise<void> {
    const request = getters.favoriteIdsOnPage.map((id: string) => getMovieById(id))
    const response: MovieShortInfoResponseInterface[] = await Promise.all(request)
    const movies = response.reduce((acc: MovieShortInfo[], item) => {
      acc.push(new MovieShortInfo(item))

      return acc
    }, [])
    commit('setMovies', movies)
  },

  addToFavorites ({ commit, state }, movie: MovieShortInfo): void {
    commit('addMovie', movie)
    storeFavoritesId(state)
  },

  removeFromFavorites ({ commit, state }, movie: MovieShortInfo): void {
    commit('deleteMovie', movie)
    storeFavoritesId(state)
  }
}
