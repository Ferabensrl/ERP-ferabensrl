import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../api/supabaseClient';

export interface Producto {
  id: number;
  codigo_producto: string;
  codigo_barras: string;
  descripcion: string;
  categoria: string;
  stock: number;
  precio_venta: number;
  proveedor?: string;
  activo: boolean;
  stock_valija?: number;
}

interface ProductosContextValue {
  productos: Producto[];
  cargarProductos: () => Promise<void>;
}

const ProductosContext = createContext<ProductosContextValue | undefined>(undefined);

export const ProductosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  const cargarProductos = async () => {
    const { data } = await supabase.from('productos').select('*');
    setProductos(data || []);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <ProductosContext.Provider value={{ productos, cargarProductos }}>
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) throw new Error('useProductos debe usarse dentro de ProductosProvider');
  return context;
};
