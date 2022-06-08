import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  formGroup: FormGroup;
  dataForm: any = []

  constructor(
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private notasService: NotasService,
    private fB: FormBuilder,
  ) {

    this.formGroup = this.fB.group({
      IdAlumno: ["", Validators.required],
      IdCurso: ["", Validators.required],
      nPractica1: ["", Validators.required],
      nPractica2: ["", Validators.required],
      nPractica3: ["", Validators.required],
      nParcial: ["", Validators.required],
      nFinal: ["", Validators.required],
      nPromedioFinal: ["", Validators.required],

    });

  }

  ngOnInit(): void {

    this.fnListarAlumnos();
    this.fnListarCursos();

  }

  //#region Registrar Notas
  fnRegistrar() {

    if (this.fnValidar()) {
      let pParametro = [];
      let sOpcion: string = "03"
      //Llenar formulario   
      pParametro.push(this.formGroup?.controls['IdAlumno'].value);
      pParametro.push(this.formGroup?.controls['IdCurso'].value);
      pParametro.push(this.formGroup?.controls['nPractica1'].value);
      pParametro.push(this.formGroup?.controls['nPractica2'].value);
      pParametro.push(this.formGroup?.controls['nPractica3'].value);
      pParametro.push(this.formGroup?.controls['nParcial'].value);
      pParametro.push(this.formGroup?.controls['nFinal'].value);
      pParametro.push(this.formGroup?.controls['nPromedioFinal'].value);

      if (this.dataForm.length > 0) {
        sOpcion = "04"
      }

      //Llamar al servicio de Alumnos para Guardar
      this.notasService.fnServiceNotas(sOpcion, pParametro).subscribe({
        next: (data) => {

          //Si es válido, retornar mensaje de exito
          if (data.cod == 1) {
            Swal.fire({
              title: data.mensaje,
              icon: 'success',
              timer: 3500
            }).then(() => {
              this.fnLimpiarCampos();
            });
          }
        },
        error: (e) => console.error(e),
        complete: () => this.dataForm = []
      });
    }

  }
  //#endregion


  //#region  Validaciones
  fnValidar(): boolean {

    let nIdAlumno = this.formGroup?.controls['IdAlumno'].value
    let nIdCurso = this.formGroup?.controls['IdCurso'].value

    let nPractica1 = this.formGroup?.controls['nPractica1'].value
    let nPractica2 = this.formGroup?.controls['nPractica2'].value
    let nPractica3 = this.formGroup?.controls['nPractica3'].value
    let nParcial = this.formGroup?.controls['nParcial'].value
    let nFinal = this.formGroup?.controls['nFinal'].value

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
    else if (nPractica1 == '' || nPractica2 == '' || nPractica3 == '' || nParcial == '' || nFinal == '') {
      Swal.fire({
        title: `Digitar todas las Notas`,
        icon: 'warning',
        timer: 3500
      })
      return false
    }
    else if (
      nPractica1 < 0 || nPractica1 > 20 ||
      nPractica2 < 0 || nPractica2 > 20 ||
      nPractica3 < 0 || nPractica3 > 20 ||
      nParcial < 0 || nParcial > 20 ||
      nFinal < 0 || nFinal > 20) {
      Swal.fire({
        title: `Las notas deben estar entre 0 y 20`,
        icon: 'warning',
        timer: 3500
      })
      return false
    }
    else {
      let nPromedioFinal;

      nPromedioFinal = ((nPractica1 + nPractica2 + nPractica3) / 3 + nParcial + (nFinal * 2)) / 4

      nPromedioFinal = parseFloat(nPromedioFinal.toFixed(2))

      this.formGroup?.controls['nPromedioFinal'].setValue(nPromedioFinal);

      return true;
    }


  }
  //#endregion


  //#region Listar Alumnos
  fnListarAlumnos() {
    let pParametro: any = [];
    this.alumnosService.fnServiceAlumnos('01', pParametro).subscribe(
      data => {
        console.log(data)
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


  //#region Listar Notas Existentes
  fnListarNotas() {
    let pParametro: any = [];
    pParametro.push(this.formGroup?.controls['IdAlumno'].value);
    pParametro.push(this.formGroup?.controls['IdCurso'].value);
    this.notasService.fnServiceNotas('02', pParametro).subscribe(
      data => {
        console.log(data)
        this.dataForm = data
        if (data.length > 0) {
          this.formGroup?.controls['nPractica1'].setValue(data[0].nPractica1);
          this.formGroup?.controls['nPractica2'].setValue(data[0].nPractica2);
          this.formGroup?.controls['nPractica3'].setValue(data[0].nPractica3);
          this.formGroup?.controls['nParcial'].setValue(data[0].nParcial);
          this.formGroup?.controls['nFinal'].setValue(data[0].nFinal);
          this.formGroup?.controls['nPromedioFinal'].setValue(data[0].nPromedioFinal);
        }
        else {
          this.dataForm = []
        }

      });
  }
  //#endregion 


  //#region Limpiar Campos
  fnLimpiarCampos() {

    this.formGroup.reset({
      'IdAlumno': '',
      'IdCurso': '',
      'nPractica1': 0,
      'nPractica2': 0,
      'nPractica3': 0,
      'nParcial': 0,
      'nFinal': 0,
      'nPromedioFinal': 0
    });

    this.formGroup.clearValidators()
  }
  //#endregion

}
