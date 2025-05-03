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

-- Tabela de tipos de problemas
CREATE TABLE problem_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela dos registros de problemas
CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_code VARCHAR(20) NOT NULL UNIQUE,
    user_id INT NOT NULL
    problem_type_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES reports(id)
);

-- Tabela das fotos dos registros
CREATE TABLE report_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    photo_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);

-- Inserção de tipos de problemas iniciais
INSERT INTO problem_types (name, description) VALUES
('Buraco na via'),
('Iluminação pública'),
('Lixo'),
('Água e esgoto'),
('Outros');
