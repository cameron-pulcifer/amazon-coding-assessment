import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

type DbClient = typeof Pool.prototype | undefined;

export const runMigration = async () => {
  let client: DbClient = undefined;
  try {
    console.log('initializing client');
    client = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    console.log('initializing drizzle');
    const db = drizzle({
      client,
      casing: 'snake_case',
    });

    console.log('starting migration');
    await migrate(db, { migrationsFolder: 'drizzle/migrations' });
    console.log('migration completed');
  } catch (err) {
    console.error(err);
  } finally {
    if (client) {
      await client.end();
      console.log('closed connection');
    }
  }
};

runMigration().catch((err) => console.error('Error in migration process:', err));
