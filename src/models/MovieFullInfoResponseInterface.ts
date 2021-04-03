import { MovieShortInfoResponseInterface } from '@/models/MovieShortInfoResponseInterface'

export interface MovieFullInfoResponseInterface extends MovieShortInfoResponseInterface {
  Plot: string;
  imdbRating: number;
  Runtime: string;
  Genre: string;
  Production: string;
  Awards: string;
  Country: string;
  Director: string;
  Writer: string;
  Actors: string;

}
