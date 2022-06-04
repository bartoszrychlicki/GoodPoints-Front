import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import TasksView from '../views/TasksView.vue'
import SaveTasks from '../components/tasks/Save.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/logout',
      name: 'logout',
      redirect: (to) => {
        localStorage.clear()
        return { path: '/login' }
      },
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/save-tasks',
      name: 'save-tasks',
      component: SaveTasks,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && localStorage.getItem('token') === null) {
    return {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    }
  }
})

export default router
