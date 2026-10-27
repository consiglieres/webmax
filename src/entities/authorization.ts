import type {IUser, IUserAuthorization} from "./interfaces/user.interface.ts";
import {mockUser} from "../mocks/mock-data.ts";

function getUser(data: IUserAuthorization): IUser | null {
    if (!data.login.trim() || !data.password.trim()) {
        return null;
    }

    // TODO: заменить на запрос к API. Проверка credentials должна быть на сервере.
    return mockUser;
}


export default getUser;
