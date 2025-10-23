import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./pages/HomeView.vue";
import LobbyView from "./pages/LobbyView.vue";
import RegisterView from "./pages/RegisterView.vue";
import LoginView from "./pages/LoginView.vue";
import PublicGameView from "./pages/PublicGameView.vue";
import GameView from "./pages/GameView.vue";

const routes = [
  { path: "/home", component: HomeView },
  { path: "/register", component: RegisterView },
  { path: "/lobby", component: LobbyView },
  { path: "/", component: LoginView },
  { path: "/public-game", component: PublicGameView },
  { path: "/game/:id", component: GameView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem("currentUser");
  const authPages = ["/", "/register"];

  if (authPages.includes(to.path) && loggedIn) {
    next("/home");
  } else if (!authPages.includes(to.path) && !loggedIn) {
    next("/");
  } else {
    next();
  }
});
