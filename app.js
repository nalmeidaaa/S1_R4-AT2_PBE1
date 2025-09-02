
const express = require('express');
const app = express();
const PORT = 8081;
const fs = require("fs")

app.get("/livros", (req, res) => { //GET -> Coleta os dados da "/livros"
    try {
        // Ler o arquivo JSON
        const data = fs.readFileSync('./livros.json', 'utf-8');
        const { titulo, autor, ano } = req.query //Foi usado "dataEvento", pois se eu colocar "data", daria conflito com a constante de cima

        // Conversão de JSON em Objeto JS
        let livros = JSON.parse(data); //Variavel de ambiente do node, para transformar um objeto JSON em JavaScript

        //Título do livro
        if ( titulo ) {
            livros = livros.filter(
                livro => livro.titulo.toLowerCase().includes(titulo.toLowerCase())); // Devolve um vetor com os elementos que a condição passar nessa condição
        }

        //Autor do livro
        if ( autor ) {
            livros = livros.filter(
                livro => livro.autor.toLowerCase().includes(autor.toLowerCase()));
        }

        //Ano do livro
        if ( ano ) {
            livros = livros.filter(
                livro => livro.ano == ano)
        }

        res.status(200).json(livros); // Resposta com o código de status 200 (que significa "Sucesso Geral"), e a anexar a um corpo da resposta o objeto ou array produtos no formato JSON

    } catch (error) {
        console.error("Erro interno ao ler o arquivo Json", error);
        res.status(500).send("Erro interno no servidor!");
    }

});

app.listen(PORT, () => { // ()=> Arrow function
    console.log(`Servidor rodando HTTP://localhost:${PORT}`)
});
