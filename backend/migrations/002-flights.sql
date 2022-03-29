CREATE TABLE IF NOT EXISTS flights 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(7),
    aircraft TEXT,
    departure TIMESTAMP,
    destination TEXT
)