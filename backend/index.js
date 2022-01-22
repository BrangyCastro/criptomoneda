const express = require("express");
const data = require("./data.json");
const app = express();
const port = 8000;
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/crypto", (req, res) => {
  res.send(data);
});

app.post("/crypto", (req, res) => {
  const newData = req.body;

  if (newData.nombre == null || newData.nombre == "")
    return res
      .status(409)
      .send({ statusCode: 409, message: "El nombre es requerido" });

  if (newData.usd == null || newData.usd <= 0)
    return res
      .status(409)
      .send({ statusCode: 409, message: "El precio es requeridos" });

  const result = data.find((item) => item.nombre === newData.nombre);

  if (result) {
    return res.status(409).send({
      statusCode: 409,
      message: `La criptomoneda ${newData.nombre} ya existe.`,
    });
  }

  data.push(newData);
  res.send({ message: "Los datos han sido guardados sactifactoriamente." });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
