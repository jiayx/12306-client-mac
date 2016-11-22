export default [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'main',
    component: require('components/MainView'),
  },
  {
    path: '/login',
    name: 'login',
    component: require('components/Login'),
    title: '登录',
  },
];
