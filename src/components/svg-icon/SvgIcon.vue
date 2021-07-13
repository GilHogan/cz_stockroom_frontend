<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { computed, toRefs } from 'vue'
import { isExternal } from '@/utils/validate'
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },

  setup (props) {

    const { iconClass, className } = toRefs(props);

    return {
      isExternal: computed(() => isExternal(iconClass.value)),
      iconName: computed(() => `#icon-${iconClass.value}`),
      svgClass: computed(() => {
        if (className) {
          return 'svg-icon ' + className.value
        } else {
          return 'svg-icon'
        }
      }),
      styleExternalIcon: computed(() => {
        return {
          mask: `url(${iconClass.value}) no-repeat 50% 50%`,
          '-webkit-mask': `url(${iconClass.value}) no-repeat 50% 50%`
        }
      }),
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>