const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const pessoas = require("./api/pessoas")
app.use('/api/pessoas/', pessoas.router);

const usuarios = require("./api/usuarios")
app.use('/api/usuarios/', usuarios.router);

const boletos = require("./api/boletos")
app.use('/api/boletos/', boletos.router);

app.listen(port, () => {
    console.log('Example app listening at http://localhost:"${port}"')
});