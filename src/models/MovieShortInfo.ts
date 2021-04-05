import { MovieShortInfoResponseInterface } from '@/models/MovieShortInfoResponseInterface'

export default class MovieShortInfo {
  public readonly id: string
  public readonly title: string
  public readonly year: string
  private readonly _posterImage: string

  constructor (response: MovieShortInfoResponseInterface) {
    this.id = response.imdbID
    this.title = response.Title
    this.year = response.Year
    this._posterImage = response.Poster
  }

  get posterImage (): string {
    return this._posterImage !== 'N/A' ? this._posterImage : require('../assets/logo.png')
  }
}
