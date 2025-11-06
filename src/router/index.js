import { createWebHistory, createRouter } from "vue-router";
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import ErrorView from '@/views/ErrorView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'HomeView',
                component: HomeView
            },
        ]
    },
    {
        path: '/error',
        component: BlankLayout,
        children: [
            {
                path: '',
                name: 'ErrorView',
                component: ErrorView
            }
        ]
    }
    
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router