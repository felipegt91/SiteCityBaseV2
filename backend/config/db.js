const mysql = require('mysql2');
require('dotenv').config(); // Para carregar variáveis do .env

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testa a conexão
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Conexão com o banco de dados foi perdida.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Banco de dados tem muitas conexões.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Conexão com o banco de dados foi recusada.');
        }
        return;
    }
    if (connection) {
        connection.release(); // Libera a conexão de volta para o pool
        console.log('Conectado ao banco de dados MySQL com sucesso!');
    }
});

// Exporta o pool como uma Promise para facilitar o uso com async/await
module.exports = pool.promise();