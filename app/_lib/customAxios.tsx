import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://127.0.0.1:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

//interceptor de respuesta , se eejecuta antes de llegar a nuestro codigo que hizo el llamado a la instancia de axios RESPUESTA -> INTERCEPTOR DE RESPUESTA -> METODO QUE LLAMA a CUSTOMAXIOS 
customAxios.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  },
  (error) => {
    if (!error.response) return Promise.reject(new Error("Network error"));

    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (error.response.status === 400) {
      console.log(error.response.data.message);
    }

    return Promise.reject(error);
  }
);


customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
