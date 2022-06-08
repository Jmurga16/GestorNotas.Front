export class Alumno {
    IdAlumno?: number;
    sCodAlu: string;
    sNombres: string;
    sApellidos: string;

    constructor(sCodAlu: string, sNombres: string, sApellidos: string) {
        this.sCodAlu = sCodAlu
        this.sNombres = sNombres
        this.sApellidos = sApellidos
    }
}

export interface AlumnoData {
    accion: number;
    IdAlumno: number;
}