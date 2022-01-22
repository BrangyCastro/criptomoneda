import React, { useState, useEffect } from "react";
import { Alert } from "..";
import { agregarMoneda } from "../../api/criptomonedas";

export const Form = ({ reload }) => {
  // Con este UseState obtenemos los valores del formulario
  const [form, setForm] = useState({
    nombre: "",
    usd: 0,
  });

  // Con este UseState manejamos los errores
  const [state, setState] = useState({
    validarNombre: false,
    validarUsd: false,
    error: false,
    success: false,
    message: "",
  });

  // Este UseEffect se utiliza para ocultar la alerta
  useEffect(() => {
    setTimeout(() => {
      setState((old) => ({
        ...old,
        error: false,
        success: false,
      }));
    }, 3000);
  }, [state.message]);

  // Funcion para enviar los datos al backend
  const onSubmit = async (e) => {
    e.preventDefault();
    // Se resyablecen los valores del manejador del error
    setState((old) => ({
      ...old,
      error: false,
      success: false,
      validarUsd: false,
      validarNombre: false,
      message: "",
    }));
    // Se formatea la data
    // Al nombre se le eliminan los espacios.
    // Al precio se lo transforma en FLOAT ya que el input los retorna como STRING
    const dataTemp = {
      ...form,
      nombre: form.nombre.trim(),
      usd: parseFloat(form.usd),
    };

    // Se valida si el nombre esta vacio
    if (dataTemp.nombre == "") {
      setState((old) => ({
        ...old,
        validarUsd: false,
        validarNombre: true,
        message: "El nombre es requerido",
      }));
      return;
    }

    // Se valida si el precio es mayor que 0
    if (dataTemp.usd <= 0) {
      setState((old) => ({
        ...old,
        validarUsd: true,
        validarNombre: false,
        message: "El precio es requerido",
      }));
      return;
    }
    // Se envia los datos a la funcion que se encarga de conectarse con el ENDPOINT
    const resp = await agregarMoneda(dataTemp);
    // Validamos si la respuesta del ENDPOINT trae un STATUSCODE
    // En caso que si lo traiga se muestra el error
    if (resp.statusCode) {
      setState((old) => ({
        ...old,
        error: true,
        validarUsd: false,
        validarNombre: false,
        message: resp.message,
      }));
      return;
    }
    // En caso de que el ENDPOINT responde sactifactoriamente se un mesaje
    setState((old) => ({
      ...old,
      success: true,
      validarUsd: false,
      validarNombre: false,
      message: resp,
    }));
    // Se restableces los valores del formulario
    setForm({
      nombre: "",
      usd: 0,
    });
    e.target.reset();
    // Se recarga la tabla para obtener los nuevos valores
    reload();
  };

  const onChange = (e) => {
    setForm((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {state.error && <Alert message={state.message} color="danger" />}
      {state.success && <Alert message={state.message} color="success" />}
      <div className="card">
        <div className="card-header">Nueva Criptomoneda</div>
        <div className="card-body">
          <form onSubmit={onSubmit} onChange={onChange}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                placeholder="Bitcon"
                name="nombre"
              />
              {state.validarNombre && (
                <span className="fst-italic text-danger">{state.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Precio (USD)</label>
              <input
                className="form-control"
                type="number"
                placeholder="4000"
                name="usd"
                step="0.1"
              />
              {state.validarUsd && (
                <span className="fst-italic text-danger">{state.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
