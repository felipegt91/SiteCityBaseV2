// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path'); // Módulo 'path' do Node.js

// Importa as rotas
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = process.env.PORT || 3001; // Usa a porta do .env ou 3001 como padrão

// Middleware CORS para permitir requisições do frontend
app.use(cors());

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// Middleware para parsear dados de formulário URL-encoded
app.use(express.urlencoded({ extended: true }));

// Middleware para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas da API
app.use('/api/users', authRoutes);
app.use('/api', reportRoutes); // /api/reports e /api/problem-types

// Rota de teste
app.get('/', (req, res) => {
    res.send('Backend CityBase está funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});