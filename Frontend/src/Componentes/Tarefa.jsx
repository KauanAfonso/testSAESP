import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Tarefa({ tarefa }) {
  const [status, setStatus] = useState(tarefa.status || "");
  const navigate = useNavigate();

  async function exclusaoTarefa(id) {
    if (confirm("Tem certeza mesmo que quer excluir?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/tarefas/${id}/`);
        alert("Tarefa excluída com sucesso");
        window.location.reload();
      } catch (error) {
        console.error("Erro ao excluir a tarefa", error);
        alert("Erro ao excluir");
      }
    }
  }

  async function alterarStatus() {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tarefas/${tarefa.id}/`, {
        status: status,
      });
      // alert("Status alterado com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao alterar status da tarefa", error);
      alert("Houve um erro na alteração de status");
    }
  }

  return (
    <article className="formularios tarefa">
      <h3 id={`tarefa: ${tarefa.id}`}>{tarefa.descricao}</h3>
      <dl>
        <dt>Setor:</dt>
        <dd>{tarefa.sala}</dd> {/* Ou tarefa.nomeSetor, dependendo do seu backend */}
      </dl>

      <button onClick={() => navigate(`/editarTarefa/${tarefa.id}`)}>Editar</button>
      <button onClick={() => exclusaoTarefa(tarefa.id)}>Excluir</button>

      <form>
        <label>Status: </label>
        <select
          id={tarefa.id}
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="AF">A fazer</option>
          <option value="F">Fazendo</option>
          <option value="P">Pronto</option>
        </select>
      </form>

      <button onClick={alterarStatus}>Alterar Status</button>
    </article>
  );
}
