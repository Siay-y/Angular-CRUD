import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ElementDialogComponent } from '../element-dialog/element-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

export interface PeriodicElement {
  id: number;
  placa: string;
  chassi: string;
  renavan: string;
  modelo: string;
  marca: string;
  ano: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    placa: 'ABC1234',
    chassi: 'ABC123DEF456GHI789',
    renavan: '12345678900',
    modelo: 'Sedan',
    marca: 'Toyota',
    ano: 2022,
  },
  {
    id: 2,
    placa: 'XYZ5678',
    chassi: 'XYZ987WVU654POI321',
    renavan: '98765432100',
    modelo: 'SUV',
    marca: 'Ford',
    ano: 2023,
  },
  {
    id: 3,
    placa: 'DEF9876',
    chassi: 'DEF456GHI789JKL012',
    renavan: '45678901234',
    modelo: 'Hatchback',
    marca: 'Volkswagen',
    ano: 2024,
  },
  {
    id: 4,
    placa: 'GHI5678',
    chassi: 'GHI123456789JKL345',
    renavan: '78901234567',
    modelo: 'Picape',
    marca: 'Ford',
    ano: 2024,
  },
  {
    id: 5,
    placa: 'JKL9012',
    chassi: 'JKL67890123MNO456',
    renavan: '90123456789',
    modelo: 'Caminhão',
    marca: 'Mercedes-Benz',
    ano: 2024,
  },
];

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [MatTableModule, FormsModule],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = [
    'id',
    'placa',
    'chassi',
    'renavan',
    'modelo',
    'marca',
    'ano',
    'actions',
  ];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data:
        element === null
          ? {
              id: null,
              placa: '',
              chassi: '',
              renavan: '',
              modelo: '',
              marca: '',
              ano: null,
            }
          : {
              id: element.id,
              placa: element.placa,
              chassi: element.chassi,
              renavan: element.renavan,
              modelo: element.modelo,
              marca: element.marca,
              ano: element.ano,
            },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const existingIndex = this.dataSource.findIndex(
          (item) => item.id === result.id
        );
        if (existingIndex !== -1) {
          this.dataSource[existingIndex] = result;
        } else {
          this.dataSource.push(result);
        }
        this.table.renderRows();
      }
    });
  }

  deleteElement(id: number): void {
    this.dataSource = this.dataSource.filter((i) => i.id !== id);
  }

  editElement(element: PeriodicElement): void {
    this.openDialog(element);
  }
}
