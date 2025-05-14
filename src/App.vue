<template>
  <div class="layout">
    <header>
      <nav class="navbar">
        <RouterLink to="/" class="home-link">Home</RouterLink>
        <SearchBar />
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>

    <footer class="footer">
      <a href="#" class="back-to-top">Back to Top</a>
      <p class="copyright">© 2025 AlexMJBL</p>
      <img src="@/assets/images/AlexMJBL-White.png" alt="AlexMJBL Logo" class="footer-logo" />
    </footer>
  </div>
</template>

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

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  font-family: Arial, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgb(3, 37, 65);
  height: 75px;
  display: flex;
  align-items: center;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  width:100%;
}

.home-link {
  font-size: 1.2rem;
  text-decoration: none;
  color: white;
}

.home-link:hover {
  color: lightblue;
}

.content {
  flex: 1;
  padding: 100px 20px 20px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 100px;
  background-color: rgb(3, 37, 65);
  color: white;
  font-family: Arial, sans-serif;
}

.back-to-top {
  color: white;
  text-decoration: none;
  font-size: 1rem;
}

.back-to-top:hover {
  text-decoration: underline;
}

.footer-logo {
  height: 100px; 
}

@media (max-width: 600px) {
  .footer {
    flex-direction: column;
    height: auto;
    padding: 20px;
    gap: 10px;
  }
}
</style>