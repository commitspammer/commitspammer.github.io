import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FilmHallView from '../views/FilmHallView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      /* component: HomeView, */
      redirect: '/films',
    },
    {
      path: '/films',
      name: 'films',
      component: FilmHallView,
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue'),
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
  ],
})

export default router
