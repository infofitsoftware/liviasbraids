#!/usr/bin/env bash
set -euo pipefail

# Load .env if present
if [ -f ".env" ]; then
  # shellcheck disable=SC2046
  export $(grep -v '^#' .env | grep '=' | xargs)
fi

node <<'EOF'
import mysql from 'mysql2/promise';

const {
  DB_HOST = 'localhost',
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_NAME) {
  console.error('Missing DB_USER, DB_PASSWORD, or DB_NAME env vars');
  process.exit(1);
}

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      connectTimeout: 10000,
    });
    const [rows] = await conn.query('SELECT 1 AS ok');
    console.log('✅ DB connection successful. Test query result:', rows);
    await conn.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  }
})();
EOF

