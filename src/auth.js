import axios from "axios";

const apiUrl = "http://localhost:3000/";

export async function login({email , password}) {
    debugger
    try {
        const res = await axios.get(`${apiUrl}usuarios`,{
            params:{ email,password, _expand:"rol"} // traer el suaurio con su rol si existe
        });

        console.log(res);

        if (res.data.length === 1) {
          const user = res.data[0];
          localStorage.setItem("user", JSON.stringify(user));
          return { success: true, user };
        } else {
          return { success: false, message: "credenciales invalidas" };
        }
        

    } catch (error) {
        return {succes: false, message: "Error en el servidor"}
    }
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function logout(){
    localStorage.removeItem("user")
    location.hash = "/login"
}