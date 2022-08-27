import { Pool } from 'pg';

const connectionString = 'postgres://postgres:postgres@localhost:5432/postgres';

const databaseConnection = new Pool({ connectionString });

export default databaseConnection;
