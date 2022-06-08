import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { NotasConsultaComponent } from './components/notas/notas-consulta/notas-consulta.component';
import { NotasRegistroComponent } from './components/notas/notas-registro/notas-registro.component';

const routes: Routes = [
  //{ path: "", redirectTo:"alumnos",  component: AlumnosComponent, pathMatch:'full'},
  { path: "alumnos", component: AlumnosComponent },
  { path: "cursos", component: CursosComponent },
  { path: "registro", component: NotasRegistroComponent },
  { path: "consulta", component: NotasConsultaComponent },
  { path: "**", component: AlumnosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
