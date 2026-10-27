import type {IStend} from "./stand.interface.ts";

export interface IStudent {
    id: number | string,
    lastName: string,
    firstName: string,
    middleName?: string,
    course: number,
    proxmoxLogin: string,
    password: string,
    listStands: IStend[]
}

