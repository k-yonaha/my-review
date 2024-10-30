import { createRouter, createWebHistory } from "vue-router";
import AboutView from "./components/AboutView.vue";
import HomeView from "./components/HomeView.vue";
import GoogleMap from "./components/GoogleMap.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: GoogleMap,
            name: "map"
        },
        // {
        //     path: "/about",
        //     name: "about",
        //     component: AboutView,
        // },
        // {
        //     path: "/map",
        //     component: GoogleMap,
        //     name: "map"
        // }
    ],
});

export default router;