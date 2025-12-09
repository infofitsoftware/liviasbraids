import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
  let connection;
  
  try {
    // Connect to MySQL
    // Note: Password with special characters like # should be handled correctly by mysql2
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true,
      connectTimeout: 60000, // 60 seconds timeout for remote connections
      ssl: false // Set to true if Hostinger requires SSL
    });

    console.log('Connected to MySQL database');

    // Read and execute schema
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await connection.query(schema);
    console.log('Database schema created/updated');

    // Create default admin user if it doesn't exist
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE username = ?',
      ['admin']
    );

    if (users.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await connection.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        ['admin', hashedPassword]
      );
      console.log('Default admin user created:');
      console.log('Username: admin');
      console.log('Password: admin123');
      console.log('⚠️  IMPORTANT: Change this password after first login!');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initializeDatabase();

