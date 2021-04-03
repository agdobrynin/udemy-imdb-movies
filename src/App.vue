<template>
  <b-container>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand :to="{name: 'Home'}">IMDB Movies App</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item :to="{name: 'Top'}" :active="isActive('Top')">❤ My top movies</b-nav-item>
        <b-nav-item :to="{name: 'Search'}" :active="isActive('Search')">🔎 Search movies</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-skeleton-table :hide-header="true" v-if="onProgress"/>
    <router-view v-show="!onProgress"/>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { BNavbar, BNavbarBrand, BNavbarNav, BNavItem, BSkeletonWrapper, BSkeletonTable } from 'bootstrap-vue'
import { mapMutations, mapState } from 'vuex'
import { notificationItem } from '@/store/types'

@Component({
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarNav,
    BNavItem,
    BSkeletonTable,
    BSkeletonWrapper
  },
  computed: {
    ...mapState(['inProgress', 'notification'])
  },
  methods: {
    ...mapMutations(['unsetNotification'])
  }
})
export default class App extends Vue {
  private inProgress!: boolean
  private notification!: notificationItem | null
  unsetNotification!: () => void

  isActive (routeName: string): boolean {
    return this.$route.name === routeName
  }

  get onProgress (): boolean {
    return this.inProgress
  }

  @Watch('notification', { immediate: true })
  notificationWatcher (): void {
    if (this.notification) {
      this.$bvToast.toast(this.notification.message, {
        title: this.notification.title || 'Attention!',
        autoHideDelay: 5000,
        variant: this.notification.variant || 'info',
        solid: true
      })
      this.unsetNotification()
    }
  }
}
</script>
