export function Tarefa({ tarefa }) {
  return (
    <article>
      <h3 id={`tarefa: ${tarefa.id}`}>{tarefa.descricao}</h3>
      <dl>
        <dt>Setor:</dt>
        <dd>{tarefa.sala}</dd>
      </dl>

      <button>Editar</button>
      <button>Excluir</button>


      <form>
        <label>Status: </label>
        <select id={tarefa.id} name="status">
            <option value="">Selecione</option>
            <option value="A Fazer">A fazer</option>
            <option value="Fazendo">Fazendo</option>
            <option value="Pronto">Pronto</option>
        </select>
      </form>
      <button>Alterar Status</button>
    </article>
  );
}
