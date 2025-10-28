import "./style.css";
import { Trash } from "lucide-react";

function Home() {
  // Simulando dados do db
  const users = [
    {
      id: "455253dgsdg",
      name: "Romisson",
      age: "32",
      email: "rom@email.com",
    },
    {
      id: "4sdasd33dgsdg",
      name: "Viviane",
      age: "36",
      email: "vivi@email.com",
    },
    {
      id: "4sdasbbjgdsdg",
      name: "Paulo",
      age: "23",
      email: "paulo@email.com",
    },
  ];

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input type="text" name="nome" placeholder="Digite seu nome" />
        <input type="number" name="idade" placeholder="Qual sua idade?" />
        <input type="email" name="email" placeholder="Digite seu email" />
        <button type="button">Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome:<span> {user.name}</span>
            </p>
            <p>
              Idade: <span> {user.age}</span>
            </p>
            <p>
              Email: <span> {user.email}</span>
            </p>
          </div>
          <button>
            <Trash />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
