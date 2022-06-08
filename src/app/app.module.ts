import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './public/modules/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { AlumnosModalComponent } from './components/alumnos/alumnos-modal/alumnos-modal.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CursosModalComponent } from './components/cursos/cursos-modal/cursos-modal.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotasRegistroComponent } from './components/notas/notas-registro/notas-registro.component';
import { NotasConsultaComponent } from './components/notas/notas-consulta/notas-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    AlumnosComponent,
    AlumnosModalComponent,
    CursosComponent,
    CursosModalComponent,
    NotasRegistroComponent,
    NotasConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
