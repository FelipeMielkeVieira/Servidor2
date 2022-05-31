const express = require("express");
const router = express.Router();

const boletos = require("./boletos");

router.use(express.json());

const usuarios = [];

function mostrarUsuarios() {
    return usuarios;
}

function mostrarUsuario(id) {
    const usuario = usuarios.find(p => p.id == id);
    return usuario;
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
        const usuario = req.body;
        usuario.id = usuarios.length + 1;
        usuarios.push(usuario);
        res.json(usuario);
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const usuario = req.body;
    const index = usuarios.findIndex(p => p.id == id);
    usuarios[index] = usuario;
    res.json(usuario);
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if(boletos.pegarPorUsuario(id).length > 0) {
        res.status(400).send("Este usuário tem boletos em seu nome!")
    } else {
        const index = usuarios.findIndex(p => p.id == id);
        usuarios.splice(index, 1);
        res.json(usuarios);
    }
})

module.exports = {
    router,
    mostrarUsuario,
    mostrarUsuarios
}