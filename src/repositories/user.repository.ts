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
            const message = error instanceof Error ? error.message : 'Erro ao realizar a criação do registro';
            return new QueryError(message, error);
        }
    }

    /**
     * Método que atualiza os dados de um registro
     * @param user Informações do usuário que serão atualizadas
     * @returns retorna o uuid do usuário que foi atualizado ou uma instância
     * de `QueryError` caso algo dê errado com o update
     */
    public async update(user: Required<IUser>): Promise<string|QueryError> {
        try {
            const query = `
                UPDATE users
                SET
                    username = $1,
                    password = crypt($2, $3)
                WHERE uuid = $4
            `;
            const result = await this.pool.query(query, [ user.username, user.password, 'meu_segredo', user.uuid]);
            return user.uuid;
        } catch (error){
            const message = error instanceof Error ? error.message : 'Erro ao realizar a atualização do registro';
            return new QueryError(message, error);
        }
    }

    /**
     * Método que deleta um registro pelo uuid
     * @param uuid uuid do usuário a ser deletado
     * @returns retorna o uuid do usuário deleteado ou um instância de `QueryErro`
     * caso ocorre algum erro na deleção
     */
    public async delete(uuid: string): Promise<string|QueryError> {
        try {
            const query = 'DELETE FROM users WHERE uuid = $1';
            await this.pool.query(query, [uuid]);
            return uuid;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro ao realizar a deleção do registro';
            return new QueryError(message, error);
        }
    }

    /**
     * Método que busca um registro para o usuário e senha providos, é usado
     * para validar credenciais
     * @param username username buscado
     * @param password password informado
     */
    public async findByUsernameAndPassword(username: string, password: string): Promise<IUser|null|QueryError> {
        try {
            const query = `
                SELECT uuid, username FROM users
                    WHERE username = $1 AND password = crypt($2, $3)
            `;
            const { rows } = await this.pool.query<IUser>(query, [username, password, 'meu_segredo']);
            return rows[0] || null;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro ao realizar a busca do registro';
            return new QueryError(message, error);
        }
    }

}
