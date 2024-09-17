import FormularioAdicionarGasto from './components/FormularioAdicionarGasto';
import ListaDeGastos from './components/ListaDeGastos';
import TotalDeGastos from './components/TotalDeGastos';
import React, { useState, useEffect } from 'react';
import './App.css';

// Componente principal da aplicação
function App() {

  // Carrega os gastos presentes em localStorage
  const [gastos, setGastos] = useState(() => {
    const savedGastos = localStorage.getItem('gastos');
    return savedGastos ? JSON.parse(savedGastos) : [];
  });

  // Estado para armazenar o valor total dos gastos
  const [total, setTotal] = useState(0);

  // Salva um gasto no localStorage e atualiza o valor total
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
    const newTotal = gastos.reduce((acc, gasto) => acc + gasto.valor, 0);
    setTotal(newTotal);
  }, [gastos]);

  // Função para adicionar um novo gasto à lista
  const handleAddExpense = (gasto) => {
    setGastos([...gastos, gasto]);
  };

  // Função para remover um gasto da lista
  const handleRemoveExpense = (index) => {
    const updatedGastos = gastos.filter((_, i) => i !== index);
    setGastos(updatedGastos);
  };

  return (
    <div className="container">
      {/* Título da aplicação */}
      <h1>Gerenciador de Gastos</h1>

      {/* Componente de formulário para adicionar novos gastos */}
      <FormularioAdicionarGasto onAddExpense={handleAddExpense}/>

      {/* Componente que exibe a lista de gastos */}
      <ListaDeGastos gastos={gastos} onRemoveGasto={handleRemoveExpense}/>
      
      {/* Componente que exibe o total de gastos */}
      <TotalDeGastos total={total}/>
    </div>
  );
}

export default App;
