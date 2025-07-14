// === PLANTILLA SPA CURSOS ===
// Este archivo define las vistas principales para la SPA: login, registro y dashboard.
// Utiliza módulos de autenticación (auth.js), conexión a API (api.js) y enrutamiento (route.js).

import { api } from "./api.js";        // API: peticiones HTTP a tu backend
import { auth } from "./auth.js";      // AUTH: manejo de sesión de usuario
import { router } from "../router/route.js"; // ROUTER: para redirigir entre vistas con location.hash

// 🔴 VISTA 404 (cuando la ruta no existe)
export function renderNotFound() {
  document.getElementById("app").innerHTML = `
    <img width="30%" src="./public/lost-connection.svg" alt="Página no encontrada">
  `;
}

// 🔐 VISTA LOGIN
export async function showLogin() {
  document.getElementById("app").innerHTML = `
    <div class="w-auto h-[45rem] bg-white shadow-md rounded-lg p-[3rem] text-3xl flex flex-col gap-6 text-center">
        <h2 class="text-center">Login</h2>
        <form id="form" class="h-[35rem] flex flex-col justify-around p-6 text-3xl">
            <input class="bg-amber-50 p-3 rounded-2xl" type="email" id="e" placeholder="email">
            <input class="bg-amber-50 p-3 rounded-2xl" type="password" id="p" placeholder="pass">
            <button class="bg-amber-300 p-3 rounded-2xl">Entrar</button>
        </form>
        <a href="#/register" data-link>¿No tienes cuenta? Regístrate</a>
    </div>`;

  // 🔒 Al enviar el login
  document.getElementById("form").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(e.target.e.value, e.target.p.value); // login con email y pass
      location.hash = "#/dashboard"; // redirige al dashboard
      router(); // actualiza la vista
    } catch (err) {
      alert(err.message); // error de login
    }
  };
}

// 📝 VISTA REGISTRO
export async function showRegister() {
  document.getElementById("app").innerHTML = `
    <div class="w-auto h-[45rem] bg-white shadow-md rounded-lg p-[3rem] text-3xl flex flex-col gap-6 text-center">
      <form id="f" class="h-[35rem] flex flex-col justify-around p-6 text-3xl">
        <h2>Registro</h2>
        <input placeholder="nombre" id="n" class="bg-amber-50 p-3 rounded-2xl">
        <input placeholder="email" id="e" class="bg-amber-50 p-3 rounded-2xl">
        <input class="bg-amber-50 p-3 rounded-2xl" placeholder="pass" id="p">
        <button class="bg-amber-300 p-3 rounded-2xl">Registrar</button>
      </form>
    </div>`;

  // Al enviar el registro
  document.getElementById("f").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.register(e.target.n.value, e.target.e.value, e.target.p.value); // crea el usuario
      location.hash = "#/dashboard"; // redirige
      router();
    } catch (err) {
      alert(err.message);
    }
  };
}

// 📊 DASHBOARD PRINCIPAL (para admin y usuarios)
export async function showDashboard() {
  const u = auth.getUser(); // obtiene usuario actual desde localStorage

  let emociones = []; // lista de emociones
  let usuarios = [];  // lista de usuarios (para saber el nombre)

  try {
    // Si es admin (rolId === 1), trae TODAS las emociones
    // Si es usuario (rolId === 2), solo las suyas
    emociones =
      u.rolId === 1
        ? await api.get("/emociones")
        : await api.get(`/emociones?usuarioId=${u.id}`);

    usuarios = await api.get("/users"); // obtiene usuarios para mapear nombres
  } catch (error) {
    console.error("Error al obtener datos:", error);
    emociones = [];
    usuarios = [];
  }

  // Construye HTML para cada emoción
  const emocionesHTML = emociones.map((emo) => {
    const usuario = usuarios.find((user) => user.id == emo.usuarioId);
    const nombreUsuario = usuario ? usuario.name : "Desconocido";
    const esPropietario = u.rolId === 1 || u.id == emo.usuarioId;

    return `
      <div class="bg-white p-4 rounded-xl shadow flex flex-col gap-2" style="border-left: 8px solid ${emo.color};">
        <div class="flex gap-4 items-center">
          <span class="text-3xl">${emo.estado}</span>
          <div>
            <p class="text-sm text-gray-500"><strong>${nombreUsuario}</strong></p>
            <p class="text-sm text-gray-500">${emo.fecha}</p>
            <p class="font-semibold">${emo.nota}</p>
            <p class="text-gray-700">${emo.descripcion}</p>
          </div>
        </div>

        ${
          u.rolId === 1
            ? `<textarea id="comentario-${emo.id}" rows="2" class="w-full p-2 border rounded mt-2" placeholder="Agregar un comentario o consejo...">${emo.comentario || ""}</textarea>
               <button class="bg-amber-300 hover:bg-amber-400 text-sm px-4 py-1 rounded self-end mt-1" onclick="guardarComentario('${emo.id}')">Guardar comentario</button>`
            : emo.comentario
            ? `<p class="text-sm text-green-700 mt-2"><strong>Comentario del consejero:</strong> ${emo.comentario}</p>`
            : ""
        }

        ${
          esPropietario
            ? `<div class="flex justify-end gap-2 mt-2">
                <button class="bg-red-400 hover:bg-red-500 text-white text-sm px-3 py-1 rounded" onclick="eliminarEmocion('${emo.id}')">Eliminar</button>
                <button class="bg-blue-400 hover:bg-blue-500 text-white text-sm px-3 py-1 rounded" onclick="editarEmocion('${emo.id}')">Editar</button>
               </div>`
            : ""
        }
      </div>
    `;
  }).join("");

  // Vista principal
  document.getElementById("app").innerHTML = `
    <div class="w-full h-screen bg-amber-200 p-4 flex flex-col gap-6 overflow-y-auto">
      <nav class="w-full bg-amber-50 p-6 rounded-2xl flex justify-between items-center">
        <h1 class="text-2xl font-bold">OPENMOOD</h1>
        <div class="flex gap-3 items-center">
          <span class="text-sm">Bienvenido, ${u.name}</span>
          <button onclick="logout()" class="bg-red-400 hover:bg-red-500 text-white text-sm px-3 py-1 rounded">Salir</button>
        </div>
      </nav>

      <div class="bg-amber-50 h-full p-6 rounded-2xl flex flex-col gap-4 overflow-y-auto">
        <h2 class="text-xl font-semibold mb-2">Notas de emociones</h2>

        <!-- Mostrar formulario solo para usuarios normales -->
        ${u.rolId === 2 ? `
          <form id="form-emocion" class="bg-white p-4 rounded-xl shadow flex flex-col gap-3">
            <h3 class="text-lg font-semibold mb-1">Registrar nueva emoción</h3>
            <input type="text" id="nueva-estado" class="border rounded p-2" placeholder="Emoji (😄, 😢...)" required />
            <input type="text" id="nueva-nota" class="border rounded p-2" placeholder="Título corto" required />
            <textarea id="nueva-descripcion" class="border rounded p-2" placeholder="Describe cómo te sientes..." required></textarea>
            <input type="date" id="nueva-fecha" class="border rounded p-2" required />
            <label class="flex items-center gap-2">
              Color:
              <input type="color" id="nueva-color" class="w-24" value="#FFE066" />
            </label>
            <button type="submit" class="bg-amber-300 hover:bg-amber-400 text-sm px-4 py-1 rounded self-end">Guardar emoción</button>
          </form>
        ` : ""}

        <!-- Lista de emociones o mensaje si no hay -->
        ${emocionesHTML || '<p class="text-gray-500">No hay emociones registradas.</p>'}
      </div>
    </div>

    <!-- MODAL PARA EDITAR EMOCIÓN -->
    <div id="modal-editar" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 hidden">
      <div class="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">Editar emoción</h2>
        <form id="form-editar" class="flex flex-col gap-3">
          <input type="hidden" id="editar-id" />
          <label>Emoji: <input type="text" id="editar-estado" class="w-full border rounded p-2" required /></label>
          <label>Nota: <input type="text" id="editar-nota" class="w-full border rounded p-2" required /></label>
          <label>Descripción: <textarea id="editar-descripcion" class="w-full border rounded p-2" required></textarea></label>
          <label>Fecha: <input type="date" id="editar-fecha" class="w-full border rounded p-2" required /></label>
          <div class="flex justify-end gap-2 mt-4">
            <button type="button" onclick="cerrarModal()" class="bg-gray-300 hover:bg-gray-400 text-sm px-3 py-1 rounded">Cancelar</button>
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded">Guardar cambios</button>
          </div>
        </form>
      </div>
    </div>
  `;

  // 💬 Guardar comentario del admin
  window.guardarComentario = async function (id) {
    const texto = document.getElementById(`comentario-${id}`).value;
    const emocion = await api.get(`/emociones/${id}`);
    await api.put(`/emociones/${id}`, { ...emocion, comentario: texto });
    alert("Comentario guardado");
  };

  // 🗑️ Eliminar emoción
  window.eliminarEmocion = async function (id) {
    if (!confirm("¿Eliminar esta emoción?")) return;
    await api.delete(`/emociones/${id}`);
    showDashboard(); // recarga dashboard
  };

  // ✏️ Abrir modal de edición
  window.editarEmocion = async function (id) {
    const emo = await api.get(`/emociones/${id}`);
    document.getElementById("editar-id").value = emo.id;
    document.getElementById("editar-estado").value = emo.estado;
    document.getElementById("editar-nota").value = emo.nota;
    document.getElementById("editar-descripcion").value = emo.descripcion;
    document.getElementById("editar-fecha").value = emo.fecha;
    document.getElementById("modal-editar").classList.remove("hidden");
  };

  // ❌ Cerrar modal
  window.cerrarModal = function () {
    document.getElementById("modal-editar").classList.add("hidden");
  };

  // 💾 Guardar cambios de edición
  document.getElementById("form-editar").onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById("editar-id").value;
    const emocion = await api.get(`/emociones/${id}`);
    await api.put(`/emociones/${id}`, {
      ...emocion,
      estado: document.getElementById("editar-estado").value,
      nota: document.getElementById("editar-nota").value,
      descripcion: document.getElementById("editar-descripcion").value,
      fecha: document.getElementById("editar-fecha").value,
    });
    cerrarModal();
    showDashboard(); // recarga vista
  };

  // ➕ Agregar nueva emoción
  const formEmocion = document.getElementById("form-emocion");
  if (formEmocion) {
    formEmocion.onsubmit = async (e) => {
      e.preventDefault();
      await api.post("/emociones", {
        usuarioId: u.id,
        estado: document.getElementById("nueva-estado").value,
        nota: document.getElementById("nueva-nota").value,
        descripcion: document.getElementById("nueva-descripcion").value,
        fecha: document.getElementById("nueva-fecha").value,
        color: document.getElementById("nueva-color").value,
      });
      showDashboard(); // actualiza vista
    };
  }

  // 🔓 Logout
  window.logout = function () {
    auth.logout(); // elimina sesión
    location.hash = "#/login"; // redirige a login
    router();
  };
}
