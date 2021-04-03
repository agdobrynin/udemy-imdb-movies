import axios, { AxiosResponse } from 'axios'
import { MovieFullInfoResponseError } from '@/models/MovieFullInfoResponseError'
import { MovieSearchResponseInterface } from '@/models/MovieSearchResponseInterface'
import { MovieSearchResponseErrorInterface } from '@/models/MovieSearchResponseErrorInterface'
import { MovieFullInfoResponseInterface } from '@/models/MovieFullInfoResponseInterface'

export const omdbApi = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  params: {
    apikey: process.env.VUE_APP_API_KEY
  }
})

export enum TypePlot {
  FULL= 'full',
  SHORT = 'short'
}

export async function getMovieById (imDbId: string, typePlot: TypePlot = TypePlot.SHORT): Promise<MovieFullInfoResponseInterface> {
  try {
    const response: AxiosResponse = await omdbApi.get(`/?i=${imDbId}&plot=${typePlot}`)
    const result: MovieFullInfoResponseError | MovieFullInfoResponseInterface = response.data

    if ('Error' in result && result?.Error) {
      const responseError = result as MovieSearchResponseErrorInterface
      throw new Error(responseError.Error)
    }

    return result as MovieFullInfoResponseInterface
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function searchMovies (queryString: string, page: number): Promise<MovieSearchResponseInterface> {
  try {
    const response: AxiosResponse = await omdbApi.get(`/?s=${queryString}&page=${page}`)
    const result: MovieSearchResponseErrorInterface | MovieSearchResponseInterface = response.data

    if ('Error' in result && result?.Error) {
      const responseError = result as MovieSearchResponseErrorInterface
      throw new Error(responseError.Error)
    }

    return result as MovieSearchResponseInterface
  } catch (error) {
    throw new Error(error.message)
  }
}
