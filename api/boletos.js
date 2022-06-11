const express = require("express");
const router = express.Router();
const pessoa = require("./pessoas");
const usuario = require("./usuarios");

router.use(express.json());

function mostrarBoletos() {
    const boletos = [];
    pessoa.boletosPessoas.forEach(function (e) {
        boletos.push(e);
    })
    usuario.boletosUsuarios.forEach(function (e) {
        boletos.push(e);
    })

    return boletos;
}

function mostrarBoleto(id) {
    const boletos = [];
    pessoa.boletosPessoas.forEach(function (e) {
        boletos.push(e);
    })
    usuario.boletosUsuarios.forEach(function (e) {
        boletos.push(e);
    })

    const boleto = boletos.find(p => p.id == id);
    return boleto;
}

function pegarPorPessoa(id) {
    const boletos = [];
    pessoa.boletosPessoas.forEach(function (e) {
        boletos.push(e);
    })

    const listaBoletos = boletos.find(p => p.idPessoa == id);
    return listaBoletos;
}

function pegarPorUsuario(id) {
    const boletos = [];
    usuario.boletosUsuarios.forEach(function (e) {
        boletos.push(e);
    })
    const listaBoletos = boletos.find(p => p.idUsuario == id);
    return listaBoletos;
}

function buscarPessoa(id) {
    return pessoa.mostrarPessoa(id);
}

function buscarUsuario(id) {
    return usuario.mostrarUsuario(id);
}

function criarBoletoPessoa(boleto) {
    const boletos = [];
    pessoa.boletosPessoas.forEach(function (e) {
        boletos.push(e);
    })
    usuario.boletosUsuarios.forEach(function (e) {
        boletos.push(e);
    })

    boleto.id = boletos.length + 1;
    boleto.status = "Em Aberto"
    pessoa.boletosPessoas.push(boleto);
    boleto.nomePessoa = buscarPessoa(boleto.idPessoa).nome;
    return boleto; 
}

function criarBoletoUsuario(boleto) {
    const boletos = [];
    pessoa.boletosPessoas.forEach(function (e) {
        boletos.push(e);
    })
    usuario.boletosUsuarios.forEach(function (e) {
        boletos.push(e);
    })

    boleto.nomePessoa = buscarUsuario(boleto.idUsuario).nome;
    boleto.status = "Em Aberto"
    boleto.id = boletos.length + 1;
    usuario.boletosUsuarios.push(boleto);
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
        if(req.body.idPessoa) {
            if(buscarPessoa(req.body.idPessoa) != null) {
                res.send(criarBoletoPessoa(req.body));
            } else {
                res.status(400).send("Pessoa Inválida!");
            }
        } else {
            if(buscarUsuario(req.body.idUsuario) != null) {
                res.send(criarBoletoUsuario(req.body));
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
    pegarPorPessoa,
    pegarPorUsuario
}