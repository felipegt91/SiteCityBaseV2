const db = require('../config/db'); // Conexão com o banco de dados
const bcrypt = require('bcrypt');

const saltRounds = 10; // Para o bcrypt

// Função para registrar um novo usuário
exports.registerUser = async (req, res) => {
    const { nome, cpf, username, email, senha } = req.body;

    // Validação básica dos campos
    if (!nome || !cpf || !username || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Verificar se o email ou username já existem
        const [users] = await db.query(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [email, username]
        );

        if (users.length > 0) {
            const existingUser = users[0];
            if (existingUser.email === email) {
                return res.status(409).json({ message: 'Este email já está cadastrado.' }); // 409 Conflict
            }
            if (existingUser.username === username) {
                return res.status(409).json({ message: 'Este nome de usuário já está em uso.' });
            }
        }

        // Faz o hash da senha
        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        // Insere o novo usuário no banco de dados
        // A coluna 'id' é AUTO_INCREMENT, 'created_at' e 'updated_at' têm DEFAULT
        const query = 'INSERT INTO users (name, email, cpf, username, password_hash) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [nome, email, cpf, username, hashedPassword]);

        // Retorna sucesso
        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            userId: result.insertId // ID do usuário recém-criado
        });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        // Verifica se é um erro de entrada duplicada do MySQL
        if (error.code === 'ER_DUP_ENTRY') {
            if (error.message.includes('cpf')) {
                 return res.status(409).json({ message: 'Este CPF já está cadastrado.'});
            }
            // Caso ocorram outros erros por duplicação
             return res.status(500).json({ message: 'Erro ao registrar usuário devido a dados duplicados.' });
        }
        res.status(500).json({ message: 'Erro interno do servidor ao registrar usuário.' });
    }
};
