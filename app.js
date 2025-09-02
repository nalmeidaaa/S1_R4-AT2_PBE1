
const express = require('express');
const app = express();
const PORT = 8081;
const fs = require("fs")

app.get("/eventos", (req, res) => { //GET -> Coleta os dados da "/eventos"
    try {
        // Ler o arquivo JSON
        const data = fs.readFileSync('./eventos.json', 'utf-8');
        const { dataEvento } = req.query //Foi usado "dataEvento", pois se eu colocar "data", daria conflito com a constante de cima.

        // Conversão de JSON em Objeto JS
        let eventos = JSON.parse(data); //Variavel de ambiente do node, para transformar um objeto JSON em JavaScript

        if ( dataEvento ) {
            eventos = eventos.filter(
                evento => evento.data.includes(dataEvento)); // Devolve um vetor com os elementos que a condição passar nessa condição
        }

        res.status(200).json(eventos); // Resposta com o código de status 200 (que significa "Sucesso Geral"), e a anexar a um corpo da resposta o objeto ou array produtos no formato JSON

    } catch (error) {
        console.error("Erro interno ao ler o arquivo Json", error);
        res.status(500).send("Erro interno no servidor!");
    }

});

app.listen(PORT, () => { // ()=> Arrow function
    console.log(`Servidor rodando HTTP://localhost:${PORT}`)
});