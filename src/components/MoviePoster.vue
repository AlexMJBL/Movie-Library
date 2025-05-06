<template>
  <div v-for="movie in props.movies" :key="movie.id" class="movie-poster">
    <img
      :src="
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://placehold.co/350x500?text=Placeholder+Image'
      "
      :alt="`Movie Poster of ${movie.title}`"
    />
    <h2>{{ movie.title }}</h2>
    <p>Release date : {{ movie.release_date }}</p>
    <button @click="onSelect(movie)">See More</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  movies: Array,
})

function onSelect(movie) {
  router.push({ name: 'movie-details', params: { id: movie.id } })
}
</script>

<style lang="css" scoped>
.movie-poster {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 100%;
  max-width: 280px;
  margin: 15px;
}

.movie-poster img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
  margin-bottom: 8px;
}

.movie-poster img:hover {
  transform: scale(1.05);
}

.movie-poster h2 {
  font-size: 18px;
  font-weight: bold;
  margin: auto 0px;
  color: #333;
}

.movie-poster p {
  font-size: 14px;
  color: #555;
  margin: auto 0px;
}

.movie-poster button {
  background-color: #007bff;
  color: white;
  padding: 10px 18px;
  margin-top: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}

.movie-poster button:hover {
  background-color: #0056b3;
}

.movie-poster:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
}
</style>
