const express = require("express");
const router = express.Router();
const pessoa = require("./pessoas");
const usuario = require("./usuarios");
const listaBoletos = require("./listaBoletos")

router.use(express.json());

function mostrarBoletos() {
    return listaBoletos.listaBoletos;
}

function mostrarBoleto(id) {
    const boleto = listaBoletos.listaBoletos.find(p => p.id == id);
    return boleto;
}

function pegarPorPessoa(id) {
    const listaBoletos2 = listaBoletos.listaBoletos.find(p => p.idPessoa == id);
    return listaBoletos2;
}

function pegarPorUsuario(id) {
    const listaBoletos2 = listaBoletos.listaBoletos.find(p => p.idUsuario == id);
    return listaBoletos2;
}

function buscarPessoa(id) {
    return pessoa.mostrarPessoa(id);
}

function buscarUsuario(id) {
    return usuario.mostrarUsuario(id);
}

function criarBoleto(boleto) {
    boleto.id = listaBoletos.listaBoletos.length + 1;
    boleto.status = "Em Aberto"
    listaBoletos.listaBoletos.push(boleto);
    boleto.nomePessoa = buscarPessoa(boleto.idPessoa).nome;
    return boleto; 
}

function editarBoleto(id, boleto) {
    const index = listaBoletos.listaBoletos.findIndex(p => p.id == id);
    boleto.id = id;
    listaBoletos.listaBoletos[index] = boleto;
    return boleto;
}


router.get('/', (req, res) => {
    res.json(mostrarBoletos());
})

router.get('/:id', (req, res) => {
    res.json(mostrarBoleto(req.params.id));
})

router.get('/pessoa/:id', (req, res) => {
    res.json(pegarPorPessoa(req.params.id));
});

router.post('/', (req, res) => {
    if(req.body.valor > 0) {
        if(req.body.idPessoa && req.body.idUsuario) {
            if(buscarPessoa(req.body.idPessoa) != null && buscarUsuario(req.body.idUsuario) != null) {
                res.send(criarBoleto(req.body));
            } else {
                res.status(400).send("Pessoa ou usuário Inválida(o)!");
            }
        } else {
            res.send("Preencha todos os campos!")
        }
    } else {
        res.status(400).send("Valor Inválido!");
    }
})

router.put('/:id', (req, res) => {
    res.send(editarBoleto(req.params.id, req.body))
})

module.exports = {
    router,
    pegarPorPessoa,
    pegarPorUsuario
}