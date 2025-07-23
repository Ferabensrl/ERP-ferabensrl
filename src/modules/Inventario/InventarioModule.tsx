import React from 'react';
import { ProductosProvider, useProductos } from '../../context/ProductosContext';

const InventarioList: React.FC = () => {
  const { productos } = useProductos();

  return (
    <ul className="space-y-2">
      {productos.map((p) => (
        <li key={p.id} className="border p-2 rounded">
          <div className="font-semibold">{p.descripcion}</div>
          <div>Código: {p.codigo_producto}</div>
          <div>Stock: {p.stock}</div>
        </li>
      ))}
    </ul>
  );
};

const InventarioModule: React.FC = () => (
  <ProductosProvider>
    <InventarioList />
  </ProductosProvider>
);

export default InventarioModule;
