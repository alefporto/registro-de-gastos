import React, { useState } from 'react';

function App() {
  // Estado para armazenar os gastos
  const [gastos, setGastos] = useState([]);
  const [total, setTotal] = useState(0);

return (
    <div>
      <h1>Plataforma de Registro de Gastos</h1>
      <p>Valor total gasto: R$ {total.toFixed(2)}</p>
    </div>
  );
}

export default App;
