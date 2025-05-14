<template>
  <div v-for="movie in props.movies" :key="movie.id" class="movie-poster">
    <div class="poster-wrapper">
  <img
    :src="
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://placehold.co/350x500?text=Placeholder+Image'
    "
    :alt="`Movie Poster of ${movie.title}`"
  />
 <div class="rating-wrapper">
  <div :class="getRatingClass(movie.vote_average)">
    <div class="rating-black">
      <span class="rating-text">{{ movie.vote_average.toFixed(1) }}</span>
    </div>
  </div>
</div>
</div>
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

function getRatingClass(note) {
  if (note >= 7) return 'rating-green';
  else if (note >= 4) return 'rating-yellow';
  else return 'rating-red';
}
</script>

<style lang="css" scoped>

.poster-wrapper {
  position: relative;
  width: 100%;
}

.rating-wrapper {
  position: absolute;
  bottom: 0px;
  right: 10px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.rating-text {
  color: white; 
  font-weight: bold;
  font-size: 1rem;
}

.rating-green {
  width: 100%;
  height: 100%;
  background-color: green;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating-yellow {
  width: 100%;
  height: 100%;
  background-color: yellow;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating-red {
  width: 100%;
  height: 100%;
  background-color: red;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating-black {
  width: 46px;
  height: 46px;
  background-color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
} 

.movie-poster {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
  background-color: #cfd6dc;
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
  color: black;
}

.movie-poster p {
  font-size: 14px;
  color: #222;
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
