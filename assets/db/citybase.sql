CREATE DATABASE IF NOT EXISTS citybase;
USE citybase;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
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