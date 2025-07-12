// === PLANTILLA SPA CURSOS ===
// Instrucciones: Implementa la lógica de enrutamiento y vistas importando las funciones necesarias desde views.js y auth.js.
// Puedes agregar, modificar o eliminar rutas según lo requiera tu aplicación.

// Importa los módulos necesarios
import { auth } from "../js/auth.js";
import {
  renderNotFound,
  showLogin,
  showRegister,
  showDashboard // Implementa en views.js
} from "../js/view.js";

// Define aquí las rutas de tu SPA
const routes = {
  '#/login': showLogin,
  '#/register': showRegister,
  '#/dashboard': showDashboard
  // Puedes agregar más rutas según lo necesites
};

// Función principal de enrutamiento
export function router() {
  const path = location.hash || "#/login";
  const user = auth.getUser();

  // Ejemplo: proteger rutas de dashboard
  if (path.startsWith("#/dashboard") && !auth.isAuthenticated()) {
    location.hash = "#/login";
    return;
  }

  // Ejemplo: evitar que usuarios logueados accedan a login/register
  if ((path === "#/login" || path === "#/register") && auth.isAuthenticated()) {
    location.hash = "#/dashboard";
    return;
  }


  // Cargar la vista correspondiente
  const view = routes[path];
  if (view) {
    view();
  } else {
    renderNotFound(); // Implementa esta función en views.js
  }
}

// Recuerda agregar los listeners en app.js para inicializar el router
// window.addEventListener('hashchange', router);
// window.addEventListener('DOMContentLoaded', router);
