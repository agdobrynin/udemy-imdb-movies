import { ActionTree } from 'vuex'
import { getMovieById } from '@/services/api'
import { RootState, TopMoviesStore } from '@/store/types'
import MovieShortInfo from '@/models/MovieShortInfo'

export const actions: ActionTree<TopMoviesStore, RootState> = {
  async fetchData ({ commit, getters }): Promise<void> {
    const request = [...getters.favoriteIds].map((id: string) => getMovieById(id))
    const response = await Promise.all(request)
    const movies = response.reduce((acc: MovieShortInfo[], item) => {
      acc.push(new MovieShortInfo(item))

      return acc
    }, [])
    commit('setMovies', movies)
  }
}
