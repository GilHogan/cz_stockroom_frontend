<template>
  <div v-if="null == token || token.length == 0 || !isVerifySuccess" class="cf-turnstile-parent">
    <div>常州存量房成交量统计</div>
    <div class="cf-turnstile-verify-text">Verifying you are human. This may take a few seconds.</div>
    <VueTurnstile site-key="0x4AAAAAAAxv8iXq74wv3ezb" v-model="token" size="flexible" @onSuccess="onSuccessHandle"
      ref="turnstileRef" />
  </div>
  <router-view v-else />
</template>

<script lang="ts">
import VueTurnstile from '@/components/turnstile/VueTurnstile.vue'
import { defineComponent, ref } from 'vue'
import { request, ResponseType } from '@/utils/api';
import { sign } from '@/utils/encrypt'
import Constants from '@/constant/constants';
import { ElLoading } from 'element-plus';

export default defineComponent({
  name: 'App',
  components: {
    VueTurnstile,
  },
  setup() {
    const token = ref('')
    const isVerifySuccess = ref(false)
    const turnstileRef = ref<any>(null);

    const onSuccessHandle = async (e: string) => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      const header = { [Constants.Sign.key]: sign() };
      let res: ResponseType<boolean> | null = null;
      try {
        const origin = window.location.origin;
        res = await request('POST', { token: e }, origin + "/api/stockroom/cf-turnstile-verify/", header);
      } catch (error) {
        console.log("Server Verify Turnstile error ", error);
      }
      if (res && res.data) {
        console.log("Verify Turnstile on success.");
        isVerifySuccess.value = true;
      } else {
        console.log("Verify Turnstile failed.");
        turnstileRef.value.reset();
      }
      loading.close();
    }
    return {
      token,
      isVerifySuccess,
      onSuccessHandle,
      turnstileRef
    }
  }
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

.cf-turnstile-parent {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .cf-turnstile-verify-text {
    margin-top: 2vh;
    margin-bottom: 2vh;
  }
}
</style>
