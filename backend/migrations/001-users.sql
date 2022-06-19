PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users
(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    nickname VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(50),
    role VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS flights 
(
    flight_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(7),
    aircraft TEXT,
    company TEXT,
    date DATE,
    departure TIMESTAMP,
    destination TEXT,
    seats INTEGER
);

CREATE TABLE IF NOT EXISTS flight_status (
    flight_status_id INTEGER PRIMARY KEY AUTOINCREMENT,
    flight_id INTEGER NOT NULL,
    flight_status_text TEXT NOT NULL,
    CONSTRAINT c1
        FOREIGN KEY(flight_id) REFERENCES flights(flight_id)
);

CREATE TABLE IF NOT EXISTS reservation (
    reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    flight_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT c1
        FOREIGN KEY(flight_id) REFERENCES flights(flight_id),
    CONSTRAINT c2
        FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS reservation_passagers (
    res_pass_id INTEGER PRIMARY KEY AUTOINCREMENT,
    reservation_id INTEGER NOT NULL,
    name STRING NOT NULL,
    surname STRING NOT NULL,
    CONSTRAINT c1
        FOREIGN KEY(reservation_id) REFERENCES reservation(reservation_id)
);

CREATE TABLE IF NOT EXISTS notifications (
    notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title STRING NOT NULL,
    type STRING NOT NULL
);


