import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./pages/HomeView.vue";
import TestView from "./pages/TestView.vue";
import LoginView from "./pages/LoginView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/test-1", component: TestView },
  { path: "/login", component: LoginView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
