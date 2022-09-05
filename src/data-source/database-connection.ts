import config from 'config';
import { Pool } from 'pg';

const connectionString = config.get<string>('database.connectionString');

const databaseConnection = new Pool({ connectionString });

export default databaseConnection;
