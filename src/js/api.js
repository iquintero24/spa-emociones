// === PLANTILLA SPA CURSOS ===
// Instrucciones: Implementa aquí las funciones para comunicarte con la API REST.
// Puedes usar fetch para hacer peticiones HTTP (GET, POST, PUT, DELETE).
// Cambia la URL base si tu API está en otro puerto o ruta.

export const api = {
  /**
   * 🔗 URL base de la API. Cambia esto si tu backend está en otro servidor o puerto.
   * @type {string}
   */
  base: "http://localhost:3000",

  /**
   * 📥 GET: Recupera datos desde una ruta específica de la API REST.
   * @param {string} param - Ruta relativa (por ejemplo: '/usuarios', '/emociones').
   * @returns {Promise<any>} Objeto JS obtenido desde el servidor.
   * @throws {Error} Si ocurre un fallo de red o respuesta incorrecta.
   */
  get: async (param) => {
    try {
      const response = await fetch(`${api.base}${param}`); // 👈 Se construye la URL completa
      if (!response.ok) {
        throw new Error("Error al obtener los datos"); // ❌ Si no responde 200 OK
      }
      return await response.json(); // ✅ Devuelve el JSON
    } catch (error) {
      console.error("Error en la petición GET:", error); // 🐞 Log en consola
      throw error;
    }
  },

  /**
   * 📤 POST: Crea un nuevo recurso en el backend.
   * @param {string} param - Ruta relativa (ej: '/usuarios').
   * @param {object} data - Objeto con la información a enviar.
   * @returns {Promise<any>} Objeto JSON con la respuesta del servidor.
   * @throws {Error} Si la operación falla.
   */
  post: async (param, data) => {
    try {
      const response = await fetch(`${api.base}${param}`, {
        method: "POST", // Método HTTP
        headers: {
          "Content-Type": "application/json", // Encabezado para enviar JSON
        },
        body: JSON.stringify(data), // 🔄 Convierte JS a JSON
      });
      if (!response.ok) {
        throw new Error("Error al crear los datos");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en la petición POST:", error);
      throw error;
    }
  },

  /**
   * ✏️ PUT: Actualiza un recurso existente (usualmente con ID).
   * @param {string} p - Ruta con ID (ej: '/usuarios/1').
   * @param {object} data - Datos actualizados.
   * @returns {Promise<any>} Respuesta del servidor.
   * @throws {Error} Si falla la petición.
   */
  put: async (p, data) => {
    try {
      const response = await fetch(`${api.base}${p}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar los datos");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en la petición PUT:", error);
      throw error;
    }
  },

  /**
   * 🗑️ DELETE: Elimina un recurso desde la API REST.
   * @param {string} Rutaid - Ruta con ID a eliminar (ej: '/usuarios/1').
   * @returns {Promise<any>} Respuesta del servidor.
   * @throws {Error} Si la operación falla.
   */
  delete: async (Rutaid) => {
    try {
      const response = await fetch(`${api.base}${Rutaid}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar los datos");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en la petición DELETE:", error);
      throw error;
    }
  },
};
