<template>
  <div class="footer">
    <div class="license">
      <div class="explain">
        本站统计数据来源于
        <el-link rel="license" type="primary" href="https://hy.house0519.com/gsxx/gsxx/ClfHouseIndex">常州存量房信息公示网</el-link>
      </div>
      <div class="content">
        <a class="icon" rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh">
          <img alt="知识共享许可协议" style="border-width:0;" :src="LicenseImg" />
        </a>
        本站采用
        <el-link rel="license" type="primary" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh">CC BY-NC-ND 4.0</el-link>许可协议
      </div>
    </div>
    <div class="developer">
      <span>Copyright©2025 </span>
      <span style="padding-left: 4px;" type="primary">GilHogan</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LicenseImg from '@/assets/images/license.png'

export default defineComponent({
  name: "Footer",

  setup () {
    return {
      LicenseImg
    }
  }
})
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;

  a {
    font-size: 12px;
  }

  .explain {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .license {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .developer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
