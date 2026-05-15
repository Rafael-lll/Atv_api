"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const produto_1 = require("./produto");
const fabricante_1 = require("./fabricante");
const endereco_1 = require("./endereco");
const appPapelaria = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
appPapelaria.use(express_1.default.json());
const produtos = [];
function NovoProduto(req, res) {
    try {
        let data = req.body;
        if (!data.Nome || !data.ID || !data.Preço || !data.Fabricante) {
            throw new Error("Para criar um novo produto é necessário informar o nome, o Preço, o ID e o Fabricante.");
        }
        const endereco = new endereco_1.Endereço(data.Cidade, data.País);
        const fabrican = new fabricante_1.Fabricante(data.Fabricante, endereco);
        const produto = new produto_1.Produto(data.ID, data.Nome, data.Preço, fabrican);
        produtos.push(produto);
        res.status(201).json(produto);
    }
    catch (e) {
        res.status(400).json({ Message: "Necessário informar as informações do produto." });
    }
}
function buscaPorId(req, res) {
    try {
        let id = Number(req.params.id);
        const product = produtos.find(p => p.ID === id);
        res.status(200).json({ product });
    }
    catch (e) {
        res.status(404).json({ Message: "Produto não encontrado com esse ID!" });
    }
}
function listarProdutos(req, res) {
    try {
        res.status(200).json(produtos);
    }
    catch (e) {
        res.status(400).json({ Message: "Sem produtos para listar" });
    }
}
function atualizarProduto(req, res) {
    try {
        let id = Number(req.params.id);
        let produto = produtos.find(p => p.ID === id);
        if (!produto) {
            res.status(404).json({ Message: "Produto não encontrado para atualização." });
            return;
        }
        let data = req.body;
        if (data.Nome) {
            produto.Nome = data.Nome;
        }
        if (data.Preço) {
            produto.Preço = data.Preço;
        }
        if (data.Fabricante) {
            produto.Fabricante.NomeFabricante = data.Fabricante;
        }
        if (data.Cidade) {
            produto.Fabricante.Endereço.Cidade = data.Cidade;
        }
        if (data.Pais) {
            produto.Fabricante.Endereço.País = data.Pais;
        }
        res.status(200).json(produto);
    }
    catch (e) {
        res.status(400).json({ Message: "Ocorreu um erro ao atualizar o produto." });
    }
}
appPapelaria.put('/Api_Papelaria/produto/:id', atualizarProduto);
appPapelaria.get('/Api_Papelaria/produto', listarProdutos);
appPapelaria.post('/Api_Papelaria/produto', NovoProduto);
appPapelaria.get('/Api_Papelaria/produto/:id', buscaPorId);
appPapelaria.listen(PORT, () => console.log(`API rodando na URL : http://localhost:${PORT}`));
