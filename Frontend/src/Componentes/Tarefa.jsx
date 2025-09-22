import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDraggable } from '@dnd-kit/core';

export function Tarefa({ tarefa }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(tarefa.status);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarefa.id, // Garante que seja uma string
  });

  // Estilo aplicado ao arrastar
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined
  };

  //Função para deletar uma tarefa
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

  //Function for update any task status
  async function alterarStatus(e) {
    e.preventDefault();
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tarefas/${tarefa.id}/`, {
        status: status,
      });
      location.reload();
    } catch (error) {
      console.error("Erro ao alterar status da tarefa", error);
      alert("Houve um erro na alteração de status");
    }
  }


  return (
    <article className="formularios tarefa" ref={setNodeRef} style={style} 
    {...attributes}>

      {/*o ..listeners é o ouvinte que esta esperando ser 'drag' */}
      <section className='secitionA1' {...listeners}>
        <h3 id={`tarefa-${tarefa.id}`}>{tarefa.descricao}</h3>
        <dl>
          <dt>Setor:</dt>
          <dd>{tarefa.nomeSala}</dd>
        </dl>

      </section>
      

      <button onClick={() => navigate(`/editarTarefa/${tarefa.id}`)}>Editar</button>
      <button onClick={() => exclusaoTarefa(tarefa.id)}>Excluir</button>

      <form>
        <label>Status: </label>
        <select aria-label='Selecione o status da tarefa'
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
