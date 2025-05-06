<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import { onMounted } from 'vue'
import { useSearchStore } from '@/stores/searchStore'

const searchStore = useSearchStore()

onMounted(async () => {
  searchStore.setGenres()
})
</script>

<template>
  <header>
    <nav class="navbar">
      <RouterLink to="/" class="home-link">Home</RouterLink>
      <SearchBar />
    </nav>
  </header>

  <RouterView />
</template>

<style lang="css" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  height: 75px;
}

.home-link {
  font-size: 1.2rem;
  text-decoration: none;
  color: #000;
}

.home-link:hover {
  color: #007bff;
}
</style>
