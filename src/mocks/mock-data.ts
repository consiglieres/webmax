import type {IUser} from "../entities/interfaces/user.interface.ts";
import type {IStudent} from "../entities/interfaces/student.interface.ts";

// Текущий авторизованный пользователь
export const mockUser: IUser = {
    id: 1,
    firstName: "Nikita",
    rule: "admin",
    image: "avatar"
};

// Студенты для страницы «Студенты»
export const mockStudents: IStudent[] = [
    {
        id: 1,
        lastName: "Иванов",
        firstName: "Иван",
        middleName: "Иванович",
        course: 2,
        proxmoxLogin: "ivanov",
        password: "Iv@nov#2026",
        listStands: [
            {
                poolId: 101,
                name: "web-react-01",
                description: "Учебный стенд для лабораторных работ по React и TypeScript",
                nets: [],
                permissions: []
            },
            {
                poolId: 102,
                name: "db-postgres-01",
                description: "Стенд с PostgreSQL для практик по проектированию баз данных",
                nets: [],
                permissions: []
            }
        ]
    },
    {
        id: 2,
        lastName: "Петрова",
        firstName: "Анна",
        middleName: "Сергеевна",
        course: 2,
        proxmoxLogin: "petrova",
        password: "Petr0va$2026",
        listStands: [
            {
                poolId: 103,
                name: "backend-node-01",
                description: "Стенд для разработки серверного API на Node.js",
                nets: [],
                permissions: []
            },
            {
                poolId: 104,
                name: "db-postgres-02",
                description: "Стенд с PostgreSQL для лабораторных работ по SQL",
                nets: [],
                permissions: []
            }
        ]
    },
    {
        id: 3,
        lastName: "Смирнов",
        firstName: "Дмитрий",
        middleName: "Алексеевич",
        course: 3,
        proxmoxLogin: "smirnov",
        password: "Sm1rnov!2026",
        listStands: [
            {
                poolId: 105,
                name: "devops-docker-01",
                description: "Стенд для практик по Docker и контейнеризации приложений",
                nets: [],
                permissions: []
            }
        ]
    },
    {
        id: 4,
        lastName: "Кузнецова",
        firstName: "Мария",
        middleName: "Павловна",
        course: 1,
        proxmoxLogin: "kuznetsova",
        password: "Kuznets0va*2026",
        listStands: [
            {
                poolId: 106,
                name: "web-html-css-01",
                description: "Стенд для практик по вёрстке и основам веб-разработки",
                nets: [],
                permissions: []
            }
        ]
    },
    {
        id: 5,
        lastName: "Соколов",
        firstName: "Артём",
        middleName: "Викторович",
        course: 3,
        proxmoxLogin: "sokolov",
        password: "S0kolov%2026",
        listStands: [
            {
                poolId: 107,
                name: "devops-cicd-01",
                description: "Стенд для практик по настройке CI/CD пайплайнов",
                nets: [],
                permissions: []
            },
            {
                poolId: 108,
                name: "backend-python-01",
                description: "Стенд для разработки API на Python и FastAPI",
                nets: [],
                permissions: []
            }
        ]
    },
    {
        id: 6,
        lastName: "Попова",
        firstName: "Елизавета",
        middleName: "Дмитриевна",
        course: 1,
        proxmoxLogin: "popova",
        password: "P0pova&2026",
        listStands: [
            {
                poolId: 109,
                name: "web-html-css-02",
                description: "Стенд для лабораторных работ по HTML и CSS",
                nets: [],
                permissions: []
            }
        ]
    },
    {
        id: 7,
        lastName: "Волков",
        firstName: "Никита",
        middleName: "Андреевич",
        course: 2,
        proxmoxLogin: "volkov",
        password: "V0lkov^2026",
        listStands: [
            {
                poolId: 110,
                name: "web-react-02",
                description: "Стенд для практик по React и клиентской разработке",
                nets: [],
                permissions: []
            },
            {
                poolId: 111,
                name: "db-mysql-01",
                description: "Стенд с MySQL для практик по базам данных",
                nets: [],
                permissions: []
            }
        ]
    }
];
