
import React, { useState } from 'react';

// Define o formulário para adicionar um novo gasto.
function AddExpenseForm({ onAddExpense }) {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');

  // Trata o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    if (nome && data && valor) {
      onAddExpense({ nome, data, valor: parseFloat(valor) });
      setNome('');
      setData('');
      setValor('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do gasto"
        required
      />

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        required
      />

      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        step="0.01"
        placeholder="Valor do gasto"
        required
      />
      
      <button type="submit" className='add-button'>Adicionar Gasto</button>
    </form>
  );
}

export default AddExpenseForm;
