import express from "express";
const app = express();
const PORT = 3000 || process.env.PORT; // process.env.PORT pega a porta do ambiente de dev. como Replit p.ex.

// Para express poder trabalhar com json
app.use(express.json());

// Simulando usuários
const users = [];

// Criar usuários
app.post("/usuarios", (req, res) => {
  const { name } = req.body;

  users.push(req.body);

  // Ao cadastrar usuário, o front end obtém uma resposta:
  res.send(`Usuário ${name} cadastrado com sucesso!`);
});

// Listar todos os usuários
app.get("/usuarios", (req, res) => {
  res.send(users);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

/* 
  Criar nossa API de usuários:
    - Criar usuários
    - Listar todos os usuários
    - Editar um usuário
    - Deletar um usuário
*/
