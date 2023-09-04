import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout';
import UnauthenticatedLayout from '@/layouts/UnauthenticatedLayout';
import { requireGuest, requeireMember } from '@/middlewares/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      beforeEnter: requeireMember,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home')
        },
        {
          path: '/network',
          name: 'Network',
          component: () => import('@/views/Network')
        },
        {
          path: 'add-network',
          name: 'AddNetwork',
          component: () => import('@/views/AddNetwork')
        },
        {
          path: '/offer',
          name: 'Offer',
          component: () => import('@/views/offer/Index')
        },
        {
          path: '/offer/add',
          name: 'AddOffer',
          component: () => import('@/views/offer/Add-Edit')
        },
        {
          path: 'offer/update/:id',
          name: 'UpdateOffer',
          component: () => import('@/views/offer/Add-Edit.vue')
        }
      ],
    },
    {
      path: '/login',
      component: UnauthenticatedLayout,
      beforeEnter: requireGuest,
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('@/views/Login')
        }
      ]
    }
  ]
})

export default router
