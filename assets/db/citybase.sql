-- Criação da base de dados
CREATE DATABASE IF NOT EXISTS citybase;
USE citybase;

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE problemas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    tipo ENUM('buraco', 'iluminacao', 'lixo', 'agua', 'outros') NOT NULL,
    usuario_id INT NOT NULL,
    endereco TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('reportado', 'em_analise', 'resolvido') DEFAULT 'reportado',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);