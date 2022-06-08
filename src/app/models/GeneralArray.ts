import { GeneroClass } from "./GeneralModel";

export class GeneralArray {

    listaGenero: GeneroClass[];

    constructor() {

        this.listaGenero = [
            { Id: 'M', Descripcion: 'Masculino' },
            { Id: 'F', Descripcion: 'Femenino' }
        ]

    }

}