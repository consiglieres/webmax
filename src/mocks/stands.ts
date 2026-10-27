import type {IStend} from "../entities/interfaces/stand.interface.ts";
import {mockStudents} from "./mock-data.ts";
import {mockStandInterfaces} from "./stand-interfaces.ts";

const standsByPoolId = new Map<string, IStend>();

mockStudents.forEach((student) => {
    student.listStands.forEach((stand) => {
        const key = String(stand.poolId);

        if (!standsByPoolId.has(key)) {
            standsByPoolId.set(key, {
                ...stand,
                interfaces: mockStandInterfaces[key] ?? []
            });
        }
    });
});

// Уникальные стенды из моковых данных студентов вместе с их интерфейсами
export const mockStands: IStend[] = [...standsByPoolId.values()]
    .sort((first, second) => first.name.localeCompare(second.name));
