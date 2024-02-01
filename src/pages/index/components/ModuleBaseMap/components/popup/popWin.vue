<!--
 * @Date: 2024-01-17 14:47:22
 * @LastEditTime: 2024-01-17 16:46:56
 * @FilePath: \src\pages\index\components\ModuleBaseMap\components\popup\popWin.vue
-->
<script lang="ts">
/* eslint-disable arrow-body-style,no-underscore-dangle,no-inline-comments,line-comment-position,array-element-newline */
import { h, resolveComponent, defineComponent, ref, reactive } from 'vue';

// 其他弹窗
import WaterStationPopup from './waterStationPopup.vue';
import RiverPopup from './riverPopup.vue';

export default defineComponent({
  components: {
    waterMonitorStation: WaterStationPopup,
    waterFlows: RiverPopup,
    river: RiverPopup,
    lake: RiverPopup,
    reservoir: RiverPopup,
  },
  emits: ['closeWinInfo', 'exceedChange'],
  setup(props, { emit, expose }) {
    const _componentName = ref(''); // 组件名称
    const _componentOptions = reactive({
      data: {},
    }); // 各组件渲染所需参数
    const setInfoValue = (componentOptions: any) => {
      _componentName.value = componentOptions.nodeType || componentOptions.popupData.nodeType;
      _componentOptions.data = componentOptions;
    };

    expose({ setInfoValue });

    return () => {
      if (_componentName.value) {
        return h(resolveComponent(_componentName.value), {
          ..._componentOptions.data,
          onClose: () => emit('closeWinInfo'),
          onExceedChange: (val: any) => emit('exceedChange', val),
        });
      }

      return h('div', null, '');
    };
  },
});
</script>
