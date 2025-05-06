import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/movies/:id',
      name: 'movie-details',
      component: () => import('../views/MovieDetails.vue'),
      props: castRouteParamsId,
    },
    {
      path: '/search/:type/:text',
      name: 'movie-search',
      component: () => import('../views/SearchMovie.vue'),
      props: castRouteParamsTextAndType,
    },
  ],
})

function castRouteParamsId(route) {
  return {
    id: Number(route.params.id),
  }
}

function castRouteParamsTextAndType(route) {
  return {
    text: route.params.text,
    type: route.params.type,
  }
}

export default router
