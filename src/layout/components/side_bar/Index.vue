<template>
  <div :class="{'has-logo': showLogo}">
    <SidebarLogo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu router :collapse="!isCollapse" :unique-opened="false" :default-active="activeMenu" :background-color="variables.menuBg" :text-color="variables.menuText" :active-text-color="menuActiveTextColor" mode="vertical">
        <SidebarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" :is-collapse="isCollapse" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import variables from '@/styles/_variables-to-js.scss'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: {
    SidebarItem,
    SidebarLogo
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter();
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    const routes = computed(() => router.options.routes);

    const menuActiveTextColor = computed(() => {
      return variables.menuActiveText;
    })

    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta !== null || meta !== undefined) {
        if (meta.activeMenu) {
          return meta.activeMenu
        }
      }
      return path
    })

    const isCollapse = computed(() => {
      return sidebar.value.opened
    })

    return {
      sidebar,
      routes,
      showLogo: true,
      menuActiveTextColor,
      variables,
      activeMenu,
      isCollapse
    }
  }
})
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
