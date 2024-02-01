import { defineStore } from 'pinia';
import { ref } from 'vue';

const useMap2dStore = defineStore('map2d', () => {
  const map = ref<Object>();
  return {
    map,
  };
});
export default useMap2dStore;
