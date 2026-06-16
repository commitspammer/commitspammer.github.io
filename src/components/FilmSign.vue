<template>
  <div
    @click="selected = !selected"
    class="relative w-full bg-stone-800 group hover:shadow-xl/100 shadow-yellow-100 transition duration-300 ease-in-out"
    style="filter: drop-shadow(0 5px 5px #000)"
  >
    <div
      class="border-16 md:border-32"
      :class="[watched ? 'leds' : 'leds-off']"
      :style="[
        watched
          ? 'filter: drop-shadow(0 1px 1px #000); animation-name: pulse; animation-duration: 20s; animation-iteration-count: infinite;'
          : 'filter: drop-shadow(0 1px 1px #000);',
      ]"
    >
      <div class="bg-yellow-100 text-red-950 font-[Limelight] inset-shadow-black inset-shadow-sm">
        <div class="">
          <img
            v-if="getImdbPoster(id) && !selected"
            :src="getImdbPoster(id)"
            class="object-cover aspect-68/100"
          />
          <div
            v-else
            class="aspect-68/100 select-none flex items-center justify-center text-center text-sm md:text-xl"
          >
            {{ title }}
          </div>
        </div>
        <div class="absolute -bottom-10 -right-7 md:-bottom-20 md:-right-16">
          <StarRating
            :rating="rating"
            :watched="watched"
            class="size-20 md:size-32 text-2xl md:text-4xl select-none group-hover:opacity-5 transition duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, /*computed,*/ onMounted } from 'vue'
import StarRating from './StarRating.vue'

//const props = defineProps({
defineProps({
  id: String,
  rank: Number,
  title: String,
  rating: [String, Number], //it's a union type
  watched: Boolean,
})

//const halfRating = props.rating / 2
//const stars = computed(
//  () =>
//    '☆'.repeat(5 - halfRating) +
//    '⯫'.repeat(halfRating - Math.floor(halfRating) > 0 ? 1 : 0) +
//    '★'.repeat(halfRating),
//)

const selected = ref(false)

const imdbResults = ref(null)

const getImdbPoster = (id) => {
  return imdbResults.value?.find((r) => r?.id === id)?.primaryImage.url
}

onMounted(async () => {
  try {
    const response = await fetch('/imdbapi.json')
    imdbResults.value = await response.json()
  } catch (error) {
    console.error('Failed to load imbdapi.json', error)
    return
  }
})
</script>

<style>
.leds2 {
  --yellow-circle-27: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='27' height='27' viewBox='0 0 27 27'%3E%3Ccircle cx='13.5' cy='13.5' r='13.5' fill='%23ffff00'/%3E%3C/svg%3E");
  background-image: var(--yellow-circle-27); /* bg-repeat-space */
}
.leds {
  border-image-slice: 33.33%;
  border-image-repeat: space;
  border-image-source: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg fill='%23FFD400'%3E%3Ccircle cx='48' cy='48' r='32'/%3E%3Ccircle cx='144' cy='48' r='32'/%3E%3Ccircle cx='240' cy='48' r='32'/%3E%3Ccircle cx='48' cy='144' r='32'/%3E%3Ccircle cx='144' cy='144' r='32'/%3E%3Ccircle cx='240' cy='144' r='32'/%3E%3Ccircle cx='48' cy='240' r='32'/%3E%3Ccircle cx='144' cy='240' r='32'/%3E%3Ccircle cx='240' cy='240' r='32'/%3E%3C/g%3E%3C/svg%3E");
}
.leds-off {
  border-image-slice: 33.33%;
  border-image-repeat: space;
  border-image-source: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg fill='%23322A00'%3E%3Ccircle cx='48' cy='48' r='32'/%3E%3Ccircle cx='144' cy='48' r='32'/%3E%3Ccircle cx='240' cy='48' r='32'/%3E%3Ccircle cx='48' cy='144' r='32'/%3E%3Ccircle cx='144' cy='144' r='32'/%3E%3Ccircle cx='240' cy='144' r='32'/%3E%3Ccircle cx='48' cy='240' r='32'/%3E%3Ccircle cx='144' cy='240' r='32'/%3E%3Ccircle cx='240' cy='240' r='32'/%3E%3C/g%3E%3C/svg%3E");
}
@keyframes pulse {
  0%,
  94%,
  97% {
    border-image-source: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg fill='%23FFD400'%3E%3Ccircle cx='48' cy='48' r='32'/%3E%3Ccircle cx='144' cy='48' r='32'/%3E%3Ccircle cx='240' cy='48' r='32'/%3E%3Ccircle cx='48' cy='144' r='32'/%3E%3Ccircle cx='144' cy='144' r='32'/%3E%3Ccircle cx='240' cy='144' r='32'/%3E%3Ccircle cx='48' cy='240' r='32'/%3E%3Ccircle cx='144' cy='240' r='32'/%3E%3Ccircle cx='240' cy='240' r='32'/%3E%3C/g%3E%3C/svg%3E");
  }
  95%,
  99% {
    border-image-source: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg fill='%23322A00'%3E%3Ccircle cx='48' cy='48' r='32'/%3E%3Ccircle cx='144' cy='48' r='32'/%3E%3Ccircle cx='240' cy='48' r='32'/%3E%3Ccircle cx='48' cy='144' r='32'/%3E%3Ccircle cx='144' cy='144' r='32'/%3E%3Ccircle cx='240' cy='144' r='32'/%3E%3Ccircle cx='48' cy='240' r='32'/%3E%3Ccircle cx='144' cy='240' r='32'/%3E%3Ccircle cx='240' cy='240' r='32'/%3E%3C/g%3E%3C/svg%3E");
  }
}
</style>
