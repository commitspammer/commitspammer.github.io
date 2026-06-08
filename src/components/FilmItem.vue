<template>
  <div v-if="watched" class="hover:bg-yellow-300 duration-300 px-1">
    <p class="flex justify-between">
      <span class="truncate">{{ rank }}. {{ title }}</span>
      <span class="ml-4">{{ rating.toFixed(1) }}</span>
    </p>
    <p class="text-right text-md">{{ stars }}</p>
  </div>
  <div v-else class="flex justify-between bg-red-950 text-white duration-300 px-1">
    <p>{{ rank }}. {{ title }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  rank: Number,
  title: String,
  rating: [String, Number], //it's a union type
  watched: Boolean,
})

const halfRating = props.rating / 2

const stars = computed(
  () =>
    '☆'.repeat(5 - halfRating) +
    '⯫'.repeat(halfRating - Math.floor(halfRating) > 0 ? 1 : 0) +
    '★'.repeat(halfRating),
)
</script>
