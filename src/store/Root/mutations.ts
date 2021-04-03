import { MutationTree } from 'vuex'
import { notificationItem, RootState } from '@/store/types'

export const mutations: MutationTree<RootState> = {
  startProgress (state) {
    state.inProgress = true
  },
  stopProgress (state) {
    state.inProgress = false
  },
  setNotification (state, item: notificationItem): void {
    state.notification = item
  },
  unsetNotification (state): void {
    state.notification = null
  }
}
