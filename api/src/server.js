import express from "express";
const app = express();
const PORT = 3000 || process.env.PORT;

app.get("/usuarios", (req, res) => {
  res.send("Está rodando");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
