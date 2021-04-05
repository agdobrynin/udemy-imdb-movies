<template>
  <b-card class="mb-5" :imgSrc="movie.posterImage">
    <b-card-text class="d-flex justify-content-between">
      <h5>{{movie.title}} <b-badge variant="info">{{movie.year}}</b-badge></h5>
    </b-card-text>
    <template #footer>
      <b-row>
        <b-col sm="6"><b-button variant="danger" size="sm" @click="emitActionMovie(movie)">{{ actionTitle }}</b-button></b-col>
        <b-col sm="6"><b-button variant="primary" size="sm" @click="emitDescriptionMovie(movie)">Description</b-button></b-col>
      </b-row>
    </template>
  </b-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import MovieShortInfo from '@/models/MovieShortInfo'
import { BCard, BButton, BBadge, BCardText, BCardFooter } from 'bootstrap-vue'

@Component({
  components: { BCard, BButton, BBadge, BCardText, BCardFooter }
})
export default class MovieCard extends Vue {
  @Prop() readonly movie!: MovieShortInfo
  @Prop({ default: 'Some action' }) readonly actionTitle!: string

  @Emit()
  emitActionMovie (movie: MovieShortInfo): MovieShortInfo {
    return movie
  }

  @Emit()
  emitDescriptionMovie (movie: MovieShortInfo): MovieShortInfo {
    return movie
  }
}
</script>
