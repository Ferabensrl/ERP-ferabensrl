import xlsx from 'xlsx';
import { supabase } from '../src/api/supabaseClient';

async function main() {
  const workbook = xlsx.readFile('Planilla productos importación nueva.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: any[] = xlsx.utils.sheet_to_json(sheet);

  for (const row of rows) {
    const { Codigo, Descripcion, Categoria, Stock, Precio } = row;
    await supabase.from('productos').insert({
      codigo_producto: Codigo,
      codigo_barras: Descripcion, // barcode in description
      descripcion: Descripcion,
      categoria: Categoria,
      stock: Number(Stock) || 0,
      precio_venta: Number(Precio) || 0,
      activo: true,
    });
  }
}

main();
