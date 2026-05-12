<script setup lang="ts">
import type { ExampleItem } from "../types/example.types";

defineProps<{
  item: ExampleItem;
  selected: boolean;
}>();

const emit = defineEmits<{
  select: [id: string];
}>();
</script>

<template>
  <button
    type="button"
    :class="[
      'w-full rounded-2xl border p-4 text-left transition',
      selected ? 'border-cyan-300 bg-cyan-300/10' : 'border-slate-700 bg-slate-900',
    ]"
    @click="emit('select', item.id)"
  >
    <p class="font-medium">{{ item.title }}</p>
    <p class="mt-1 text-sm text-slate-400">{{ item.active ? "Active" : "Inactive" }}</p>
  </button>
</template>
