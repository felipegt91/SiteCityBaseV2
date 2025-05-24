-- Criação da base de dados
CREATE DATABASE IF NOT EXISTS citybase 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE citybase;

-- Criação de índices para melhor desempenho
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_reports_location ON reports(latitude, longitude);

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
    registration_code VARCHAR(20) UNIQUE,
    user_id INT NOT NULL,
    problem_type_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (problem_type_id) REFERENCES problem_types(id),
    CONSTRAINT chk_coords CHECK (
        latitude BETWEEN -90 AND 90 AND
        longitude BETWEEN -180 AND 180
    )
) ENGINE=InnoDB;

-- Trigger para geração automática do registration_code
DELIMITER //
CREATE TRIGGER before_report_insert
BEFORE INSERT ON reports
FOR EACH ROW
BEGIN
    DECLARE next_seq INT;
    DECLARE current_year CHAR(4);

    SET current_year = YEAR(NEW.created_at);

    -- Próximo número da sequência para o ano
    SELECT COALESCE(MAX(CAST(SUBSTRING(registration_code, 10) AS UNSIGNED)), 0) + 1 
    INTO next_seq
    FROM reports
    WHERE registration_code LIKE CONCAT('REG-', current_year, '%');

    -- Começa com 1 se não houver registros no ano
    IF next_seq IS NULL THEN
        SET next_seq = 1;
    END IF;

    -- Definição do formato
    SET NEW.registration_code = CONCAT('REG-', current_year, LPAD(next_seq, 4, '0'));
END//
DELIMITER ;

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
        photo_path LIKE '%.png'
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
INSERT INTO users (name, email, cpf, username, password_hash) VALUES
('Administrador', 'admin@example.com', '000.000.000-00', 'admin', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQDqUiz8CZA5ZQ7zP6SXJY1tYj7XJ2K');

-- Usuário de teste (senha: 123456)
INSERT INTO users (name, email, cpf, username, password_hash) VALUES
('Usuário Teste', 'teste@citybase.com', '111.222.333-44', 'testuser', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQDqUiz8CZA5ZQ7zP6SXJY1tYj7XJ2K');

-- Exemplo de registro
INSERT INTO reports (
    user_id,
    problem_type_id,
    title,
    description,
    address,
    latitude,
    longitude
) VALUES 
(2, 1, 'Buraco na Avenida Principal', 
 'Buraco de aproximadamente 50cm de diâmetro na pista direita', 
 'Av. Principal, 1000 - Centro', -23.550520, -46.633308),
(2, 2, 'Poste de luz quebrado', 
 'Poste número 45 sem iluminação há 3 dias', 
 'Rua das Flores, 45 - Jardim', -23.548900, -46.634200);

-- Fotos de exemplo do registro
INSERT INTO report_photos (report_id, photo_path) VALUES
(1, 'uploads/reports/1/photo1.jpg'),
(1, 'uploads/reports/1/photo2.jpg'),
(2, 'uploads/reports/2/photo1.jpg');