import { Pool } from "pg";
import User from "../models/user.model";

export default class UserRepository {
    
    private readonly pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    /**
     * Método que busca a lista de usuários
     * @returns A lista de usuários encontrados
     */
    public async findAll(): Promise<User[]> {
        const query = 'SELECT uuid, username FROM users';
        const { rows } = await this.pool.query<User>(query);
        return rows || [];
    }
}
