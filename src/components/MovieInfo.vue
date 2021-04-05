<template>
  <b-modal :visible="show" @hide="emitMovieInfoClose" size="lg" hide-footer>
    <b-card border-variant="light">
      <b-row>
        <b-col md="12" lg="6">
          <b-card-img :src="movie.posterImage" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="12" lg="6">
          <b-card-body :title="movie.title" class="fix-description">
            <b-card-text v-if="onProgress">
              <b-skeleton-table :hide-header="true" :columns="1" :rows="4"/>
            </b-card-text>
            <b-card-text v-else>
              <div>
                <b-form-rating
                  v-model="movieFullInfo.rating"
                  readonly stars="10"
                  size="sm"
                  color="#ff8800"
                  show-value-max
                  show-value
                  no-border></b-form-rating>
              </div>
              <div>Year: <b-badge variant="success">{{movieFullInfo.year}}</b-badge></div>
              <div>Runtime: <b-badge variant="secondary">{{movieFullInfo.runtime}}</b-badge></div>
              <div>Genre: <b-badge variant="primary">{{movieFullInfo.genre}}</b-badge></div>
              <hr>
              {{movieFullInfo.description}}
              <table class="table small mt-3">
                <tbody>
                <tr>
                  <th>Country</th>
                  <td>{{ movieFullInfo.country }}</td>
                </tr>
                <tr>
                  <th>Director</th>
                  <td>{{ movieFullInfo.director }}</td>
                </tr>
                <tr>
                  <th>Writer</th>
                  <td>{{ movieFullInfo.writer }}</td>
                </tr>
                <tr>
                  <th>Actors</th>
                  <td>{{ movieFullInfo.actors }}</td>
                </tr>
                <tr>
                  <th>Awards</th>
                  <td>{{ movieFullInfo.awards }}</td>
                </tr>
                </tbody>
              </table>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </b-modal>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { BCard, BSkeletonTable, BFormRating, BCardImg, BCardText, BCardBody, BBadge } from 'bootstrap-vue'
import MovieShortInfo from '@/models/MovieShortInfo'
import MovieFillInfo from '@/models/MovieFullInfo'
import { getMovieById, TypePlot } from '@/services/api'

@Component({
  components: {
    BCard,
    BSkeletonTable,
    BFormRating,
    BCardImg,
    BCardText,
    BCardBody,
    BBadge
  }
})
export default class MovieCard extends Vue {
  @Prop() readonly movie!: MovieShortInfo

  movieFullInfo !: MovieFillInfo
  show = false
  onProgress = true

  @Emit()
  emitMovieInfoClose (): null {
    return null
  }

  async created (): Promise<void> {
    this.show = true
    this.onProgress = true
    this.movieFullInfo = new MovieFillInfo(await getMovieById(this.movie.id, TypePlot.FULL))
    this.onProgress = false
  }
}
</script>

<style scoped>
  .fix-description {
    padding-top: 0px;
  }
</style>
