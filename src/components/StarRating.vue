<template>
  <div v-if="watched" class="relative flex items-center justify-center">
    <PlainStar class="fill-yellow-400 stroke-white stroke-1" />
    <div class="absolute z-1 inset-0 flex items-center justify-center">
      {{ rating }}
    </div>
  </div>
  <div v-else class="relative flex items-center justify-center">
    <PlainStar class="fill-red-950 stroke-white stroke-1" />
    <div class="absolute z-1 inset-0 flex items-center justify-center text-white">?</div>
  </div>
</template>

<script setup>
import PlainStar from './icons/PlainStar.vue'

defineProps({
  rating: {
    type: Number,
    default: 0,
  },
  watched: {
    type: Boolean,
    default: false,
  },
})
</script>
