<template>
  <main
    class="min-h-screen overflow-hidden p-2 pb-32 md:p-4 md:pt-5 md:pb-64 bg-[url(/red-wall.png)] bg-linear-to-l from-red-900 to-red-500"
  >
    <div
      class="w-full lg:w-11/12 xl:w-5/6 m-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-16"
    >
      <FilmSign
        v-for="(f, index) in watchedThenUnwatchedFilms"
        :key="f.name"
        :id="f.id"
        :rank="index + 1"
        :title="f.name"
        :rating="f.rating"
        :watched="f.watched"
      />
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import FilmSign from '../components/FilmSign.vue'

const films = ref([])

const watchedThenUnwatchedFilms = computed(() =>
  films.value.filter((f) => f.watched).concat(films.value.filter((f) => !f.watched)),
)
const sortMode = ref(null)

const sortFilmsByRating = () => {
  sortMode.value = 'rating'
  films.value.sort((a, b) => a.rating < b.rating)
}

//const sortFilmsByAlphabet = () => {
//  sortMode.value = 'alphabet'
//  films.value.sort((a, b) => a.name > b.name)
//}

onMounted(async () => {
  try {
    const response = await fetch('/films.json')
    films.value = await response.json()
    sortFilmsByRating()
  } catch (error) {
    console.error('Failed to load films.json', error)
    return
  }
})
</script>
