const express = require("express");
const router = express.Router();
const pessoa = require("./pessoas");
const usuario = require("./usuarios");

router.use(express.json());

const boletos = [];

function mostrarBoletos() {
    return boletos;
}

function mostrarBoleto(id) {
    const boleto = boletos.find(p => p.id == id);
    return boleto;
}

function pegarPorPessoa(id) {
    const listaBoletos = boletos.find(p => p.idPessoa == id);
    return listaBoletos;
}

function pegarPorUsuario(id) {
    const listaBoletos = boletos.find(p => p.idUsuario == id);
    return listaBoletos;
}

function buscarPessoa(id) {
    return pessoa.mostrarPessoa(id);
}

function buscarUsuario(id) {
    return usuario.mostrarUsuario(id);
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
    const boleto = req.body;

    if(boleto.valor > 0) {
        if(boleto.idPessoa) {
            if(buscarPessoa(boleto.idPessoa) != null) {
                boleto.id = boletos.length + 1;
                boletos.push(boleto);
                res.send(boleto);
            } else {
                res.status(400).send("Pessoa Inválida!");
            }
        } else {
            if(buscarUsuario(boleto.idUsuario) != null) {
                boleto.id = boletos.length + 1;
                boletos.push(boleto);
                res.send(boleto);
            } else {
                res.status(400).send("Usuário Inválido!");
            }
        }
    } else {
        res.status(400).send("Valor Inválido!");
    }
})

module.exports = {
    router,
    mostrarBoletos,
    mostrarBoleto,
    pegarPorPessoa,
    buscarPessoa,
    buscarUsuario,
    pegarPorUsuario
}