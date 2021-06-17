//  QUANDO DER ERRO DE LINT, RODAR ESSE COMANDO NO TERMINAL:
// npm run lint -- --fix
// Ou uso o comando a baixo para desabilitar o es-lint na página inteira

/* eslint-disable */

import { createRouter, createWebHistory } from "vue-router";

// * Import dos componentes (Páginas)
// * No Vue as páginas ficam dentro da pasta View, quando o projeto é criado pela CLI
const Home = () => import("../views/Home/index.vue");
const Feedbacks = () => import("../views/Feedbacks/index.vue");
const Credentials = () => import("../views/Credentials/index.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/feedbacks",
    name: "Feedbacks",
    component: Feedbacks,
    meta: {
      hasAuth: true
    }
  },
  {
    path: "/credentials",
    name: "Credentials",
    component: Credentials,
    meta: {
      hasAuth: true
    }
  },
  {
    // Rota 404, o path é uma regex da própria documentção do routes do VUE
    path: "/:pathMatch(.*)*",
    redirect: { name: Home }
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;
