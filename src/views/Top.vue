<template>
  <b-container fluid v-if="total">
    <b-row>
      <b-col>
        <h1 class="display-4">My Top movies</h1>
      </b-col>
    </b-row>
    <b-row cols-xl="4" cols-lg="3" cols-md="2" cols-sm="1" align-h="center">
      <b-col v-for="movie in movies" :key="movie.id" class="d-flex align-items-stretch">
        <movie-card
          :movie="movie"
          actionTitle="Delete"
          @emit-action-movie="onDeleteAction"
          @emit-description-movie="onDescriptionMovie"></movie-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-pagination :total-rows="total" @change="onPageChanged" :value="page" :per-page="perPage" align="fill"></b-pagination>
      </b-col>
    </b-row>
    <movie-info
      v-if="currentMovie"
      :movie="currentMovie"
      @emit-movie-info-close="onCloseMovieInfoModal"/>
  </b-container>
  <b-container class="mt-5" v-else>Empty favorites</b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MovieShortInfo from '@/models/MovieShortInfo'
import { BPagination } from 'bootstrap-vue'
import MovieCard from '@/components/MovieCard.vue'
import MovieInfo from '@/components/MovieInfo.vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { notificationItem } from '@/store/types'

@Component({
  components: {
    MovieCard,
    BPagination,
    MovieInfo
  },
  computed: {
    ...mapGetters('topMovies', ['total']),
    ...mapState('topMovies', ['page', 'perPage', 'movies'])
  },
  methods: {
    ...mapMutations('topMovies', ['setPage']),
    ...mapMutations(['startProgress', 'stopProgress', 'setNotification']),
    ...mapActions('topMovies', ['fetchData', 'removeFromFavorites'])
  }
})
export default class Top extends Vue {
  private currentMovie: MovieShortInfo | null = null

  private readonly page!: number
  private readonly perPage!: number
  private readonly movies!: MovieShortInfo[]
  fetchData!: () => Promise<void>
  startProgress!: () => void
  stopProgress!: () => void
  setNotification!: (item: notificationItem) => void
  setPage!: (page: number) => void
  removeFromFavorites!: (movie: MovieShortInfo) => void

  constructor () {
    super()
    const pageFromQueryString = this.$route.query?.page || '1'
    this.setPage(Number(pageFromQueryString))
  }

  @Watch('page', { immediate: true })
  onChangePage (): void {
    this.updatePage()
  }

  onCloseMovieInfoModal (): void {
    this.currentMovie = null
  }

  onPageChanged (page: number): void {
    this.setPage(page)
    this.$router.push({ query: { page: String(page) } })
  }

  async onDeleteAction (movie: MovieShortInfo): Promise<void> {
    const confirmText = `Are you sure delete from favorites "${movie.title}"`
    if (await this.$bvModal.msgBoxConfirm(confirmText, { title: 'Confirm delete' })) {
      this.removeFromFavorites(movie)
      await this.updatePage()
      if (this.movies.length === 0) {
        this.onPageChanged(this.page - 1)
      }
      this.setNotification({
        message: `Movie "${movie.title}" deleted from favorites`,
        variant: 'success',
        title: 'Favorite'
      })
    }
  }

  onDescriptionMovie (movie: MovieShortInfo): void {
    this.currentMovie = movie
  }

  async updatePage (): Promise<void> {
    try {
      this.startProgress()
      await this.fetchData()
      if (this.movies.length === 0 && this.page > 1) {
        throw Error(`Movie on page ${this.page} not found`)
      }
    } catch (e) {
      this.setNotification({ message: e.message, variant: 'danger' })
    } finally {
      this.stopProgress()
    }
  }
}
</script>
