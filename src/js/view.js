// === PLANTILLA SPA CURSOS ===
// Instrucciones: Implementa aquí las funciones de renderizado de vistas.
// Usa el DOM para mostrar formularios, listas y mensajes según la ruta activa.
// Puedes usar fetch o el módulo api.js para obtener datos.
// Usa el módulo auth.js para autenticación.

import { api } from "./api.js"; // Implementa y exporta funciones de API en api.js
import { auth } from "./auth.js"; // Implementa y exporta funciones de autenticación en auth.js
import { router } from "../router/route.js"; // Importa el enrutador para redirigir después de acciones

export function renderNotFound() {
  document.getElementById("app").innerHTML = `
        <img width="30%"  src="./public/lost-connection.svg" alt="">
    `;
}

// Implementa la vista de login
export async function showLogin() {
  document.getElementById("app").innerHTML = `
    <div class="w-auto h-[45rem] bg-white shadow-md rounded-lg p-[3rem] text-3xl flex flex-col gap-6 text-center">
        <h2 class="text-center">Login</h2>
        <form id="form" class="h-[35rem] flex flex-col justify-around p-6 text-3xl">
            <input class="bg-amber-50 p-3 rounded-2xl" type="email" id="e" placeholder="email">
            <input class="bg-amber-50 p-3 rounded-2xl"  type="password" id="p" placeholder="pass">
            <button class="bg-amber-300 p-3 rounded-2xl">Entrar</button>
        </form>
        <a href="#/register" data-link>¿No tienes cuenta? Regístrate</a>
    </div>`;
  document.getElementById("form").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(e.target.e.value, e.target.p.value);
      location.hash = "#/dashboard";
      router();
    } catch (err) {
      alert(err.message);
    }
  };
}

// Implementa la vista de registro
export async function showRegister() {
  document.getElementById("app").innerHTML = `
    <div class="w-auto h-[45rem] bg-white shadow-md rounded-lg p-[3rem] text-3xl flex flex-col gap-6 text-center">
      <form id="f" class="h-[35rem] flex flex-col justify-around p-6 text-3xl">
        <h2>Registro</h2>
        <input  placeholder="nombre" id="n" class="bg-amber-50 p-3 rounded-2xl">
        <input  placeholder="email" id="e" class="bg-amber-50 p-3 rounded-2xl">
        <input  class="bg-amber-50 p-3 rounded-2xl" placeholder="pass" id="p">
        <button class="bg-amber-300 p-3 rounded-2xl">Registrar</button>
      </form>
    </div>`;
  document.getElementById('f').onsubmit = async e => {
    e.preventDefault();
    try {
      await auth.register(e.target.n.value, e.target.e.value, e.target.p.value);
      location.hash = '#/dashboard';
      router();
    } catch (err) {
      alert(err.message);
    }
  };
}

// Implementa la vista principal del dashboard
export async function showDashboard() {
  const u = auth.getUser();
  document.getElementById("app").innerHTML = /*html*/ ` 
    <div class="w-full h-screen bg-amber-200 p-4">
        <nav class="w-full bg-amber-50 p-6 rounded-2xl flex justify-center items-center">
            <h1 class="text-2xl">OPENMOOD</h1>
        </nav>
    </div>`;
}
