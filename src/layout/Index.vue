<!--
 * @Description: app 布局入口
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <Navbar />
      <AppMain />
    </div>
    <div class="bottom-container">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { DeviceType } from '@/store/modules/app/state'
import { computed, defineComponent, onBeforeMount, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'
import { useStore } from '@/store'
import { AppActionTypes } from '@/store/modules/app/action-types'
import { AppMain, Navbar, Sidebar, Footer } from './components'
import resize from './resize'
export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    Footer,
  },
  setup () {
    const store = useStore()
    const { sidebar, device, addEventListenerOnResize, resizeMounted, removeEventListenerResize, watchRouter } = resize()
    const state = reactive({
      handleClickOutside: () => {
        store.dispatch(AppActionTypes.ACTION_CLOSE_SIDEBAR, false)
      }
    })

    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === DeviceType.Mobile
      }
    })

    watchRouter()
    onBeforeMount(() => {
      addEventListenerOnResize()
    })

    onMounted(() => {
      resizeMounted()
    })

    onBeforeUnmount(() => {
      removeEventListenerResize()
    })
    return {
      classObj,
      sidebar,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 92vh;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 92vh;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background-color: #ffffff !important;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}

.bottom-container {
  width: 100%;
  height: 8vh;
  bottom: 0;
}
</style>
