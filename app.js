
const express = require('express');
const app = express();
const PORT = 8081;
const fs = require("fs")

app.get("/usuarios", (req, res) => { //GET -> Coleta os dados da "/usuarios"
    try {
        // Ler o arquivo JSON
        const data = fs.readFileSync('./usuarios.json', 'utf-8');

        // Conversão de JSON em Objeto JS
        let usuarios = JSON.parse(data); //Variavel de ambiente do node, para transformar um objeto JSON em JavaScript

        res.status(200).json(usuarios); // Resposta com o código de status 200 (que significa "Sucesso Geral"), e a anexar a um corpo da resposta o objeto ou array produtos no formato JSON

    } catch (error) {
        console.error("Erro interno ao ler o arquivo Json", error);
        res.status(500).send("Erro interno no servidor!");
    }

});

app.listen(PORT, () => { // ()=> Arrow function
    console.log(`Servidor rodando HTTP://localhost:${PORT}`)
});