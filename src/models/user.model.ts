
interface IUser {
    uuid?: string;
    username: string;
    password?: string;
}

export default class User implements IUser {

    uuid?: string;
    username: string;
    password?: string;

    constructor(username: string) {
        this.username = username;
    }

    static from(obj: IUser) {
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
