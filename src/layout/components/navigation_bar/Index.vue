<template>
  <div class="navbar">
    <Hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggle-click="toggleSideBar" />
    <BreadCrumb id="breadcrumb-container" class="breadcrumb-container" />
  </div>
</template>

<script>
import BreadCrumb from '@/components/bread-crumb/Index.vue'
import Hamburger from '@/components/hamburger/Index.vue'

import { computed, reactive, toRefs } from 'vue'
import { useRoute } from "vue-router";
import { useStore } from '@/store'
import { AppActionTypes } from '@/store/modules/app/action-types'
export default {
  components: {
    BreadCrumb,
    Hamburger,
  },
  setup () {
    const store = useStore()
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    const state = reactive({
      toggleSideBar: () => {
        store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, false)
      },
    })
    const route = useRoute();
    const routeItems = computed(() => route.matched);

    return {
      sidebar,
      routeItems,
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
}
</style>
