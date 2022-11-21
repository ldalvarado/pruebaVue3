/* la ruta que se usaran, se que es solo una ruta ya que decidi usar un componente, pero igual queria ponerlo para que se viera como se configura, 
aunque se pueden hacer otras configuraciones como por ejemplo para el login */
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../components/ProgramingList.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;