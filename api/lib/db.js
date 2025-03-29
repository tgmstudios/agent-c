const mysql = require('mysql2');

const mysql_host = process.env.MYSQL_HOST;
const mysql_port = process.env.MYSQL_PORT;
const mysql_user = process.env.MYSQL_USER;
const mysql_pass = process.env.MYSQL_PASS;
const mysql_db = process.env.MYSQL_DB;

const credentials = {
    host: mysql_host,
    port: mysql_port,
    user: mysql_user,
    password: mysql_pass,
    database: mysql_db
};

let connection;

const handleConnectDisconnect = () => {
    console.log("Connecting to database...");
    connection = mysql.createConnection(credentials);

    connection.connect((err) => {
        if (err) {
            console.error("Error connecting to DB:", err);
            setTimeout(handleConnectDisconnect, 2000);
        } else {
            console.log("Connected to database.");
        }
    });

    connection.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.warn("Error: PROTOCOL_CONNECTION_LOST. Reconnecting...");
            handleConnectDisconnect();
        } else {
            console.error("Database error:", err);
            handleConnectDisconnect();
        }
    });
};

handleConnectDisconnect();

// Helper function for executing queries
const executeQuery = async (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, results) => {
            if (error) {
                console.error("Query Error:", error);
                return reject(error);
            }
            resolve(results);
        });
    });
};

// Insert function
const insert = async (table, fields, values) => {
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO \`${table}\` (${fields.join(', ')}) VALUES (${placeholders})`;
    
    try {
        await executeQuery(query, values);
        return { result: "success" };
    } catch (error) {
        return { result: "error", type: error.message };
    }
};

// Search function
const search = async (table, field, value) => {
    const query = `SELECT * FROM \`${table}\` WHERE \`${field}\` = ?`;
    
    try {
        const results = await executeQuery(query, [value]);
        return results[0] || null;
    } catch (error) {
        return { result: "error", type: error.message };
    }
};

// Update function
const update = async (table, fieldToUpdate, newValue, searchField, searchValue) => {
    const query = `UPDATE \`${table}\` SET \`${fieldToUpdate}\` = ? WHERE \`${searchField}\` = ?`;
    
    try {
        await executeQuery(query, [newValue, searchValue]);
        return { result: "success" };
    } catch (error) {
        return { result: "error", type: error.message };
    }
};

// Search Exists function
const searchExists = async (table, field, value) => {
    const query = `SELECT EXISTS(SELECT 1 FROM \`${table}\` WHERE \`${field}\` = ?) AS exists`;
    
    try {
        const results = await executeQuery(query, [value]);
        return results[0]?.exists === 1;
    } catch (error) {
        console.error("Error checking existence:", error);
        return false;
    }
};

module.exports = {
    insert,
    search,
    update,
    searchExists
};
