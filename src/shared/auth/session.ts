import type {IUser} from "../../entities/interfaces/user.interface.ts";

const SESSION_STORAGE_KEY = "webmax:session-user";

function isUser(value: unknown): value is IUser {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const user = value as Record<string, unknown>;

    return (
        (typeof user.id === "number" || typeof user.id === "string") &&
        typeof user.firstName === "string" &&
        typeof user.rule === "string"
    );
}

export function getSessionUser(): IUser | null {
    const rawUser = localStorage.getItem(SESSION_STORAGE_KEY);

    if (!rawUser) {
        return null;
    }

    try {
        const user: unknown = JSON.parse(rawUser);

        if (isUser(user)) {
            return user;
        }

        localStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
    } catch {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
    }
}

export function saveSessionUser(user: IUser): void {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

export function clearSessionUser(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
}
