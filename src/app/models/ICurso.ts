export class Curso {
    nIdCurso?: number;
    sCodCur: string;
    sNomCur: string;
    nCreditos: number;
    
    constructor( sCodCur: string, sNomCur: string, nCreditos: number) {
        this.sCodCur = sCodCur
        this.sNomCur = sNomCur
        this.nCreditos = nCreditos        
    }
}


export interface CursoData {
    accion: number;
    nIdCurso:number;  
}