import { createWebHistory, createRouter } from "vue-router";
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import NotFoundView from '@/views/Error/NotFoundView.vue'
import MainView from '@/views/Main/MainView.vue'

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'HomeView',
                component: MainView
            },
        ]
    },
    {
        path: '/error',
        component: BlankLayout,
        children: [
            {
                path: '',
                name: 'NotFoundView',
                component: NotFoundView
            }
        ]
    }
    
    
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router