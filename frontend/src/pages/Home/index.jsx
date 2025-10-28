import { useEffect, useState } from "react";
import "./style.css";
import { Trash, LoaderCircle } from "lucide-react";
import api from "../../services/api.js";

function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  };

  const createUser = async () => {
    // Evita enviar com campos vazios
    if (!name || !age || !email) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/usuarios", {
        name,
        age,
        email,
      });

      console.log("Usuário criado:", response.data);
      //alert("Usuário criado com sucesso!");

      // Limpa os campos após sucesso
      setName("");
      setAge("");
      setEmail("");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário. Tente novamente.");
    } finally {
      getUsers();
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const deleteUser = async (id) => {
    if (!id) return;
    try {
      await api.delete(`/usuarios/${id}`);
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    } finally {
      getUsers();
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input
          type="text"
          name="nome"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          name="idade"
          placeholder="Qual sua idade?"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          onClick={createUser}
          disabled={loading}
          style={{
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <LoaderCircle
              className="animate-spin"
              size={20}
              strokeWidth={2.5}
            />
          ) : (
            "Criar Usuário"
          )}
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome:<span> {user.name}</span>
            </p>
            <p>
              Idade: <span> {String(user.age)}</span>
            </p>
            <p>
              Email: <span> {user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUser(user.id)}>
            <Trash />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
