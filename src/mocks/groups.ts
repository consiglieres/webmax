import type {IGroup} from "../entities/interfaces/group.interface.ts";

// Учебные группы для назначения конфигураций
export const mockGroups: IGroup[] = [
    {
        id: 1,
        name: "РИ-220901",
        course: 2,
        teacherName: "Смирнов Алексей Петрович",
        studentsCount: 24
    },
    {
        id: 2,
        name: "РИ-220902",
        course: 2,
        teacherName: "Кузнецова Ольга Викторовна",
        studentsCount: 22
    },
    {
        id: 3,
        name: "ПИ-210901",
        course: 3,
        teacherName: "Морозов Дмитрий Сергеевич",
        studentsCount: 19
    },
    {
        id: 4,
        name: "ИВТ-230901",
        course: 1,
        teacherName: "Фёдорова Елена Андреевна",
        studentsCount: 26
    }
];
