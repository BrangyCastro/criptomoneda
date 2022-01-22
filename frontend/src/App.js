import { useEffect, useState } from "react";
import { Form, Navbar, Table } from "./components";
import { obtenerMonedas } from "./api/criptomonedas";

import "./App.css";

function App() {
  // Con este UseState almacenamos los valores devueltos por el ENDPOINT
  const [state, setState] = useState({
    monedas: [],
    loading: true,
    reload: false,
  });

  // Este UseEffect se utiliza para obtener los datos
  useEffect(() => {
    obtenerDatos();
  }, [state.reload]);

  // Funcion para recargar la tabla
  const reload = () =>
    setState((old) => ({
      monedas: [],
      reload: !old.reload,
      loading: !old.loading,
    }));

  // Funcion para obtener los datos
  const obtenerDatos = async () => {
    setState((old) => ({
      ...old,
      loading: true,
    }));
    // Funcion que se encarga de obtener los datos.
    const resp = await obtenerMonedas();
    // Se establecen los datos retornado por el ENDPOINT
    setState((old) => ({
      ...old,
      monedas: resp,
      loading: false,
    }));
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row App">
          <div className="col-5">
            {state.loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <Table monedas={state.monedas} />
            )}
          </div>
          <div className="col-4">
            <Form reload={reload} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
