<template>
  <div class="sidebar-logo-container" :class="[collapse ? 'collapse': 'notitle']">
    <transition name="sidebarLogoFade">
      <router-link v-if="false" key="collapse" class="sidebar-logo-link" to="/">
        <img src="favicon.ico" class="sidebar-logo">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img class="sidebar-logo" :src="Logo">
        <h1 class="sidebar-title">
          <span style="color:#57CAEB">常州</span>存量房<span style="color:#57CAEB">成交量</span>统计
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Logo from '@/assets/images/logo.png'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    return {
      title: "常州存量房成交量统计",
      Logo
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: $menuBg;
  text-align: center;
  overflow: hidden;
  margin-bottom: 30px;
  margin-top: 20px;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & .sidebar-logo {
      display: inline-block;
      height: 100%;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #435ebe;
      font-weight: 600;
      line-height: 50px;
      font-size: 20px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 12px;
    }
  }
  &.notitle {
    .sidebar-title {
      display: none;
    }
    & .sidebar-logo {
      height: 60%;
    }
  }
}
</style>
