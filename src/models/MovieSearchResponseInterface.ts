import { MovieShortInfoResponseInterface } from '@/models/MovieShortInfoResponseInterface'

export interface MovieSearchResponseInterface {
  Search: Readonly<MovieShortInfoResponseInterface[]>;
  readonly totalResults: number;
}
