import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables, ChartOptions, ChartData } from 'chart.js';
import { Navbar } from '../../components/navbar/navbar';
import { ReporteMensual } from '../../services/reporte-mensual';
import { Ventas } from '../../services/ventas';
import { ExcelExportService } from '../../services/exportar-excel';


Chart.register(...registerables);

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [Navbar, CommonModule, BaseChartDirective],
  templateUrl: './reporte.html',
  styleUrl: './reporte.css',
})


export class Reporte implements OnInit {

  quesadillasHoy: number = 0;
  nugetsHoy: number = 0;
  totalHoy: number = 0;


  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Quesadillas', borderColor: '#1800ad', pointBackgroundColor: '#1800ad', tension: 0.4 },
      { data: [], label: 'Nugets', borderColor: '#5271ff', pointBackgroundColor: '#5271ff', tension: 0.4 },
      { data: [], label: 'Total/100', borderColor: '#ffd21f', pointBackgroundColor: '#ffd21f', tension: 0.4 }
    ]
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',      
          usePointStyle: true,   
          pointStyle: 'circle', 
          font: {
            size: 20,
            family: 'Bryndan Write'
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 18,
            family: 'Bryndan Write'
          }

        },
        grid: {
          color: 'rgba(255,255,255,0.2)' 
        }
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            size: 18,
            family: 'Bryndan Write'
          }      
        },
        grid: {
          color: 'rgba(255,255,255,0.2)'
        }
      }
    }
  };

  constructor(private cdr: ChangeDetectorRef, private reporteService: ReporteMensual, public ventaService: Ventas, private excelService: ExcelExportService) {}

  ngOnInit() {
    this.cargarDatos();
    this.cargarVentasHoy();
  }

  cargarDatos() {
    const datos = this.reporteService.getDatos();
    
    this.lineChartData.labels = datos.map(row => row.mes);
    this.lineChartData.datasets[0].data = datos.map(row => row.quesadillas);
    this.lineChartData.datasets[1].data = datos.map(row => row.nugets);
    this.lineChartData.datasets[2].data = datos.map(row => row.total);
    this.lineChartData = { ...this.lineChartData };
    this.cdr.detectChanges();
  }

  
  verDetalles(){
    this.excelService.exportarReporteCompleto();
  }

  verDetallesHoy(){
    this.excelService.exportarReporteHoy();
  }

  cargarVentasHoy() {
    const ventas = this.ventaService.getVentasHoy();
    this.quesadillasHoy = ventas.reduce((acc, venta) =>
      acc + venta.detalle.filter(d => d.productoId === 1)
                        .reduce((s, d) => s + d.cantidad, 0), 0);
    this.nugetsHoy = ventas.reduce((acc, venta) =>
      acc + venta.detalle.filter(d => d.productoId === 2)
                        .reduce((s, d) => s + d.cantidad, 0), 0);
    this.totalHoy = ventas.reduce((acc, venta) => acc + venta.total, 0);
  }
}