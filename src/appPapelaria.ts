import express, { Request, Response } from "express";
import { Produto } from "./produto";
import { Fabricante } from "./fabricante";
import { Endereço } from "./endereco";

const appPapelaria = express();
const PORT = process.env.PORT ?? 3000;
appPapelaria.use(express.json());

const produtos: Produto[] =[];



function NovoProduto(req: Request, res: Response):void{
    try{
        let data:any = req.body;

        if(!data.Nome || !data.ID || !data.Preço || !data.Fabricante || !data.Cidade || !data.País){
           throw new Error("É necessário informar: nome, id, preço, fabricante, cidade e país.");
        }

        if(data.Preço <= 0) {
            throw new Error("O preço do produto deve ser maior que zero.");
        }

        const idExiste: any = produtos.find(p => p.ID === data.ID);

        if(idExiste){
            throw new Error("Já existe um produto cadastrado com este ID.");
        }

        if(!data.Nome || !data.ID || !data.Preço || !data.Fabricante){
           res.status(400).json({Message: "É necessário informar o nome, o id, o preço e o fabricante"});
           return;
        }

        const endereco = new Endereço(data.Cidade, data.País);
        const fabrican = new Fabricante(data.Fabricante, endereco);
        const produto = new Produto(data.ID, data.Nome, data.Preço, fabrican);
        
        produtos.push(produto);
        
        res.status(201).json(produto);

    }catch(e: unknown){
        res.status(400).json({Message: (e as Error).message });
    }
}

function filtrarPorId(req: Request, res: Response): void{
    try {
        let id: any = Number(req.params.id);
        const product: any = produtos.find(p => p.ID === id);

        if(!product){
            res.status(404).json({Message: "Produto não encontrado com esse ID!"});
            return; 
        }

        res.status(200).json(product)

    } catch (e: unknown) {
        res.status(500).json({Message: "ERRO interno na aplicação!"});
    }
}


function listarProdutos(req: Request, res: Response): void{
    try {
        res.status(200).json(produtos);
    } catch (e: unknown) {
        res.status(400).json({Message: "Sem produtos para listar"})
    }
}

function atualizarProduto(req: Request, res: Response): void {
    try {
        let id = Number(req.params.id);

        let produto: any = produtos.find(p => p.ID === id);

        if (!produto) {
            res.status(404).json({ Message: "Produto não encontrado para atualização." });
            return;
        }

        let data: any = req.body;

        if (data.Nome) {
            produto.Nome = data.Nome; 
        }
        if (data.Preço) {
            produto.Preço = data.Preço;
        }

        if (data.Fabricante) {
            if (data.Fabricante.NomeFabricante) {
                produto.Fabricante.NomeFabricante = data.Fabricante.NomeFabricante; 
            }
    
            if (data.Fabricante.Endereço) {
                if (data.Fabricante.Endereço.Cidade) {
                    produto.Fabricante.Endereço.Cidade = data.Fabricante.Endereço.Cidade;
                }
                if (data.Fabricante.Endereço.País) {
                    produto.Fabricante.Endereço.País = data.Fabricante.Endereço.País;
                }
            }    
        }
        

        res.status(200).json(produto);

    } catch (e: unknown) {
        res.status(400).json({ Message: "Ocorreu um erro ao atualizar o produto." });
    }
}

function removerPorID(req: Request, res: Response): void{
    try {
        let id: any = Number(req.params.id);
        const product: any = produtos.findIndex(p => p.ID === id);

        if (product === -1){
            res.status(404).json({ Message: "Produto não encontrado para exclusão." });
            return;
        }
        produtos.splice(product, 1);

        res.status(200).json({ Message: "Produto removido com sucesso!" });
    } catch (e: unknown) {
        res.status(400).json({Message:"Ocorreu um erro ao tentar remover o produto"});
    }
}


appPapelaria.delete('/Atv_api_papelaria/produto/:id', removerPorID);
appPapelaria.put('/Atv_api_papelaria/produto/:id', atualizarProduto);
appPapelaria.get('/Atv_api_papelaria/produto', listarProdutos);
appPapelaria.post('/Atv_api_papelaria/produto', NovoProduto);
appPapelaria.get('/Atv_api_papelaria/produto/:id', filtrarPorId);

appPapelaria.listen(PORT, () => console.log(`API rodando na URL : http://localhost:${PORT}`));
