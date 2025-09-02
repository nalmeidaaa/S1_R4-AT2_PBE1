const express = require('express');
const app = express();
const PORT = 8081;
const fs = require("fs")

app.get("/produtos/:paginas", (req, res) => { //GET -> Coleta os dados da "/produtos"
    try {
        // Ler o arquivo JSON
        const data = fs.readFileSync('./produtos.json', 'utf-8');
        const { paginas } = req.params //Foi usado "dataEvento", pois se eu colocar "data", daria conflito com a constante de cima

        // Conversão de JSON em Objeto JS
        let produtos = JSON.parse(data); //Variavel de ambiente do node, para transformar um objeto JSON em JavaScript

        let pagina; //A função slice (ou slicing) serve para extrair uma porção (uma "fatia") de uma sequência de dados, como um array ou uma string, e retornar essa porção como uma nova sequência, sem modificar a original

        if (paginas == 1) {
            pagina = produtos.slice(0, 10);
        } else if (paginas == 2) {
            pagina = produtos.slice(10, 20);
        } else if (paginas == 3) {
            pagina = produtos.slice(20, 30);
        } else {
            return res.status(404).json({ message: "Página não encontrada" });
        }

        res.status(200).json(pagina); // Resposta com o código de status 200 (que significa "Sucesso Geral"), e a anexar a um corpo da resposta o objeto ou array produtos no formato JSON

    } catch (error) {
        console.error("Erro interno ao ler o arquivo Json", error);
        res.status(500).send("Erro interno no servidor!");
    }

});

app.listen(PORT, () => { // ()=> Arrow function
    console.log(`Servidor rodando HTTP://localhost:${PORT}`)
});
