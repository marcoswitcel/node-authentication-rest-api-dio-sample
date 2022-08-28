import { Pool } from 'pg';
import { QueryError } from '../errors/query.error';
import { IUser } from '../models/user.model';

export default class UserRepository {
    
    private readonly pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    /**
     * Método que busca a lista de usuários
     * @returns A lista de usuários encontrados
     */
    public async findAll(): Promise<IUser[]> {
        const query = 'SELECT uuid, username FROM users';
        const { rows } = await this.pool.query<IUser>(query);
        return rows || [];
    }

    /**
     * Método que faz a busca do usuário pelo uuid
     * @throws {QueryError} Caso o uuid provido não seja válido, a consulta não será
     * rodada e retornará um erro
     * @param uuid uuid do usuário que buscamos
     * @returns retorna o usuário caso encontrar ou null caso não exista
     */
    public async findById(uuid: string): Promise<IUser|null|never> {
        try {
            const query = 'SELECT uuid, username FROM users WHERE uuid = $1';
            const { rows } = await this.pool.query<IUser>(query, [uuid]);
            return rows[0] || null;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro ao realizar a consulta';
            throw new QueryError(message, error);
        }
    }

    /**
     * Método que faz a criação de um novo usuário na base de dados
     * @param user username e password que serão usados para a criação do usuário
     * @returns retorna o uuid do usuário criado ou um instância de `QueryErro`
     * caso ocorre algum erro na inserção.
     */
    public async create(user: Required<Pick<IUser,'username'|'password'>>): Promise<string|QueryError> {
        try {
            const query = `
                INSERT INTO users (username, password)
                    VALUES ($1, crypt($2, $3))
                    RETURNING uuid
            `;
            const result = await this.pool.query<{ uuid: string }>(query, [user.username, user.password, 'meu_segredo']);
            return result.rows[0].uuid;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro ao realizar o criação do registro';
            return new QueryError(message, error);
        }
    }
}
