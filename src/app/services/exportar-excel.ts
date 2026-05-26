import { Injectable, inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { Ventas, VentaCompleta } from './ventas';
import { InventarioSQ } from './inventario-sq';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {
  private ventasService = inject(Ventas);
  private inventarioService = inject(InventarioSQ);

  exportarReporteCompleto(): void {
    const wb = XLSX.utils.book_new();
    const reporte = this.ventasService.getReporte();
    const productos = this.inventarioService.getProductos();

    // HOJA 1: Resumen por día
    const resumenDia: any[][] = [
      ['Fecha', 'Quesadillas', 'DinoNuggets', 'Total ($)']
    ];
    const agrupado: { [dia: string]: { quesadillas: number, nuggets: number, total: number } } = {};
    for (const venta of reporte) {
      const dia = venta.fecha.split(' ')[0];
      if (!agrupado[dia]) agrupado[dia] = { quesadillas: 0, nuggets: 0, total: 0 };
      agrupado[dia].total += venta.total;
      for (const item of venta.detalle) {
        if (item.productoId === 1) agrupado[dia].quesadillas += item.cantidad;
        if (item.productoId === 2) agrupado[dia].nuggets += item.cantidad;
      }
    }
    for (const [dia, valores] of Object.entries(agrupado).sort()) {
      resumenDia.push([dia, valores.quesadillas, valores.nuggets, valores.total]);
    }
    resumenDia.push([]);
    resumenDia.push([
      'TOTAL',
      `=SUM(B2:B${resumenDia.length - 1})`,
      `=SUM(C2:C${resumenDia.length - 1})`,
      `=SUM(D2:D${resumenDia.length - 1})`
    ]);
    const ws1 = XLSX.utils.aoa_to_sheet(resumenDia);
    this.aplicarEstilos(ws1, resumenDia.length);
    XLSX.utils.book_append_sheet(wb, ws1, 'Resumen por día');

    // HOJA 2: Todas las ventas
    const todasVentas: any[][] = [
      ['ID Venta', 'Fecha', 'Hora', 'Estado', 'Total ($)']
    ];
    for (const venta of reporte) {
      const [fecha, hora] = venta.fecha.split(' ');
      todasVentas.push([venta.id, fecha, hora ?? '', venta.estado, venta.total]);
    }
    todasVentas.push([]);
    todasVentas.push(['', '', '', 'TOTAL', `=SUM(E2:E${todasVentas.length - 1})`]);
    const ws2 = XLSX.utils.aoa_to_sheet(todasVentas);
    this.aplicarEstilos(ws2, todasVentas.length);
    XLSX.utils.book_append_sheet(wb, ws2, 'Todas las ventas');

    //HOJA 3: Detalle de ventas
    const detalleVentas: any[][] = [
      ['ID Venta', 'Fecha', 'Producto', 'Cantidad', 'Precio Unitario ($)', 'Subtotal ($)']
    ];
    for (const venta of reporte) {
      const [fecha] = venta.fecha.split(' ');
      for (const item of venta.detalle) {
        const producto = productos.find(p => p.id === item.productoId);
        const nombreProducto = producto?.producto ?? `Producto ${item.productoId}`;
        const subtotal = item.cantidad * item.precioUnitario;
        detalleVentas.push([
          venta.id,
          fecha,
          nombreProducto,
          item.cantidad,
          item.precioUnitario,
          subtotal
        ]);
      }
    }
    detalleVentas.push([]);
    detalleVentas.push(['', '', '', '', 'TOTAL', `=SUM(G2:G${detalleVentas.length - 1})`]);
    const ws3 = XLSX.utils.aoa_to_sheet(detalleVentas);
    this.aplicarEstilos(ws3, detalleVentas.length);
    XLSX.utils.book_append_sheet(wb, ws3, 'Detalle de ventas');

    //HOJA 4: Resumen por producto
    const resumenProducto: any[][] = [
      ['Producto', 'Total Vendido', 'Ingresos ($)', 'Precio Actual ($)', 'Stock Actual']
    ];
    for (const producto of productos) {
      let totalVendido = 0;
      let ingresos = 0;
      for (const venta of reporte) {
        for (const item of venta.detalle) {
          if (item.productoId === producto.id) {
            totalVendido += item.cantidad;
            ingresos += item.cantidad * item.precioUnitario;
          }
        }
      }
      resumenProducto.push([
        producto.producto,
        totalVendido,
        ingresos,
        producto.precio,
        producto.cantidad
      ]);
    }
    const ws4 = XLSX.utils.aoa_to_sheet(resumenProducto);
    this.aplicarEstilos(ws4, resumenProducto.length);
    XLSX.utils.book_append_sheet(wb, ws4, 'Resumen por producto');

    const fecha = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `reporte-completo-${fecha}.xlsx`);
  }

  exportarReporteHoy(): void {
    const wb = XLSX.utils.book_new();
    const hoy = new Date().toISOString().split('T')[0];
    const ventas = this.ventasService.getVentasHoy();
    const productos = this.inventarioService.getProductos();

    const datos: any[][] = [
      ['ID Venta', 'Hora', 'Producto', 'Cantidad', 'Precio Unitario ($)', 'Subtotal ($)', 'Total Venta ($)']
    ];

    for (const venta of ventas) {
      const hora = venta.fecha.split(' ')[1] ?? '';
      let primeraFila = true;
      for (const item of venta.detalle) {
        const producto = productos.find(p => p.id === item.productoId);
        const nombreProducto = producto?.producto ?? `Producto ${item.productoId}`;
        const subtotal = item.cantidad * item.precioUnitario;
        datos.push([
          primeraFila ? venta.id : '',
          primeraFila ? hora : '',
          nombreProducto,
          item.cantidad,
          item.precioUnitario,
          subtotal,
          primeraFila ? venta.total : ''
        ]);
        primeraFila = false;
      }
    }

    datos.push([]);
    datos.push(['', '', '', '', '', 'TOTAL', `=SUM(G2:G${datos.length - 1})`]);

    const ws = XLSX.utils.aoa_to_sheet(datos);
    this.aplicarEstilos(ws, datos.length);
    XLSX.utils.book_append_sheet(wb, ws, `Ventas ${hoy}`);

    XLSX.writeFile(wb, `reporte-hoy-${hoy}.xlsx`);
  }

  private aplicarEstilos(ws: XLSX.WorkSheet, totalFilas: number): void {
    const range = XLSX.utils.decode_range(ws['!ref'] ?? 'A1');

    // Ancho de columnas
    ws['!cols'] = Array(range.e.c + 1).fill({ wch: 20 });

    // Fila de encabezado en negrita
    for (let c = range.s.c; c <= range.e.c; c++) {
      const cell = ws[XLSX.utils.encode_cell({ r: 0, c })];
      if (cell) {
        cell.s = {
          font: { bold: true, name: 'Arial', sz: 11 },
          fill: { fgColor: { rgb: '1800AD' } },
          font2: { color: { rgb: 'FFFFFF' } },
          alignment: { horizontal: 'center' }
        };
      }
    }

    // Fila de totales en negrita
    const filaTotal = totalFilas - 1;
    for (let c = range.s.c; c <= range.e.c; c++) {
      const cell = ws[XLSX.utils.encode_cell({ r: filaTotal, c })];
      if (cell) {
        cell.s = { font: { bold: true, name: 'Arial', sz: 11 } };
      }
    }
  }
}