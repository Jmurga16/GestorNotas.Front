export class Curso {
    idCurso?: number;
    sCodCur: string;
    sNombre: string;
    nCreditos: number;
    
    constructor( sCodCur: string, sNombre: string, nCreditos: number) {
        this.sCodCur = sCodCur
        this.sNombre = sNombre
        this.nCreditos = nCreditos        
    }
}


export interface CursoData {
    accion: number;
    IdCurso:number;  
}