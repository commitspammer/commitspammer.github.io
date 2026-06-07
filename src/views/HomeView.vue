<template>
  <main
    class="min-h-screen p-2 md:p-4 md:pt-5 bg-[url(/red-wall.png)] bg-linear-to-l from-red-900 to-red-500"
  >
    <!--bg-[repeating-linear-gradient(to_right,#2b0000_0px,#5e0000_35px,#b91c1c_55px,#7a0000_75px,#2b0000_110px)]-->
    <!-- NOTE: The image "https://gcdnb.pbrd.co/images/M-7_6JpjSNk4.png" will die on August 26 -->
    <!--<div class="bg-[radial-gradient(circle,#ffff00_10px,transparent_1px)] bg-[size:40px_40px] h-250">
    </div>-->
    <div
      class="w-full lg:w-11/12 xl:w-5/6 2xl:w-2/3 m-auto bg-stone-800 border-stone-800 border-16 md:border-[96px] leds"
      style="
        filter: drop-shadow(0 5px 5px #000);
        animation-name: pulse;
        animation-duration: 8s;
        animation-iteration-count: infinite;
      "
    >
      <div
        class="px-2 md:px-12 xl:px-24 py-12 bg-yellow-100 text-2xl md:text-4xl text-red-950 font-[Limelight] inset-shadow-black inset-shadow-sm"
      >
        <div class="flex flex-col text-center text-4xl md:text-6xl xl:text-8xl mb-12">
          <p>NOW SHOWING</p>
          <p class="text-sm md:text-xl xl:text-2xl">★ The best (and worst) of cinema ★</p>
        </div>
        <div class="flex flex-row-reverse space-x-reverse">
          <button
            v-on:click="sortFilmsByRating"
            class="text-xl xl:text-2xl px-2"
            :class="sortRatingPressedClass"
          >
            Rating
          </button>
          <button
            v-on:click="sortFilmsByAlphabet"
            class="text-xl xl:text-2xl px-2"
            :class="sortAlphabetPressedClass"
          >
            Alphabet
          </button>
        </div>
        <hr class="mb-2 border border-red-950" />
        <div v-if="films.length === 0">Winding films...</div>
        <FilmItem
          v-else
          v-for="(f, index) in watchedThenUnwatchedFilms"
          :key="f.name"
          :rank="index + 1"
          :title="f.name"
          :rating="f.rating"
          :watched="f.watched"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import FilmItem from '../components/FilmItem.vue'

const films = ref([])

const watchedThenUnwatchedFilms = computed(() =>
  films.value.filter((f) => f.watched).concat(films.value.filter((f) => !f.watched)),
)
const sortMode = ref(null)

const sortRatingPressedClass = computed(() =>
  sortMode.value === 'rating' ? ['bg-red-950', 'text-white'] : [],
)

const sortAlphabetPressedClass = computed(() =>
  sortMode.value === 'alphabet' ? ['bg-red-950', 'text-white'] : [],
)

const sortFilmsByRating = () => {
  sortMode.value = 'rating'
  films.value.sort((a, b) => a.rating < b.rating)
}

const sortFilmsByAlphabet = () => {
  sortMode.value = 'alphabet'
  films.value.sort((a, b) => a.name > b.name)
}

onMounted(async () => {
  try {
    const response = await fetch('/films.json')
    films.value = await response.json()
  } catch (error) {
    console.error('Failed to load films.json', error)
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
