import {
  Authentication,
  Home,
  Profile,
  TracingData,
  Trace,
  Missing,
} from '@/router/views';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true, requiresProfile: true },
  },
  {
    path: '/tracing-data',
    name: 'Tracing Data',
    component: TracingData,
    meta: { requiresAuth: true, requiresProfile: true },
  },
  {
    path: '/trace',
    name: 'Contact Tracing',
    component: Trace,
    meta: { requiresAuth: false },
  },
  {
    path: '/qr/*',
    name: 'Contact Tracing',
    component: Trace,
    meta: { requiresAuth: false },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    name: 'Authenticator',
    component: Authentication,
  },
  {
    path: '*',
    name: '404',
    redirect: '/',
  },
  {
    path: '/404',
    name: '404',
    component: Missing,
  },
];
