import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
// Para express poder trabalhar com json
app.use(express.json());

// Criar usuários
app.post("/usuarios", async (req, res) => {
  const { name, email, age } = req.body;
  // Utiliznado o prisma para enviar a criação dos dados para o banco de dados configurado
  // prisma.user -> porque nosso schema tem o nome de user
  const newUser = await prisma.user.create({
    data: { email, name, age },
  });

  // Ao cadastrar usuário, o front end obtém uma resposta:
  res.status(201).json(newUser);
});

// Listar todos os usuários
app.get("/usuarios", async (req, res) => {
  let users = [];
  // Verificar existência dos params query:
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        age: req.query.age,
        email: req.query.email,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.status(200).json(users);
});

// Editar um usuário
app.put("/usuarios/:id", async (req, res) => {
  const { name, age, email } = req.body;
  const { id } = req.params;

  try {
    // Verifica se o email já existe em outro usuário
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, age, email },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    // Se for erro de violação de unique (email duplicado), o Prisma lança um erro específico
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Email já está em uso por outro usuário." });

      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  //const { id } = body.params.id;
  await prisma.user.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({ message: "Usuário deletado com sucesso!" });
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
