// Quick script to test database connection with different hosts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const hostsToTry = [
  process.env.DB_HOST || 'localhost',
  'localhost',
  'mysql.hostinger.com',
  '185.224.137.2', // Common Hostinger MySQL IP
];

async function testConnection(host) {
  try {
    console.log(`\nTrying host: ${host}...`);
    const connection = await mysql.createConnection({
      host: host,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 10000,
    });
    
    console.log(`✅ SUCCESS! Connected using host: ${host}`);
    await connection.end();
    return true;
  } catch (error) {
    console.log(`❌ Failed: ${error.message}`);
    return false;
  }
}

async function findWorkingHost() {
  console.log('Testing database connections...');
  console.log(`Database: ${process.env.DB_NAME}`);
  console.log(`User: ${process.env.DB_USER}`);
  
  for (const host of hostsToTry) {
    const success = await testConnection(host);
    if (success) {
      console.log(`\n🎉 Use this in your .env file:`);
      console.log(`DB_HOST=${host}`);
      return;
    }
  }
  
  console.log('\n❌ Could not connect with any host.');
  console.log('\nPlease check:');
  console.log('1. Your .env file has correct credentials');
  console.log('2. Remote MySQL access is enabled in Hostinger');
  console.log('3. Your IP is whitelisted in Hostinger Remote MySQL settings');
}

findWorkingHost();

