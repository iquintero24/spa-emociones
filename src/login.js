import { login } from "./auth.js";

export function init() {
  console.log("🚀 login.js cargado");
  const form = document.getElementById("loginForm");
  const error = document.getElementById("loginError");

  if (!form) {
    console.warn("❗Formulario no encontrado");
    return;
  }

  form.addEventListener("submit", async (e) => {
    debugger;
    e.preventDefault();
    const email = form.username.value;
    const password = form.password.value;
    const path = location.hash.slice(1) || "/";

    const result = await login({ email, password });
    if (result.success) {
      if (result.user.rolId === 1 && path !== "/trabajador") {
        location.hash = "/trabajador";
        return;
      }

      if (result.user.rolId === 2 && path !== "/cliente") {
        location.hash = "/cliente";
        return;
      }
    } else {
      error.textContent = result.message;
      error.style.display = "block";
    }
  });
}
