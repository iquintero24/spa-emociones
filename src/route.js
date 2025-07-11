import { getUser } from "./auth";

const routes = {
  "/": "/src/views/home.html",
  "/notFound": "/src/views/notfound.html",
  "/login": "/src/views/login.html",
  "/register": "/src/views/register.html",
  "/cliente": "/src/views/cliente.html",
  "/trabajador": "/src/views/trabajador.html",
};

export async function renderRouter() {
  const app = document.getElementById("app");

  const path = location.hash.slice(1) || "/login";
  const user = getUser();

  if (!user && path !== "/login") {
    location.hash = "/login";
    return;
  }

  if (user && path === "/login") {
    location.hash = `/${user.rol.nombre}`;
    return;
  }

  //proteccion por rol
  if (
    path === "cliente" &&
    user?.rol?.nombre !== "cliente" &&
    path === "trabajador" &&
    user?.rol.nombre !== "trabajador"
  ) {
    app.innerHTML = `<h2>acceso denegado</h2>`;
    location.hash = "/notFound";
    return;
  }

  const view = routes[path];
  if (!view) {
    app.innerHTML = `<h2>Ruta no encontrada</h2>`;
  }

  try {
    const res = await fetch(view);
    const html = await res.text();
    app.innerHTML = html;

    // 👇 Aquí se carga la lógica de cada vista
    switch (path) {
      case "/login":
        import("./login.js").then((m) => m.init());
        break;
      case "/cliente":
        import("./cliente.js").then((m) => m.init(user));
        break;
      case "/trabajador":
        import("./trabajador.js").then((m) => m.init(user));
        break;
    }
  } catch (error) {
    console.log(error);
    app.innerHTML = `<h2>No se pudo renderizar el contenido </h2>`;
  }
}
