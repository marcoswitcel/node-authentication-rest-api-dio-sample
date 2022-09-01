import databaseConnection from '../data-source/database-connection';
import UserRepository from './user.repository';

/**
 * Instância do repositório configurada com o conexão que deve ser usada
 * na aplicação.
 */
export const userRepository = new UserRepository(databaseConnection);
