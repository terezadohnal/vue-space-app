CREATE TABLE IF NOT EXISTS users
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    nickname VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    role VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)