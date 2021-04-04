<template>
  <b-container>
    <b-row>
      <b-col>
        <p>Simple <strong>SPA</strong> application with VueJs + Vuex + VueRouter and Typescript.</p>
        <p>
          You can  <router-link :to="{name: 'Search'}">Search in IMDB</router-link> by movie name,
          add to <router-link :to="{name: 'Top'}">My top</router-link> movies.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {}
</script>
