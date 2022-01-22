import { obtenerMonedas } from "../../api/criptomonedas";

describe("Prueba para la conexion con el Backend", () => {
  test("Debe solicitar todas las monedas", async () => {
    const resp = await obtenerMonedas();
    expect(resp.length).toBe(5);
  });
});
