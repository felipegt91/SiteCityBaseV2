-- Criação da base de dados
CREATE DATABASE IF NOT EXISTS citybase 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE citybase;

-- Tabela de usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_email CHECK (email LIKE '%@%.%')
) ENGINE=InnoDB;

-- Tabela de tipos de problemas
CREATE TABLE problem_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela dos registros de problemas
CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_code VARCHAR(20) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    problem_type_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id);
    FOREIGN KEY (problem_type_id) REFERENCES problem_types(id),
    CONSTRAINT chk_coords CHECK (
        latitude BETWEEN -90 AND 90 AND
        longitude BETWEEN -180 AND 180
    )
) ENGINE=InnoDB;

-- Tabela das fotos dos registros
CREATE TABLE report_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id INT NOT NULL,
    photo_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE,
    CONSTRAINT chk_photo_path CHECK (
        photo_path LIKE '%.jpg' OR
        photo_path LIKE '%.jpeg' OR
        photo_path LIKE '%.png' OR
    )
) ENGINE=InnoDB;

-- Inserção de tipos de problemas iniciais
INSERT INTO problem_types (name, description) VALUES
('Buraco na via', 'Buraco em via pública'),
('Iluminação pública', 'Problemas com iluminação pública'),
('Lixo', 'Acúmulo de lixo em locais inadequados'),
('Água e esgoto', 'Problemas com água ou esgoto'),
('Outros', 'Outros tipos de problemas urbanos');

-- Usuário admin inicial (senha: admin123) - para teste
INSERT INTO usuarios (name, email, cpf, username, password_hash) VALUES
('Administrador', 'admin@example.com', '000.000.000-00', 'admin', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQDqUiz8CZA5ZQ7zP6SXJY1tYj7XJ2K');

-- Usuário de teste (senha: 123456)
INSERT INTO users (name, email, cpf, username, password_hash) VALUES
('Usuário Teste', 'teste@citybase.com', '111.222.333-44', 'testuser', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQDqUiz8CZA5ZQ7zP6SXJY1tYj7XJ2K');