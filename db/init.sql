CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email)
VALUES
    ('Gowmitha', 'gowmitha@gmail.com'),
    ('GOWMI', 'gowmi@gmail.com')
ON DUPLICATE KEY UPDATE
    name = VALUES(name);