import Vue from 'vue'
import Router from 'vue-router';
import ProductsIndex from './views/ProductsIndex.vue';
import ProductsShow from './views/ProductsShow.vue';
import ProductsBarcode from './views/ProductsBarcode.vue';
import Scanner from './views/Scanner.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/products', name: 'products-index', component: ProductsIndex },
    { path: "/products/barcode", name: "products-barcode", component: ProductsBarcode },
    { path: "/products/:id", name: "products-show", component: ProductsShow },
    { path: "/scanner", name: "scanner", component: Scanner }

  ]
})
