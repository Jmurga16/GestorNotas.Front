import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnosModalComponent } from './alumnos-modal/alumnos-modal.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  appName: string = 'Alumnos';

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    //'nIdAlumno',
    'sCodAlu',
    'sNombres',
    'sApellidos',
    'sSexo',
    'dFechaNacimiento',
    'Acciones'
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private alumnosService: AlumnosService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.fnListarAlumnos();
  }


  //#region Filtrado de Tabla
  applyFilter(event: Event) {
    //Leer el filtro
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //Si hay paginacion
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //#endregion


  //#region Listar
  fnListarAlumnos() {
    let pParametro: any = [];
    this.alumnosService.fnServiceAlumnos('01', pParametro).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  //#endregion 


  //#region Abrir Modal
  async fnAbrirModal(accion: number, idAlumno: number) {

    //Constante para abrir el modal
    const dialogRef = this.dialog.open(AlumnosModalComponent, {
      width: '50rem',
      disableClose: true,
      data: {
        accion: accion, //0:Nuevo , 1:Editar
        IdAlumno: idAlumno
      },
    });
    //Luego de Cerrar el modal
    dialogRef.afterClosed().subscribe((result: any) => {
      //Si el result al cerrar modal es diferente de indefinido
      if (result !== undefined) {
        //Se lista la tabla nuevamente
        this.fnListarAlumnos();
      }
    });
  }
  //#endregion Abrir Modal


  //#region Cambiar Estado
  async fnCambiarEstado(nIdUsuario: number, option: number) {
    let sTitulo: string, sRespuesta: string;


    //Asignar Titulo de Mensaje 
    sTitulo = option == 0 ? '¿Desea eliminar al Alumno?' : '¿Desea activar al Alumno?';
    //Asignar Respuesta segun cambio
    sRespuesta = option == 0 ? 'Se eliminó el Alumno con éxito' : 'Se activó el Alumno con éxito';

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
    pParametro.push(option);


    //Llamar al servicio de Alumnos para Eliminar
    this.alumnosService.fnServiceAlumnos('05', pParametro).subscribe({
      next: (data) => {
        if (data.cod == 1) {
          Swal.fire({
            title: sRespuesta,
            icon: 'success',
            timer: 4500
          })
        }
        //Se lista nuevamente los almacenes
        this.fnListarAlumnos();
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete')
    });
  }
  //#endregion Eliminar


}
