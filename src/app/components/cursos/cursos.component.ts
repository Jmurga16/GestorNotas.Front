import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosModalComponent } from './cursos-modal/cursos-modal.component';
import { CursosService } from 'src/app/services/cursos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  appName: string = 'Cursos';

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    //'nIdAlumno',
    'sCodCur',
    'sNombre',
    'sDescripcion',
    'sObligatorio',
    'Acciones'
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.fnListarCursos()
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
  fnListarCursos() {
    let pParametro: any = [];
    this.cursosService.fnServiceCursos('01', pParametro).subscribe(
      data => {
        data.forEach((element: { sObligatorio: string; bObligatorio: boolean; }) => {
          element.sObligatorio = element.bObligatorio ? 'SI' : 'NO';
        });

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  //#endregion 


  //#region Abrir Modal
  async fnAbrirModal(accion: number, idCurso: number) {

    //Constante para abrir el modal
    const dialogRef = this.dialog.open(CursosModalComponent, {
      width: '50rem',
      disableClose: true,
      data: {
        accion: accion, //0:Nuevo , 1:Editar
        IdCurso: idCurso
      },
    });
    //Luego de Cerrar el modal
    dialogRef.afterClosed().subscribe((result: any) => {
      //Si el result al cerrar modal es diferente de indefinido
      if (result !== undefined) {
        //Se lista la tabla nuevamente
        this.fnListarCursos();
      }
    });
  }
  //#endregion Abrir Modal


  //#region Eliminar
  async fnCambiarEstado(idCurso: number, option: number) {
    let sTitulo: string, sRespuesta: string;

    //Asignar Titulo de Mensaje 
    sTitulo = option == 0 ? '¿Desea eliminar el Curso?' : '¿Desea activar el Curso?';
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
    pParametro.push(idCurso);
    pParametro.push(option);

    //Llamar al servicio de Alumnos para Eliminar
    this.cursosService.fnServiceCursos('05', pParametro).subscribe({
      next: (data) => {
        if (data.cod == 1) {
          Swal.fire({
            title: sRespuesta,
            icon: 'success',
            timer: 4500
          })
        }
        //Se lista nuevamente los almacenes
        this.fnListarCursos();
      },
      error: (e) => console.error(e),
      //complete: () => console.info('complete')
    });
  }
  //#endregion Eliminar

}
