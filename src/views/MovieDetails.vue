<template>
  <div id="movie-details">
  <div v-if="movie" class="movie-container">
    <img
      class="movie-image"
      :src="
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://placehold.co/500x750?text=Placeholder+Image'
      "
      :alt="`Movie Poster of ${movie.title}`"
    />
    <div class="movie-info">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.overview }}</p>
      <div v-if="movieURL" class="video-container">
          <iframe
            width="100%"
            height="315"
            :src="movieURL.replace('watch?v=', 'embed/')"
            frameborder="0"
            allowfullscreen
            title="Movie Trailer"
          ></iframe>
        </div>
      
      <p id="rank">Rank : {{ movie.vote_average }} / 10</p>
      <p>Length : {{ movie.runtime }} minutes</p>
      <p>Release date : {{ movie.release_date }}</p>
      
      <p v-if="movie.homepage">
        Official link : <a :href="movie.homepage">{{ movie.homepage }}</a>
      </p>
    </div>
  </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
})

import { onMounted, ref } from 'vue'
import { getMovieDetails , getMovieTrailer} from '@/services/MovieService.js'

const movie = ref({})
const movieURL= ref(null)

onMounted(() => {
  getMovieDetails(props.id).then((response) => {
    movie.value = response
    document.title = `${response.title} - Details`
  });
  getMovieTrailer(props.id).then((response) => {
    movieURL.value = response
  });
})
</script>

<style scoped>
.video-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.video-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
iframe{
  height: auto;
}
#smallInfo{
  display: flex;
  justify-content: space-between;
}
#movie-details{
  background-image: url('@/assets/images/background.png');
  padding:10px 0px;
}
.movie-container {
  background-color: #cfd6dc;
  display: flex;
  flex-direction: row;
  gap: 20px;
  max-width: 90%;
  margin: 20px auto;
  padding: 20px;
  
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.movie-image {
  border-radius: 8px;
  width: auto;
  height: 90%;
}

.movie-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

h1 {
  font-size: 2.2rem;
  color: #000;
  margin-bottom: 15px;
  font-weight: bold;
}

p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin: 10px 0;
}

#rank {
  font-weight: bold;
  color: #ff9900;
}

a {
  font-size: 1.1rem;
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  color: #007bff;
}

@media (max-width: 768px) {
  .movie-container {
    flex-direction: column;
    align-items: center;
  }

  .movie-image {
    width: 80%;
  }

  .movie-info {
    width: 100%;
    text-align: center;
  }
}
</style>
