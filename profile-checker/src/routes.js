import ShellComponent from "@/components/Shell.component.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "root",
        component: ShellComponent,
    },
];

const router = createRouter({
    history: createWebHistory("/"),
    routes,
});
export default router;
