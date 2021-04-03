import { MovieShortInfoResponseInterface } from '@/models/MovieShortInfoResponseInterface'

export default class MovieShortInfo {
  public readonly id: string
  public readonly title: string
  public readonly year: string
  private readonly _imgSrc: string

  constructor (response: MovieShortInfoResponseInterface) {
    this.id = response.imdbID
    this.title = response.Title
    this.year = response.Year
    this._imgSrc = response.Poster
  }

  get imgSrc () {
    return this._imgSrc !== 'N/A' ? this._imgSrc : ''
  }
}
