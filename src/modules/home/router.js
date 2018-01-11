const HomeRoute = {
  name: 'home',
  actions: [{
    action: 'home',
    name: 'home',
    ensure: () => import('modules/home/home'),
  }, {
    action: 'dashboard',
    name: 'dashboard',
    ensure: () => import('modules/home/dashboard'),
  }],
}
export default HomeRoute