export const Table = ({ monedas }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Precio (USD)</th>
        </tr>
      </thead>
      <tbody>
        {monedas.map((item, index) => (
          <tr key={index}>
            <th>{item.nombre}</th>
            <td>{item.usd}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
