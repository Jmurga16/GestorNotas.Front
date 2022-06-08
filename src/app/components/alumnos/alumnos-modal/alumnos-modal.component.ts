import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoData } from 'src/app/models/IAlumno';
import Swal from "sweetalert2";
import { GeneroClass } from 'src/app/models/GeneralModel';
import { GeneralArray } from 'src/app/models/GeneralArray';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/public/ts/AppDateAdapter';

@Component({
  selector: 'app-alumnos-modal',
  templateUrl: './alumnos-modal.component.html',
  styleUrls: ['./alumnos-modal.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class AlumnosModalComponent implements OnInit {


  IdAlumno?: number;
  formGroup: FormGroup;
  sAccionModal?: string;
  dFechaNacimiento: any;


  listaGeneral: GeneralArray = new GeneralArray();
  listSexo: GeneroClass[] = this.listaGeneral.listaGenero;

  constructor(
    public dialogRef: MatDialogRef<AlumnosModalComponent>,
    private alumnosService: AlumnosService,
    @Inject(MAT_DIALOG_DATA) public data: AlumnoData,
    private fB: FormBuilder,

  ) {
    this.formGroup = this.fB.group({
      IdAlumno: [0, Validators.required],
      sCodAlu: [""],
      sNombrePri: ["", Validators.required],
      sNombreSec: ["", Validators.required],

      sApellidoPaterno: ["", Validators.required],
      sApellidoMaterno: ["", Validators.required],
      dFechaNacimiento: ["", Validators.required],
      sSexo: ["", Validators.required],

    });

  }

  ngOnInit(): void {

    //Definimos la accion Agregar o Editar
    this.sAccionModal = this.data.accion == 0 ? "Agregar" : "Editar";

    //En caso ya tenga datos
    if (this.data.accion == 1) {
      this.IdAlumno = this.data.IdAlumno;
      this.formGroup?.controls['IdAlumno'].setValue(this.IdAlumno);
      this.formGroup.controls['sCodAlu'].disable();

      this.fnCargarDatos();
    }

  }

  //#region Cerrar
  fnCerrarModal(result?: number) {
    //Resultado 1 es para insertar
    if (result == 1) {
      this.dialogRef.close(result);
    }
    //Resultado indefinido solo cierra
    else {
      this.dialogRef.close();
    }
  }
  //#endregion Cerrar


  //#region Cargar Datos para Editar
  async fnCargarDatos() {
    let pParametro = [];
    //Parametro el Identificador del Almacen
    pParametro.push(this.IdAlumno);

    //Llamar al servicio de Alumnos para Eliminar
    this.alumnosService.fnServiceAlumnos('02', pParametro).subscribe(
      data => {

        this.formGroup?.controls['sCodAlu'].setValue(data[0].sCodAlu);
        this.formGroup?.controls['sNombrePri'].setValue(data[0].sNombrePri);
        this.formGroup?.controls['sNombreSec'].setValue(data[0].sNombreSec);
        this.formGroup?.controls['sApellidoPaterno'].setValue(data[0].sApellidoPaterno);
        this.formGroup?.controls['sApellidoMaterno'].setValue(data[0].sApellidoMaterno);
        this.formGroup?.controls['dFechaNacimiento'].setValue(data[0].dFechaNacimiento);
        this.formGroup?.controls['sSexo'].setValue(data[0].sSexo);

        this.dFechaNacimiento = data[0].dFechaNac
      });

  }
  //#endregion 


  //#region Cambiar Fecha
  async fnCambiarFecha(event: any) {
    //Declarar Dia, Mes y año
    let sDia, sMes, sAnio

    //Evaluacion de Dia, Mes y Año
    sDia = (event.value.getDate() < 10) ? "0" + event.value.getDate() : event.value.getDate();
    sMes = ((event.value.getMonth() + 1) < 10) ? "0" + (event.value.getMonth() + 1) : event.value.getMonth() + 1
    sAnio = event.value.getFullYear()

    this.dFechaNacimiento = sAnio + '-' + sMes + '-' + sDia

  }
  //#endregion Cambiar Fecha


  //#region Grabar
  fnGrabar() {
    //Definir mensaje
    let sTitulo = 'Ingrese todos los campos.'

    //Validar formulario de almacen
    if (this.formGroup?.invalid) {
      Swal.fire({
        title: sTitulo,
        icon: 'warning',
        timer: 1500
      });
    }
    else {
      let pParametro = [];
      let pOpcion = this.data.accion == 0 ? '03' : '04'; // 03-> Insertar / 04-> Editar

      //Llenar formulario      
      pParametro.push(this.formGroup?.controls['sNombrePri'].value);
      pParametro.push(this.formGroup?.controls['sNombreSec'].value);
      pParametro.push(this.formGroup?.controls['sApellidoPaterno'].value);
      pParametro.push(this.formGroup?.controls['sApellidoMaterno'].value);
      pParametro.push(this.dFechaNacimiento);
      pParametro.push(this.formGroup?.controls['sSexo'].value);

      pParametro.push(this.IdAlumno);

      //Llamar servicio de almacenes 05 / 06
      //Llamar al servicio de Alumnos para Guardar o Editar
      this.alumnosService.fnServiceAlumnos(pOpcion, pParametro).subscribe({
        next: (value) => {
          //Si es válido, retornar mensaje de exito
          if (value.cod == 1) {
            Swal.fire({
              title: `Se registró con éxito`,
              icon: 'success',
              timer: 3500
            }).then(() => {
              this.fnCerrarModal(1);
            });
          }
        },
        error: (e) => console.error(e),
        //complete: () => console.info('complete')
      });

    }

  }
  //#endregion

}
