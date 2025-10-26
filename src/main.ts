import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";

const queryClient = new QueryClient();

createApp(App).use(router).use(VueQueryPlugin, { queryClient }).mount("#app");
