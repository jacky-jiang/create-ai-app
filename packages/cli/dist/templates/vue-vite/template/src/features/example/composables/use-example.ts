import { ref } from "vue";
import { normalizeApiError } from "../../../shared/api/normalize-error";
import { getExampleItems } from "../api/example-api";
import type { ExampleItem } from "../types/example.types";

export function useExample() {
  const data = ref<ExampleItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function load(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      data.value = await getExampleItems();
    } catch (err) {
      error.value = normalizeApiError(err).message;
    } finally {
      loading.value = false;
    }
  }

  return {
    data,
    loading,
    error,
    load,
  };
}
