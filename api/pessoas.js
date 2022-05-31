const express = require("express");
const router = express.Router();

const boletos = require("./boletos");

router.use(express.json());

//id, nome, cpf
//user = id, nome, senha
//boleto = valor, idPessoa, idUsuario, status, nomePessoa

//getByPessoa = Retorna os boletos de uma pessoa

const pessoas = [];

function mostrarPessoas() {
    return pessoas;
}

function mostrarPessoa(id) {
    const pessoa = pessoas.find(p => p.id == id);
    return pessoa;
}


router.get('/', (req, res) => {
    res.json(mostrarPessoas());
});

router.get('/:id', (req, res) => {
    res.json(mostrarPessoa(req.params.id));
});

router.post('/', (req, res) => {
    if(req.body.cpf == undefined || req.body.nome == undefined) {
        res.status(400).send("Nome e CPF são obrigatórios!");
    } else {
        const pessoa = req.body;
        pessoa.id = pessoas.length + 1;
        pessoas.push(pessoa);
        res.json(pessoa);
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const pessoa = req.body;
    const index = pessoas.findIndex(p => p.id == id);
    pessoas[index] = pessoa;
    res.json(pessoa);
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if(boletos.pegarPorPessoa(id).length > 0) {
        res.status(400).send("Esta pessoa tem boletos em seu nome!")
    } else {
        const index = pessoas.findIndex(p => p.id == id);
        pessoas.splice(index, 1);
        res.json(pessoas);
    }
})

module.exports = {
    router,
    mostrarPessoa,
    mostrarPessoas
}