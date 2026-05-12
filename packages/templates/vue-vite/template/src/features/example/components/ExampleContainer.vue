<script setup lang="ts">
import { computed, onMounted } from "vue";
import ExampleCard from "./ExampleCard.vue";
import { useExample } from "../composables/use-example";
import { useExampleStore } from "../stores/example-store";
import { filterActiveItems } from "../services/example-service";

const example = useExample();
const exampleStore = useExampleStore();
const activeItems = computed(() => filterActiveItems(example.data.value));

onMounted(() => {
  void example.load();
});
</script>

<template>
  <div v-if="example.loading.value" class="rounded-2xl border border-slate-800 p-4">
    Loading example data...
  </div>

  <div
    v-else-if="example.error.value"
    class="rounded-2xl border border-red-800 bg-red-950/30 p-4 text-red-200"
  >
    {{ example.error.value }}
  </div>

  <div v-else-if="activeItems.length === 0" class="rounded-2xl border border-slate-800 p-4">
    No active items.
  </div>

  <div v-else class="space-y-3">
    <ExampleCard
      v-for="item in activeItems"
      :key="item.id"
      :item="item"
      :selected="exampleStore.selectedId === item.id"
      @select="exampleStore.setSelectedId"
    />
  </div>
</template>
