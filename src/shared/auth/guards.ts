import {replace, type LoaderFunctionArgs} from "react-router";
import type {IUser} from "../../entities/interfaces/user.interface.ts";
import {getSessionUser} from "./session.ts";

export const LOGIN_PATH = "/";
export const DEFAULT_AUTHENTICATED_PATH = "/listStudents";

export interface AuthRouteData {
    user: IUser;
}

/**
 * Guard для приватных маршрутов.
 * Срабатывает до рендера страницы, поэтому защищённый интерфейс не успевает "мигнуть".
 */
export function requireAuthLoader({request}: LoaderFunctionArgs): AuthRouteData {
    const user = getSessionUser();

    if (!user) {
        const url = new URL(request.url);
        const from = url.pathname + url.search;

        throw replace(`${LOGIN_PATH}?from=${encodeURIComponent(from)}`);
    }

    return {user};
}

/**
 * Не даёт авторизованному пользователю повторно открыть страницу входа.
 */
export function guestOnlyLoader(): null {
    if (getSessionUser()) {
        throw replace(DEFAULT_AUTHENTICATED_PATH);
    }

    return null;
}

/**
 * Возвращает только внутренний путь, чтобы параметр `from` нельзя было
 * использовать для open redirect на сторонний сайт.
 */
export function getRedirectPath(from: string | null): string {
    const isInternalPath =
        from !== null &&
        from !== LOGIN_PATH &&
        from.startsWith("/") &&
        !from.startsWith("//") &&
        !from.startsWith("/\\");

    return isInternalPath ? from : DEFAULT_AUTHENTICATED_PATH;
}
