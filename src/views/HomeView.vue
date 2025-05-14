<template>
  <main>
    <div id="home">
      
    
      <img src="@/assets/images/movie-lib-logo.png">
    
    <div class="movies-container">
      <MoviePoster v-if="moviesList" :movies="moviesList" />
    </div>
       
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
  moviesList.value = response.slice(0, 4)
})
</script>

<style lang="css">

#home{
  width:90%;
  align-self: center;
}
 img{
  height: 180px;
 }

main {
  padding:20px 0px;
  font-family: Arial, sans-serif;
  background-image: url("@/assets/images/background.png");
  text-align: center;
  min-height: 85vh;
  display: flex;
  
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-size: 2rem;
  margin: 15px 0px;
  color: black;
}

#welcomeDiv {
  
  margin: 0px 20px;
  padding: 20px;
  
  border: 1px solid black;
  background-color:#cfd6dc;
  border-radius: 12px;
}

#welcomeText {
  font-size: 1.2rem;
  color: #222;
  margin: 5px 20px;
  font-weight: 500;
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
