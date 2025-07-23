import React, { createContext, useContext, useState } from 'react';

interface Pedido {
  id: number;
  cliente: string;
  fecha: string;
  estado: string;
}

interface PedidosContextValue {
  pedidos: Pedido[];
  setPedidos: React.Dispatch<React.SetStateAction<Pedido[]>>;
}

const PedidosContext = createContext<PedidosContextValue | undefined>(undefined);

export const PedidosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  return (
    <PedidosContext.Provider value={{ pedidos, setPedidos }}>
      {children}
    </PedidosContext.Provider>
  );
};

export const usePedidos = () => {
  const context = useContext(PedidosContext);
  if (!context) throw new Error('usePedidos debe usarse dentro de PedidosProvider');
  return context;
};
