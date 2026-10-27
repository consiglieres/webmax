import type {IStudent} from "./interfaces/student.interface.ts";
import {mockStudents} from "../mocks/mock-data.ts";

function getStudents(): IStudent[] {
    return mockStudents
}


export default getStudents
