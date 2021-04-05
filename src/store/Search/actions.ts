import { ActionTree } from 'vuex'
import { searchMovies } from '@/services/api'
import { RootState, SearchMovies } from '@/store/types'
import { MovieSearchResponseInterface } from '@/models/MovieSearchResponseInterface'
import MovieShortInfo from '@/models/MovieShortInfo'

export const actions: ActionTree<SearchMovies, RootState> = {
  async fetchData ({ commit, state }, queryString: string): Promise<void> {
    commit('addMovies', [])
    const res: MovieSearchResponseInterface = await searchMovies(queryString, state.page)
    commit('setTotal', Number(res.totalResults))

    const movies = res.Search.reduce((acc: MovieShortInfo[], item) => {
      acc.push(new MovieShortInfo(item))

      return acc
    }, [])

    commit('addMovies', movies)
  }
}
