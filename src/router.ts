import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./pages/HomeView.vue";
import LobbyView from "./pages/LobbyView.vue";
import RegisterView from "./pages/RegisterView.vue"
import LoginView from "./pages/LoginView.vue";

const routes = [
  { path: "/home", component: HomeView },
  { path: "/register", component: RegisterView },
  { path: "/lobby", component: LobbyView },
  { path: "/", component: LoginView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
