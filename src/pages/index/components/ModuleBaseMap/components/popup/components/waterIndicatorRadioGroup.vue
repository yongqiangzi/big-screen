<template>
  <RadioGroup v-model:value="radioValue" class="radio-group" @change="radioChange">
    <Radio v-for="item in radioList" :value="item.value" :key="item.value">{{ item.label }}</Radio>
  </RadioGroup>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Radio, RadioGroup } from 'ant-design-vue';

const emits = defineEmits(['radioChange']);
const radioList = ref([
  {
    label: '总磷(mg/L)',
    value: 'p',
  },
  {
    label: '氨氮(mg/L)',
    value: 'hn',
  },
  {
    label: 'PH',
    value: 'ph',
  },
  {
    label: '浊度(NTU)',
    value: 'ntu',
  },
  {
    label: 'CODMn(mg/L)',
    value: 'cod',
  },
]);
const radioValue = ref<string>('p');
const radioChange = () => {
  emits('radioChange', radioValue.value);
};
</script>
<style lang="scss" scoped>
.radio-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1.5rem;

  .ant-radio-wrapper {
    padding: 0.03rem;
    font-family: 'Alibaba PuHuiTi', sans-serif;
    font-size: 0.16rem;
    font-weight: 500;
    color: #e1f2ff;

    :deep(.ant-radio-inner) {
      background-color: transparent;
      border-color: #90b6d4;
      border-width: 2px;
    }
  }

  .ant-radio-wrapper-checked {
    background: linear-gradient(90deg, rgb(67 157 231 / 60%) 0%, rgb(62 154 230 / 0%) 100%);
  }
}
</style>
