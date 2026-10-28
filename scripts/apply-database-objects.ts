import { readFile } from 'node:fs/promises';
import path from 'node:path';
import mysql from 'mysql2/promise';

function statementsFromSql(source: string): string[] {
  const statements: string[] = [];
  let delimiter = ';';
  let buffer = '';

  for (const line of source.split(/\r?\n/)) {
    const directive = line.trim().match(/^DELIMITER\s+(.+)$/i);
    if (directive) {
      delimiter = directive[1];
      continue;
    }
    if (!buffer && (line.trim() === '' || line.trim().startsWith('--'))) continue;
    buffer += `${line}\n`;
    if (line.trimEnd().endsWith(delimiter)) {
      statements.push(buffer.trim().slice(0, -delimiter.length).trim());
      buffer = '';
    }
  }
  if (buffer.trim()) throw new Error('Incomplete SQL statement in database/advanced_objects.sql.');
  return statements;
}

async function main() {
  const rawUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!rawUrl) throw new Error('DIRECT_URL or DATABASE_URL is required.');
  const url = new URL(rawUrl);
  const connection = await mysql.createConnection({
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ''),
    charset: 'utf8mb4'
  });
  const sql = await readFile(path.join(process.cwd(), 'database', 'advanced_objects.sql'), 'utf8');
  try {
    for (const statement of statementsFromSql(sql)) await connection.query(statement);
    console.log('ACV views, routines, functions and triggers are installed.');
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
