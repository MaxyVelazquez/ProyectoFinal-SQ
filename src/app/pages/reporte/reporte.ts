import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective} from 'ng2-charts';
import {ChartOptions, ChartData } from 'chart.js';
import { Navbar } from '../../components/navbar/navbar';



@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [Navbar, CommonModule, BaseChartDirective],
  templateUrl: './reporte.html',
  styleUrl: './reporte.css'
  
})
export class Reporte implements OnInit {

  datos = [
    { mes: 'Dia 1', quesadillas: 6, nugets: 6, total: 6.6 },
    { mes: 'Dia 2', quesadillas: 5, nugets: 7, total: 5.7 },
    { mes: 'Dia 3', quesadillas: 8, nugets: 7, total: 8.7 },
    { mes: 'Dia 4', quesadillas: 2, nugets: 9, total: 2.9 }
  ];

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

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.lineChartData.labels = this.datos.map(row => row.mes);
    this.lineChartData.datasets[0].data = this.datos.map(row => row.quesadillas);
    this.lineChartData.datasets[1].data = this.datos.map(row => row.nugets);
    this.lineChartData.datasets[2].data = this.datos.map(row => row.total);

    this.lineChartData = { ...this.lineChartData };
    this.cdr.detectChanges();
  }
}