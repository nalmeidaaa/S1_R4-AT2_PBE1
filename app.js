const express = require('express');
const app = express();
const PORT = 8081;
const fs = require("fs")

app.get("/produtos/:paginas", (req, res) => { //GET -> Coleta os dados da "/produtos"
    try {
        // Ler o arquivo JSON
        const data = fs.readFileSync('./produtos.json', 'utf-8');
        const { paginas } = req.params

        // Conversão de JSON em Objeto JS
        let produtos = JSON.parse(data);

        let numProdutos = paginas*10 //Essa variável existe para a cada página, mostrar os próximos 10 produtos

        //A função slice (ou slicing) serve para extrair uma porção (uma "fatia") de uma sequência de dados, como um array ou uma string, e retornar essa porção como uma nova sequência, sem modificar a original
        if (paginas < 4) {
            pagina = produtos.slice((numProdutos-10), numProdutos);
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
