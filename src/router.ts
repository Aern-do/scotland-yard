import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./pages/HomeView.vue";
import TestView from "./pages/TestView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/test-1", component: TestView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
