"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
class Produto {
    ID;
    Nome;
    Preço;
    Fabricante;
    constructor(ID, Nome, Preço, Fabricante) {
        this.ID = ID;
        this.Nome = Nome;
        this.Preço = Preço;
        this.Fabricante = Fabricante;
    }
}
exports.Produto = Produto;
