import axios from "axios";

// Funcion para obtener los valores que retorna el ENDPOINT
export const obtenerMonedas = async () => {
  const url = "http://localhost:8000/crypto";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return [];
  }
};
// Funcion para agregar un nueva moneda
export const agregarMoneda = async (moneda) => {
  const url = "http://localhost:8000/crypto";

  try {
    const response = await axios.post(url, moneda);
    return response.data.message;
  } catch (error) {
    return JSON.parse(error.request.response);
  }
};
