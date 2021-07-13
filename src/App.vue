<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="scss">
.el-menu-item:hover {
  outline: 0 !important;
  color: #409eff !important;
}

.el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0 !important;
  color: #fff !important;
  background: #435ebe !important;
  border-radius: 8px !important;
}
.el-menu-item:hover {
  outline: 0 !important;
  color: #fff !important;
  background: #435ebe !important;
  border-radius: 8px !important;
}
</style>
