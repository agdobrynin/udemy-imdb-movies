import MovieShortInfo from '@/models/MovieShortInfo'
import { MovieFullInfoResponseInterface } from '@/models/MovieFullInfoResponseInterface'

export default class MovieFullInfo extends MovieShortInfo {
  public readonly description: string
  public readonly rating: number
  public readonly runtime: string
  public readonly genre: string;
  public readonly country: string;
  public readonly director: string;
  public readonly writer: string;
  public readonly awards: string;
  public readonly actors: string;

  constructor (response: MovieFullInfoResponseInterface) {
    super(response)
    this.description = response.Plot
    this.rating = Number(response.imdbRating)
    this.runtime = response.Runtime
    this.genre = response.Genre
    this.country = response.Country
    this.director = response.Director
    this.writer = response.Writer
    this.awards = response.Awards
    this.actors = response.Actors
  }
}
