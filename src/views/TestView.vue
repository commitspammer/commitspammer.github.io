<template>
  <main class="p-4">
    <h1>Test View</h1>
    <p>Loaded: ({{ counter }}/{{ total }})</p>
    <div @click="cancelState = 'cancelling'" class="border-2 w-fit px-2 select-none">
      {{
        cancelState === 'cancelling'
          ? 'Cancelling...'
          : cancelState === 'cancelled'
            ? 'Cancelled'
            : 'CANCEL'
      }}
    </div>
    <p>{{ JSON.stringify(output) }}</p>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const films = ref([])
const counter = ref(0)
const total = ref(0)
const output = ref([])
const cancelState = ref('notCancelled')

const resumeFetchingMovies = async () => {
  while (counter.value < total.value) {
    if (cancelState.value === 'cancelling') {
      cancelState.value = 'cancelled'
      throw new Error('Cancelled')
    }
    await new Promise((resolve) => setTimeout(resolve, 10000))
    const film = films.value[counter.value]
    const response = await fetch(
      'https://api.imdbapi.dev/search/titles?query=' + film.name + '&limit=3',
    )
    if (!response.ok) {
      throw new Error('HTTP Error')
    }
    const searchResults = await response.json()
    const titles = searchResults.titles ?? []
    output.value.push({
      query: film.name,
      titles: titles,
    })
    counter.value += 1
    console.log(film.name)
    console.log(titles)
  }
}

onMounted(async () => {
  try {
    const response = await fetch('/films.json')
    if (!response.ok) {
      throw new Error('HTTP Error')
    }
    films.value = await response.json()
    total.value = films.value.length
    console.log(films.value)
  } catch (error) {
    console.error('FAILED FETCHING FILMS LIST', error)
    return
  }
  let minutes = 1
  while (counter.value < total.value) {
    try {
      await resumeFetchingMovies()
    } catch (error) {
      if (error.message === 'Cancelled') {
        console.error('FETCHING CANCELLED', error)
        return
      }
      console.error('FAILED FETCHING IMDB OR PARSING SEARCH RESULT', error)
      console.error('TRYING AGAIN IN', minutes, 'MINUTES')
      await new Promise((resolve) => setTimeout(resolve, minutes * 60000))
      minutes += 1
    }
  }
  console.log('DONE')
})
</script>
