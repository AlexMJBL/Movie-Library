<template id="search-page">
  <div class="search-page">
    <nav>
      <button @click="previousPage" :disabled="currentPage === 1 || totalPages === 0">
        Previous
      </button>
      <div class="pagination-info">
        <p>Page {{ currentPage }} / {{ totalPages }}</p>
        <p>Total results : {{ numberItems }}</p>
      </div>
      <button @click="nextPage" :disabled="currentPage === totalPages || totalPages === 0">
        Next
      </button>
    </nav>

    <div v-if="!isEmpty" class="movie-posters">
      <MoviePoster :movies="paginatedMovies" />
    </div>
    <div v-if="isEmpty" class="empty-info">
      <p id="no-result">No results found</p>
    </div>
  </div>
</template>

<script setup>
import MoviePoster from '@/components/MoviePoster.vue'
import { getMoviesByGenre, getMoviesByYear, getMoviesByTitle } from '@/services/MovieService'
import { watchEffect, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const moviesList = ref([])

const isEmpty = computed(() => {
  if (moviesList.value.length === 0) {
    return true
  }
  return false
})

watchEffect(async () => {
  const text = route.params.text
  const type = route.params.type
  let results = []

  if (type === 'title') {
    results = await getMoviesByTitle(text, 10)
  } else if (type === 'year') {
    results = await getMoviesByYear(text)
  } else if (type === 'genre') {
    results = await getMoviesByGenre(Number(text))
  }

  moviesList.value = results
  numberItems.value = moviesList.value.length
  currentPage.value = 1
  document.title = `Recherche ${type} - ${text}`
})

//Pagination
const currentPage = ref(1)
const itemsPerPage = 10
const numberItems = ref(0)

const totalPages = computed(() => {
  return Math.ceil(moviesList.value.length / itemsPerPage)
})

const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return moviesList.value.slice(start, end)
})

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<style lang="css" scoped>
p{
  color: black;
  font-weight: 600;
}

.empty-info {
  display: flex;
  justify-content: center;
  height: 75vh;
  align-items: center;
}

.search-page {
  background-image: url('@/assets/images/background.png');
}

.pagination-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
}

p {
  font-size: 0.8rem;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0;
  padding-top: 20px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100px;
  transition: background-color 0.3s ease;
  margin: 0 10px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover {
  background-color: #0056b3;
}

.movie-posters {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  margin-top: 20px;
}

.movie-poster {
  width: calc(20% - 16px);
  max-width: 280px;
}

#no-result {
  font-size: 20px;
  color: #333;
  text-align: center;

  font-size: 2rem;
}
</style>
