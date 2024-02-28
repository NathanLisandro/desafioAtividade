const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.json({ limit: '1000mb' })); 

app.post('/salvar-dados', async (req, res) => {
    try {
        const dados = req.body;
        const dadosJson = JSON.stringify(dados, null, 4);
        fs.writeFileSync('dados.json', dadosJson);
        res.send('Dados salvos com sucesso!');
    } catch (error) {
        console.error('Ocorreu um erro ao salvar os dados:', error);
        res.status(500).send('Erro ao salvar os dados.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
