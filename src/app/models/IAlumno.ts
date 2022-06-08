export class Alumno {
    idAlumno?: number;
    sCodAlu: string;
    sNombrePri: string;
    sNombreSec: string;
    sApellidoPaterno: string;
    sApellidoMaterno: string;

    constructor(sCodAlu: string, sNombrePri: string, sNombreSec: string, sApellidoPaterno: string, sApellidoMaterno: string) {
        this.sCodAlu = sCodAlu
        this.sNombrePri = sNombrePri
        this.sNombreSec = sNombreSec
        this.sApellidoPaterno = sApellidoPaterno
        this.sApellidoMaterno = sApellidoPaterno

    }
}

export interface AlumnoData {
    accion: number;
    IdAlumno: number;
}