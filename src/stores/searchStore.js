import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMovieGenres } from '@/services/MovieService.js'

export const useSearchStore = defineStore('searchStore', () => {
  const searchText = ref('')
  const movieGenres = ref([])
  const searchType = ref()

  async function setGenres() {
    const genres = await getMovieGenres()
    movieGenres.value = genres
  }

  function setChosenSearchType(type) {
    searchType.value = type
  }

  return {
    searchText,
    searchType,
    movieGenres,
    setGenres,
    setChosenSearchType,
  }
})
