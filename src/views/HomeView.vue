<template>
  <main>
    <h1>The Movie Library</h1>
    <p>
      Thanks for using our database. We’re happy to provide you with information about your favorite
      movies and series.Below, you can find movies
    </p>
    <p>
      currently playing in theaters. You can also search for movies by title, genre, or release year
      using our search function in the top right corner.
    </p>
    <div class="movies-container">
      <MoviePoster :movies="moviesList" />
    </div>
  </main>
</template>

<script setup>
import { getNowPlayingMovies } from '@/services/MovieService.js'
import { onMounted, ref } from 'vue'
import MoviePoster from '@/components/MoviePoster.vue'

const moviesList = ref()
document.title = 'Home - Movie Library'
onMounted(async () => {
  const response = await getNowPlayingMovies()
  moviesList.value = response.slice(0, 3)
})
</script>

<style lang="css">
main {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  text-align: center;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-size: 2rem;
  margin: 15px 0px;
  color: #000;
}

.movies-container {
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
