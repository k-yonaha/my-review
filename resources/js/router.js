import { createRouter, createWebHistory } from "vue-router";
import AboutView from "./components/AboutView.vue";
import HomeView from "./components/HomeView.vue";
import GoogleMap from "./components/GoogleMap.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/about",
            name: "about",
            component: AboutView,
        },
        {
            path: "/",
            component: HomeView,
            name: "home"
        },
        {
            path: "/map",
            component: GoogleMap,
            name: "map"
        }
    ],
});

export default router;