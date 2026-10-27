import type {ISample} from "../entities/interfaces/sample.interface.ts";

// Конфигурации золотых стендов для страницы «Конфигурации»
export const mockConfigurations: ISample[] = [
    {
        id: 1,
        name: "Frontend: React + TypeScript",
        description: "Базовый стенд для практик по фронтенд-разработке",
        standsCount: 12,
        createdAt: "2026-09-01"
    },
    {
        id: 2,
        name: "Backend: Node.js + PostgreSQL",
        description: "Стенд для практик по серверной разработке",
        standsCount: 8,
        createdAt: "2026-09-10"
    },
    {
        id: 3,
        name: "DevOps: Docker + CI/CD",
        description: "Стенд для практик по контейнеризации и автоматизации",
        standsCount: 5,
        createdAt: "2026-09-18"
    },
    {
        id: 4,
        name: "Python: FastAPI",
        description: "Стенд для практик по разработке API на Python",
        standsCount: 10,
        createdAt: "2026-10-02"
    },
    {
        id: 5,
        name: "Базы данных: PostgreSQL",
        description: "Стенд для практик по проектированию баз данных",
        standsCount: 6,
        createdAt: "2026-08-21"
    }
];
