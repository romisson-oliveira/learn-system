import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
// Para express poder trabalhar com json
app.use(express.json());

// Criar usuários
app.post("/usuarios", async (req, res) => {
  // const { name, email, age } = req.body;
  // Utiliznado o prisma para enviar a criação dos dados para o banco de dados configurado
  // prisma.user -> porque nosso schema tem o nome de user
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  // Ao cadastrar usuário, o front end obtém uma resposta:
  res.status(201).json(req.body);
});

// Listar todos os usuários
app.get("/usuarios", async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

/* 
  Criar nossa API de usuários:
    - Criar usuários
    - Listar todos os usuários
    - Editar um usuário
    - Deletar um usuário
*/
