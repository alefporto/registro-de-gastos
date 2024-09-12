import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estados para controlar os valores dos inputs
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');

  // Estados para armazenar os gastos e o total
  const [gastos, setGastos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log('Renderização do componente');
  }, []);

  // Função para carregar os dados do Local Storage quando o componente for montado
  useEffect(() => {
    const gastosSalvos = localStorage.getItem('gastos');
    console.log('Dados carregados do Local Storage:', gastosSalvos);
    if (gastosSalvos) {
      try {
        const gastosParsed = JSON.parse(gastosSalvos);
        // Verificar se os dados carregados são um array
        if (Array.isArray(gastosParsed)) {
          setGastos(gastosParsed);
        } else {
          console.error('Dados no Local Storage não são um array.');
        }
      } catch (error) {
        console.error('Erro ao parsear dados do Local Storage:', error);
      }
    }
  }, []);

  // Função para recalcular o total sempre que a lista de gastos mudar
  useEffect(() => {
    const novoTotal = gastos.reduce((acumulador, gasto) => acumulador + gasto.valor, 0);
    setTotal(novoTotal);
  }, [gastos]); // O useEffect será chamado toda vez que o array 'gastos' mudar



  // Função para salvar os dados no Local Storage sempre que a lista de gastos mudar
  useEffect(() => {
    try {
      const gastosString = JSON.stringify(gastos);
      console.log('Dados salvos no Local Storage:', gastosString);
      localStorage.setItem('gastos', gastosString);
      const novoTotal = gastos.reduce((acumulador, gasto) => acumulador + gasto.valor, 0);
      setTotal(novoTotal);
    } catch (error) {
      console.error('Erro ao salvar dados no Local Storage:', error);
    }
  }, [gastos]);

  const handleRemove = (id) => {
    // Filtra a lista de gastos para remover o item com o id correspondente
    const novosGastos = gastos.filter((gasto) => gasto.id !== id);
    
    // Atualiza o estado com a nova lista de gastos
    setGastos(novosGastos);
  };

  // Função que será chamada ao submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Criar um novo objeto de gasto
    const novoGasto = {
      id: Date.now(),
      nome,
      data,
      valor: parseFloat(valor)
    };

    // Adiciona o novo gasto à lista de gastos existentes
    setGastos([...gastos, novoGasto]);

    // Limpa os campos após o envio
    setNome('');
    setData('');
    setValor('');
  };

  return (
    <div className="container">
      <h1>Plataforma de Registro de Gastos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Gasto:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Data do Gasto:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Valor do Gasto:</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            step="0.01"
            required
          />
        </div>

        <button type="submit">Adicionar Gasto</button>
      </form>

      <h2>Gastos Registrados:</h2>
      <ul>
        {gastos.map((gasto) => (
          <li key={gasto.id}>
            <span><strong>Nome:</strong> {gasto.nome}</span><br/>
            <span><strong>Data:</strong> {gasto.data}</span><br/>
            <span><strong>Valor:</strong> R${gasto.valor.toFixed(2)}</span>
            <button onClick={() => handleRemove(gasto.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <h3>Valor Total: R$ {total.toFixed(2)}</h3>
    </div>
  );
}

export default App;
