import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import ClassConverterView from "@/views/ClassConverterView.vue";
import Documentation from "@/views/Documentation.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/class',
      name: 'class',
      component: ClassConverterView
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: Documentation
    },
  ]
})

export default router
