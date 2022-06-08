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

    'sNombreAlumno',
    'sNombreCurso',
    'nPractica1',
    'nPractica2',
    'nPractica3',
    'nParcial',
    'nFinal',
    'nPromedioFinal',

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



  //#region Consultar
  fnConsultar() {

    let pParametro: any = [];
    pParametro.push(this.fCodigo.value)

    this.notasService.fnServiceNotas('01', pParametro).subscribe(
      data => {

        this.listaNotas = data;
        if (this.listaNotas.length > 0) {
          this.dataSource = new MatTableDataSource(this.listaNotas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.fnPromediar();
        }
        else {
          Swal.fire({
            title: 'Advertencia',
            text: 'El codigo del Alumno no existe o está anulado',
            icon: 'warning'
          })
        }

      });

  }
  //#endregion


  //#region Eliminar
  async fnEliminar(nIdUsuario: number) {
    let sTitulo: string, sRespuesta: string;

    //Asignar Titulo de Mensaje 
    sTitulo = '¿Desea eliminar la Nota del Alumno?';
    //Asignar Respuesta segun cambio
    sRespuesta = 'Se eliminó la Nota con éxito';

    //Mensaje de confirmacion
    var resp = await Swal.fire({
      title: sTitulo,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    })

    //Si se responde no
    if (!resp.isConfirmed) {
      return;
    }

    //Definicion parametros
    let pParametro = [];
    //Identificador de Usuario
    pParametro.push(nIdUsuario);

    //Llamar al servicio de Alumnos para Eliminar
    this.notasService.fnServiceNotas('05', pParametro).subscribe({
      next: (data) => {
        if (data.mensaje == "Ok") {
          Swal.fire({
            title: sRespuesta,
            icon: 'success',
            timer: 4500
          })
        }
        //Se lista nuevamente los almacenes
        this.fnConsultar();
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete')
    });
  }
  //#endregion Eliminar


  //#region Promediar
  fnPromediar() {
    //Multiplicacion Nota * credito / sumaCreditos

    let sumaNotas: number = 0
    let cantidadNotas = this.listaNotas.length
    if (this.listaNotas.length > 0) {
      for (let i = 0; i < this.listaNotas.length; i++) {
        sumaNotas = sumaNotas + this.listaNotas[i].nPromedioFinal
      }
      this.promedio = parseFloat((sumaNotas / cantidadNotas).toFixed(2));
    }
    else {
      this.promedio = 0
    }

  }
  //#endregion


}
