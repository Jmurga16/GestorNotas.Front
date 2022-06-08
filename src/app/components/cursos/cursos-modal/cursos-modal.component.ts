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

  IdCurso?: number;
  formGroup: FormGroup;
  sAccionModal?: string;


  constructor(
    private cursosService: CursosService,
    public dialogRef: MatDialogRef<CursosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CursoData,
    private fB: FormBuilder,

  ) {
    this.formGroup = this.fB.group({
      IdCurso: [0, Validators.required],
      sNombre: ["", Validators.required],
      sDescripcion: ["", Validators.required],
      bObligatorio: [""],
      bEstado: [1]
    });
  }

  ngOnInit(): void {
    //Definimos la accion Agregar o Editar
    this.sAccionModal = this.data.accion == 0 ? "Agregar" : "Editar";

    //En caso ya tenga datos
    if (this.data.accion == 1) {
      this.IdCurso = this.data.IdCurso;
      this.formGroup?.controls['IdCurso'].setValue(this.IdCurso);

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
    pParametro.push(this.IdCurso);

    //Llamar al servicio de Alumnos para Eliminar
    this.cursosService.fnServiceCursos('02', pParametro).subscribe(
      data => {
   
        this.formGroup?.controls['sNombre'].setValue(data[0].sNombre);
        this.formGroup?.controls['sDescripcion'].setValue(data[0].sDescripcion);
        this.formGroup?.controls['bObligatorio'].setValue(data[0].bObligatorio);

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
      pParametro.push(this.formGroup?.controls['sNombre'].value);
      pParametro.push(this.formGroup?.controls['sDescripcion'].value);
      pParametro.push(this.formGroup?.controls['bObligatorio'].value);
      pParametro.push(this.formGroup?.controls['bEstado'].value);

      pParametro.push(this.IdCurso);

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
