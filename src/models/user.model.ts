
interface IUser {
    uuid?: string;
    username: string;
    password?: string;
}

export default class User implements IUser {

    public uuid?: string;
    public username: string;
    public password?: string;

    public static readonly TABLE_NAME = 'users';

    constructor(username: string) {
        this.username = username;
    }

    public static from(obj: IUser) {
        const user = new User(obj.username);
        if (typeof obj.uuid === 'string') {
            user.uuid = obj.uuid;
        }
        if (typeof obj.password === 'string') {
            user.password = obj.password;
        }
        return user;
    }
}
