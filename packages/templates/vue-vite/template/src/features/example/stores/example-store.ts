import { defineStore } from "pinia";
import { ref } from "vue";

export const useExampleStore = defineStore("example", () => {
  const selectedId = ref<string | null>(null);

  function setSelectedId(id: string | null): void {
    selectedId.value = id;
  }

  return {
    selectedId,
    setSelectedId,
  };
});
