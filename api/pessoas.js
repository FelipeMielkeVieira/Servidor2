const express = require("express");
const router = express.Router();
const listaBoletos = require("./listaBoletos")

router.use(express.json());

const pessoas = [
    {
        nome: "Felipe",
        cpf: "123",
        id: 1
    }
];

function mostrarPessoas() {
    return pessoas;
}

function mostrarPessoa(id) {
    const pessoa = pessoas.find(p => p.id == id);
    return pessoa;
}

function criarPessoa(pessoa) {
    pessoa.id = pessoas.length + 1;
    pessoas.push(pessoa);
    return pessoa;
}

function editarPessoa(id, pessoa) {
    const index = pessoas.findIndex(p => p.id == id);
    pessoa.id = id;
    pessoas[index] = pessoa;
    return pessoa;
}

function excluirPessoa(id) {
    const index = pessoas.findIndex(p => p.id == id);
    pessoas.splice(index, 1);
    return pessoas;
}

function pegarPorPessoa(id) {
    const listaBoletos2 = listaBoletos.listaBoletos.find(p => p.idPessoa == id);
    return listaBoletos2;
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
        res.json(criarPessoa(req.body));
    }
})

router.put('/:id', (req, res) => {
    res.json(editarPessoa(req.params.id, req.body));
})

router.delete('/:id', (req, res) => {
    if(pegarPorPessoa(req.params.id)) {
        res.status(400).send("Esta pessoa tem boletos em seu nome!")
    } else {
        res.json(excluirPessoa(req.params.id));
    }
})

module.exports = {
    router,
    mostrarPessoa,
    mostrarPessoas
}