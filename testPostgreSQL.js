const pool = require('./postgres.config.js'); // Ensure this path is correct

async function testPostgreSQL() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Connected successfully to PostgreSQL, current time:', res.rows[0].now);
    } catch (err) {
        console.error('Failed to connect to PostgreSQL:', err);
    } finally {
        await pool.end();
    }
}

testPostgreSQL();
