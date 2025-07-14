// === PLANTILLA SPA CURSOS ===
// Este archivo gestiona la navegación entre vistas usando el hash (#) en la URL.
// El enrutador carga vistas desde view.js y protege rutas según la sesión del usuario.

// 🔁 Importa funciones de autenticación y vistas
import { auth } from "../js/auth.js"; // Manejo de sesión (login, logout, usuario actual)
import {
  renderNotFound,   // Vista 404 si no encuentra la ruta
  showLogin,        // Vista login
  showRegister,     // Vista registro
  showDashboard     // Vista principal del sistema (autenticado)
} from "../js/view.js";

// 📌 Define aquí las rutas válidas de tu aplicación SPA
// Cada clave es un hash (#/ruta) y su valor es una función que renderiza esa vista.
const routes = {
  '#/login': showLogin,
  '#/register': showRegister,
  '#/dashboard': showDashboard,
  // Puedes agregar más rutas si necesitas otras vistas (por ejemplo: perfil, configuraciones, etc)
};

// 📦 Función principal del enrutador SPA
export function router() {
  const path = location.hash || "#/login"; // Toma el hash actual (#/ruta) o redirige a login por defecto
  const user = auth.getUser(); // Obtiene el usuario actual desde localStorage o null

  // 🔐 Protección de rutas: bloquea acceso a dashboard si no está logueado
  if (path.startsWith("#/dashboard") && !auth.isAuthenticated()) {
    location.hash = "#/login"; // redirige al login
    return;
  }

  // 🚫 Evita que usuarios logueados entren a login o register
  if ((path === "#/login" || path === "#/register") && auth.isAuthenticated()) {
    location.hash = "#/dashboard"; // si ya está autenticado, lo manda al dashboard
    return;
  }

  // 🧭 Navegación: encuentra la vista en las rutas y la ejecuta
  const view = routes[path];
  if (view) {
    view(); // carga la vista correspondiente
  } else {
    renderNotFound(); // si no existe, carga vista 404
  }
}

// 🧠 Recuerda activar el enrutador agregando esto en tu archivo principal (app.js o main.js):
// window.addEventListener('hashchange', router);       // cuando cambie el hash
// window.addEventListener('DOMContentLoaded', router); // cuando cargue la página por primera vez
