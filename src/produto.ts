import { Fabricante } from "./fabricante";

export class Produto {
    ID: number;
    Nome: string;
    Preço: number;
    Fabricante: Fabricante;

    constructor(ID: number, Nome: string, Preço: number, Fabricante: Fabricante){
        this.ID = ID;
        this.Nome = Nome;
        this.Preço = Preço;
        this.Fabricante = Fabricante;
    }
}