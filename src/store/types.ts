import MovieShortInfo from '@/models/MovieShortInfo'

export interface notificationItem {
  title?: string;
  message: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info';
}

export interface RootState {
  inProgress: boolean;
  notification: notificationItem | null;
}

export interface TopMoviesStore {
  favoritesId: string[];
  perPage: number;
  page: number;
  movies: MovieShortInfo[];
}

export interface SearchMovies {
  perPage: number;
  page: number;
  total: number;
  movies: MovieShortInfo[]
}
