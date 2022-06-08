import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Curso } from 'src/app/models/ICurso';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { NotasService } from 'src/app/services/notas.service';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';
import { Alumno } from './../../../models/IAlumno';

@Component({
  selector: 'app-notas-registro',
  templateUrl: './notas-registro.component.html',
  styleUrls: ['./notas-registro.component.scss']
})
export class NotasRegistroComponent implements OnInit {


  lAlumnos?: Alumno[]
  lCursos?: Curso[]

  fAlumno = new FormControl();
  fCurso = new FormControl();
  fNota = new FormControl();

  constructor(
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private notasService: NotasService
  ) {
    this.fAlumno = new FormControl();
    this.fCurso = new FormControl();
    this.fNota = new FormControl();
  }

  ngOnInit(): void {

    this.fnListarAlumnos();
    this.fnListarCursos();

  }

  //#region Registrar Notas
  fnRegistrar() {

    let nIdAlumno = this.fAlumno.value
    let nIdCurso = this.fCurso.value
    let nNota = this.fNota.value

    if (this.fnValidar()) {
      let pParametro = [];
      //Llenar formulario        
      pParametro.push(nIdAlumno);
      pParametro.push(nIdCurso);
      pParametro.push(nNota);


      //Llamar al servicio de Alumnos para Guardar
      this.notasService.fnServiceNotas('03', pParametro).subscribe({
        next: (data) => {

          //Si es válido, retornar mensaje de exito
          if (data.cod == 1) {
            Swal.fire({
              title: data.mensaje,
              icon: 'success',
              timer: 3500
            }).then(() => {
              this.fAlumno.setValue("");
              this.fCurso.setValue("");
              this.fNota.setValue("");
            });
          }
        },
        error: (e) => console.error(e),
        //complete: () => console.info('complete')
      });
    }
    else {

    }

  }
  //#endregion


  //#region  Validaciones
  fnValidar(): boolean {

    let nIdAlumno = this.fAlumno.value
    let nIdCurso = this.fCurso.value
    let nNota = this.fNota.value

    if (nIdAlumno == null || nIdAlumno == 0) {
      Swal.fire({
        title: `Seleccionar un alumno`,
        icon: 'error',
        timer: 3500
      })
      return false
    }
    else if (nIdCurso == null || nIdCurso == 0) {
      Swal.fire({
        title: `Seleccionar un curso`,
        icon: 'error',
        timer: 3500
      })
      return false
    }
    else if (nIdCurso == null || nNota == undefined || nNota == '') {
      Swal.fire({
        title: `Digitar una Nota`,
        icon: 'warning',
        timer: 3500
      })
      return false
    }
    else if (nIdCurso < 0 || nNota > 20) {
      Swal.fire({
        title: `La nota debe estar entre 0 y 20`,
        icon: 'warning',
        timer: 3500
      })
      return false
    }
    else {
      return true;
    }


  }
  //#endregion


  //#region Listar Alumnos
  fnListarAlumnos() {
    let pParametro: any = [];
    this.alumnosService.fnServiceAlumnos('01', pParametro).subscribe(
      data => {
        this.lAlumnos = data
      });
  }
  //#endregion 


  //#region Listar Cursos
  fnListarCursos() {
    let pParametro: any = [];
    this.cursosService.fnServiceCursos('01', pParametro).subscribe(
      data => {
        this.lCursos = data
      });
  }
  //#endregion 


}
