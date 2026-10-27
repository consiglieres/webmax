import type {ITeacher} from "../entities/interfaces/teacher.interface.ts";

// Преподаватели, доступные для выбора при добавлении группы
export const mockTeachers: ITeacher[] = [
    {
        id: 1,
        fullName: "Смирнов Алексей Петрович"
    },
    {
        id: 2,
        fullName: "Кузнецова Ольга Викторовна"
    },
    {
        id: 3,
        fullName: "Морозов Дмитрий Сергеевич"
    },
    {
        id: 4,
        fullName: "Фёдорова Елена Андреевна"
    }
];
