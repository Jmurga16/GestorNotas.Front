import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  mobileQuery: MediaQueryList;

  @Output() salida: EventEmitter<any> = new EventEmitter();

  isExpanded = true;
  showSubmenu: boolean = false;
  showSubSubMenu: boolean = false;
  isShowing = false;
  TituloComponent: string = ""

  listaNav = [
    { id: 1, name: 'Alumnos', route: 'alumnos', icon: 'person', subMenu: 0, mostrar: false },
    { id: 2, name: 'Cursos', route: 'cursos', icon: 'assignment', subMenu: 0, mostrar: false },
    { id: 3, name: 'Notas', route: 'codigos', icon: 'assignment_ind', subMenu: 2, mostrar: true },

  ];

  listaSubNav = [
    { idHijo: 1, idPadre: 3, name: 'Registro', route: 'registro', icon: 'note_add' },
    { idHijo: 2, idPadre: 3, name: 'Consulta', route: 'consulta', icon: 'find_in_page' },
  ];


  private _mobileQueryListener: () => void;


  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.TituloComponent = "Examen EFITEC"
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  //#region Ir a la Ruta
  fnRuteo(ruta: string) {

    let sRuta = `/${ruta}`
    this.router.navigateByUrl(sRuta);

  }
  //#endregion

  //#region Mostrar SubMenu
  fnMostrar(index: number) {

    let bEstado: boolean;

    if (this.listaNav[index].mostrar) {
      bEstado = false;
    }
    else {
      bEstado = true;
    }

    this.listaNav[index].mostrar = bEstado

  }
  //#endregion

}
