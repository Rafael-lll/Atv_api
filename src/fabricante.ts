import { Endereço } from "./endereco";

export class Fabricante {
    NomeFabricante: string;
    Endereço: Endereço;

    constructor(NomeFabricante: string, Endereço: Endereço){
        this.NomeFabricante = NomeFabricante;
        this.Endereço = Endereço;
    }
}