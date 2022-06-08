import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursoData } from 'src/app/models/ICurso';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos-modal',
  templateUrl: './cursos-modal.component.html',
  styleUrls: ['./cursos-modal.component.scss']
})
export class CursosModalComponent implements OnInit {

  nIdCurso?: number;
  formGroup: FormGroup;
  sAccionModal?: string;


  constructor(
    private cursosService: CursosService,
    public dialogRef: MatDialogRef<CursosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CursoData,
    private fB: FormBuilder,

  ) {
    this.formGroup = this.fB.group({
      nIdCurso: [0, Validators.required],
      sCodCur: [""],
      sNomCur: ["", Validators.required],
      nCreditos: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    //Definimos la accion Agregar o Editar
    this.sAccionModal = this.data.accion == 0 ? "Agregar" : "Editar";

    //En caso ya tenga datos
    if (this.data.accion == 1) {
      this.nIdCurso = this.data.nIdCurso;
      this.formGroup?.controls['nIdCurso'].setValue(this.nIdCurso);
      this.formGroup.controls['sCodCur'].disable();

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
    pParametro.push(this.nIdCurso);

    //Llamar al servicio de Alumnos para Eliminar
    this.cursosService.fnServiceCursos('02', pParametro).subscribe(
      data => {
        this.formGroup?.controls['sCodCur'].setValue(data[0].sCodCur);
        this.formGroup?.controls['sNomCur'].setValue(data[0].sNomCur);
        this.formGroup?.controls['nCreditos'].setValue(data[0].nCreditos);

      });

  }
  //#endregion 


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
      pParametro.push(this.formGroup?.controls['sNomCur'].value);
      pParametro.push(this.formGroup?.controls['nCreditos'].value);
      pParametro.push(this.nIdCurso);

      //Llamar al servicio de Alumnos para Guardar o Editar
      this.cursosService.fnServiceCursos(pOpcion, pParametro).subscribe({
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
