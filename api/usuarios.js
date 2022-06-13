const express = require("express");
const router = express.Router();
const listaBoletos = require("./listaBoletos")

router.use(express.json());

const usuarios = [
    {
        id: 1,
        nome: "Felipe",
        senha: "321"
    }
];

function mostrarUsuarios() {
    return usuarios;
}

function mostrarUsuario(id) {
    const usuario = usuarios.find(p => p.id == id);
    return usuario;
}

function criarUsuario(usuario) {
    usuario.id = usuarios.length + 1;
    usuarios.push(usuario);
    return usuario;
}

function editarUsuario(id, usuario) {
    const index = usuarios.findIndex(p => p.id == id);
    usuario.id = id;
    usuarios[index] = usuario;
    return usuario;
}

function excluirUsuario(id) {
    const index = usuarios.findIndex(p => p.id == id);
    usuarios.splice(index, 1);
    return usuarios;
}

function pegarPorUsuario(id) {
    const listaBoletos2 = listaBoletos.listaBoletos.find(p => p.idUsuario == id);
    return listaBoletos2;
}


router.get('/', (req, res) => {
    res.json(mostrarUsuarios());
});

router.get('/:id', (req, res) => {
    res.json(mostrarUsuario(req.params.id));
});

router.post('/', (req, res) => {
    if(req.body.senha == undefined || req.body.nome == undefined) {
        res.status(400).send("Nome e Senha são obrigatórios!");
    } else {
        res.json(criarUsuario(req.body));
    }
})

router.put('/:id', (req, res) => {
    res.json(editarUsuario(req.params.id, req.body));
})

router.delete('/:id', (req, res) => {
    if(pegarPorUsuario(req.params.id).length > 0) {
        res.status(400).send("Este usuário tem boletos em seu nome!")
    } else {
        res.json(excluirUsuario(req.params.id));
    }
})

module.exports = {
    router,
    mostrarUsuario,
    mostrarUsuarios
}