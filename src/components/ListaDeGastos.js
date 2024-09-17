
import React from 'react';

function ListaDeGastos({ gastos, onRemoveGasto }) {
  return (
    <ul>
      {gastos.map((gasto, index) => (
        <li key={index}>
          <span><strong>Nome:</strong> {gasto.nome}</span>
          <span><strong>Data:</strong> {gasto.data}</span>
          <span><strong>Valor:</strong> R${gasto.valor.toFixed(2)}</span>
          <button className='remove-button' onClick={() => onRemoveGasto(index)}>Remover</button>
        </li>
      ))}
    </ul>
  );
}

export default ListaDeGastos;
