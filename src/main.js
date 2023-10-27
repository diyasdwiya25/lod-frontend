import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';
import ArtikelCreate from './components/pages/artikel/ArtikelCreate';
import ArtikelList from './components/pages/artikel/ArtikelList';
import ArtikelEdit from './components/pages/artikel/ArtikelEdit';
import ArtikelShow from './components/pages/artikel/ArtikelShow';

import WriterCreate from './components/pages/writer/WriterCreate';
import WriterList from './components/pages/writer/WriterList';
import WriterEdit from './components/pages/writer/WriterEdit';

import CategoryCreate from './components/pages/category/CategoryCreate';
import CategoryList from './components/pages/category/CategoryList';
import CategoryEdit from './components/pages/category/CategoryEdit';

axios.defaults.baseURL = "http://localhost:8080"


const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/artikel/list', component: ArtikelList },
      { path: '/artikel/create', component: ArtikelCreate },
      { path: '/artikel/edit/:id', component: ArtikelEdit },
      { path: '/artikel/read/:slug', component: ArtikelShow },
      { path: '/writer/list', component: WriterList },
      { path: '/writer/create', component: WriterCreate },
      { path: '/writer/edit/:id', component: WriterEdit },
      { path: '/category/list', component: CategoryList },
      { path: '/category/create', component: CategoryCreate },
      { path: '/category/edit/:id', component: CategoryEdit },
    ],
  });
    
  createApp(App).use(router).mount('#app');
