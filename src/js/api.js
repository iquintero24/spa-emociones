// === PLANTILLA SPA CURSOS ===
// Instrucciones: Implementa aquí las funciones para comunicarte con la API REST.
// Puedes usar fetch para hacer peticiones HTTP (GET, POST, PUT, DELETE).
// Cambia la URL base si tu API está en otro puerto o ruta.

export const api = {
  /**
   * URL base de la API. Cambiar si la API corre en otro puerto o dominio.
   * @type {string}
   */
  base: "http://localhost:3000",

  /**
   * Realiza una petición GET a la API REST y devuelve los datos como JSON.
   * @param {string} param - Ruta relativa de la API (ej. '/usuarios', '/cursos/1').
   * @returns {Promise<any>} Respuesta convertida a JSON.
   * @throws {Error} Si ocurre un error en la petición.
   */
  get: async (param) => {
    try {
      const response = await fetch(`${api.base}${param}`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      return await response.json();
    } catch (error) {
      console.error("Error en la petición GET:", error);
      throw error;
    }
  },

  /**
   * Realiza una petición POST a la API REST con los datos proporcionados.
   * @param {string} param - Ruta relativa de la API (ej. '/usuarios').
   * @param {object} data - Objeto con los datos a enviar.
   * @returns {Promise<any>} Respuesta convertida a JSON.
   * @throws {Error} Si ocurre un error en la petición.
   */
  post: async (param, data) => {
    try {
      const response = await fetch(`${api.base}${param}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
   * Realiza una petición PUT a la API REST para actualizar un recurso existente.
   * @param {string} p - Ruta relativa con ID (ej. '/usuarios/2').
   * @param {object} data - Objeto con los datos actualizados.
   * @returns {Promise<any>} Respuesta convertida a JSON.
   * @throws {Error} Si ocurre un error en la petición.
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
   * Realiza una petición DELETE a la API REST para eliminar un recurso.
   * @param {string} p - Ruta relativa con ID (ej. '/usuarios/3').
   * @returns {Promise<any>} Respuesta convertida a JSON.
   * @throws {Error} Si ocurre un error en la petición.
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
