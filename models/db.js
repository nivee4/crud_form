import mysql2 from 'mysql2';

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "nivi",
    database: "db"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the database');
});

export default db;
