<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <p>Type part of movie name and press <strong>"Enter"</strong>
            key or click on <strong>"Search"</strong> button for start search</p>
          <b-form inline @submit.prevent="doSearch">
            <b-form-input v-model="queryString" debounce="500" placeholder="Enter movie name"/>
            <b-button type="submit" variant="primary" class="ml-2">Search</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
    <b-container class="pt-5">
      <b-row v-if="total" cols-xl="4" cols-lg="3" cols-md="2" cols-sm="1" align-h="center">
        <b-col v-for="movie in movies" :key="movie.id" class="d-flex align-items-stretch">
          <movie-card
            :movie="movie"
            actionTitle="❤"
            @emit-action-movie="onAddToFavorites"
            @emit-description-movie="onDescriptionMovie"></movie-card>
        </b-col>
        <movie-info
          v-if="currentMovie"
          :movie="currentMovie"
          @emit-movie-info-close="onCloseMovieInfoModal"/>
      </b-row>
      <b-row v-if="total">
        <b-col>
          <b-pagination :total-rows="total" @change="onPageChanged" :value="page" :per-page="perPage" align="fill"></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { BFormInput, BForm, BButton, BPagination } from 'bootstrap-vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import { notificationItem } from '@/store/types'
import MovieShortInfo from '@/models/MovieShortInfo'
import MovieCard from '@/components/MovieCard.vue'
import MovieInfo from '@/components/MovieInfo.vue'

@Component({
  components: { BFormInput, BForm, BButton, BPagination, MovieCard, MovieInfo },
  computed: {
    ...mapState('searchMovies', ['page', 'perPage', 'total', 'movies']),
    ...mapState('topMovies', ['favoritesId'])
  },
  methods: {
    ...mapMutations(['startProgress', 'stopProgress', 'setNotification']),
    ...mapActions('searchMovies', ['fetchData']),
    ...mapMutations('searchMovies', ['resetMovies', 'setPage']),
    ...mapMutations('topMovies', ['addMovie'])
  }
})
export default class Search extends Vue {
  queryString = ''
  private currentMovie: MovieShortInfo | null = null

  private readonly movies!: MovieShortInfo[]
  private readonly total!: number
  private readonly favoritesId!: string[]

  startProgress!: () => void
  stopProgress!: () => void
  setNotification!: (item: notificationItem) => void
  fetchData!: (queryString: string) => Promise<void>
  resetMovies!: () => void
  setPage!: (page: number) => void
  addMovie!: (movie: MovieShortInfo) => void

  onPageChanged (page: number): void {
    this.setPage(page)
  }

  onAddToFavorites (movie: MovieShortInfo): void {
    const title = 'Add to favorites'
    if (this.favoritesId.indexOf(movie.id) !== -1) {
      const message = `The movie "${movie.title}" is already in favorites`
      this.setNotification({ message, variant: 'warning', title })
      return
    }

    this.addMovie(movie)
    const message = `The movie "${movie.title}" add to your favorite`
    this.setNotification({ message, variant: 'success', title })
  }

  onCloseMovieInfoModal (): void {
    this.currentMovie = null
  }

  onDescriptionMovie (movie: MovieShortInfo) {
    this.currentMovie = movie
  }

  @Watch('queryString')
  doChangeQueryString () {
    this.resetMovies()
  }

  @Watch('page')
  async doSearch (): Promise<void> {
    try {
      if (!this.queryString) {
        throw Error('Please enter correct query string')
      }
      this.startProgress()
      await this.fetchData(this.queryString)
    } catch (e) {
      this.setNotification({ message: e.message, variant: 'danger', title: `Query string "${this.queryString}"` })
    } finally {
      this.stopProgress()
    }
  }

  created () {
    this.resetMovies()
  }
}
</script>
