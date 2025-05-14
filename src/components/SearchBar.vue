<template>
  <div>
    <form @submit.prevent="submitSearch">
      <label> Search : </label>
      <select v-model="searchCriteria" id="search-criteria" name="search-criteria">
        <option value="title">Title</option>
        <option value="year">Release year</option>
        <option value="genre">Genre</option>
      </select>
      <input
        v-if="!isGenre"
        v-model="searchStore.searchText"
        id="search"
        type="text"
        placeholder="Search"
        class="search-container"
      />
      <select class="search-container" v-if="isGenre" v-model="searchStore.searchText">
        <option v-for="genre in searchStore.movieGenres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>

      <button type="submit">Search</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useSearchStore } from '@/stores/searchStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchStore = useSearchStore()
const searchCriteria = ref('title')
const isGenre = computed(() => searchCriteria.value === 'genre')

watch(searchCriteria, () => {
  searchStore.searchText = ''
})

function submitSearch() {
  if (searchStore.searchText === '') {
    alert('Please enter a search term')
    return
  }
  searchStore.setChosenSearchType(searchCriteria.value)
  router.push({
    name: 'movie-search',
    params: { type: searchStore.searchType, text: searchStore.searchText },
  })
}
</script>

<style lang="css" scoped>


form {
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px;
}
select {
  cursor: pointer;
}

input,
select {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-container {
  width: 200px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

label {
  font-weight: 500;
}
</style>
