import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Notas } from 'src/app/models/INotas';
import { NotasService } from 'src/app/services/notas.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-notas-consulta',
  templateUrl: './notas-consulta.component.html',
  styleUrls: ['./notas-consulta.component.scss']
})
export class NotasConsultaComponent implements OnInit {

  fCodigo = new FormControl;
  promedio: number = 0

  listaNotas: Notas[] = []

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [

    'sCodAlu',
    'sNombres',
    'sNomCur',
    'nNota'
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private notasService: NotasService,
    public dialog: MatDialog
  ) {

    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit(): void {
  }


  fnConsultar() {

  }
}
