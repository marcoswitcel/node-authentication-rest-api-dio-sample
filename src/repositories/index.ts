import config from 'config';
import databaseConnection from '../data-source/database-connection';
import UserRepository from './user.repository';

/**
 * Instância do repositório configurada com o conexão que deve ser usada
 * na aplicação.
 */
const cryptKey = config.get<string>('database.cryptKey');
export const userRepository = new UserRepository(databaseConnection, cryptKey);
