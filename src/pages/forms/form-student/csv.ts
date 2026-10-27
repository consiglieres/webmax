export interface CsvStudent {
    lastName: string;
    firstName: string;
    middleName: string;
    course: string;
    proxmoxLogin: string;
    password: string;
}

export interface CsvParseResult {
    students: CsvStudent[];
    error: string | null;
}

type CsvColumn = keyof CsvStudent | "fullName";

const COLUMN_MAP: Record<string, CsvColumn> = {
    фамилия: "lastName",
    lastname: "lastName",
    имя: "firstName",
    firstname: "firstName",
    name: "firstName",
    отчество: "middleName",
    middlename: "middleName",
    фио: "fullName",
    fullname: "fullName",
    курс: "course",
    course: "course",
    логин: "proxmoxLogin",
    логинproxmox: "proxmoxLogin",
    proxmoxlogin: "proxmoxLogin",
    login: "proxmoxLogin",
    пароль: "password",
    password: "password",
};

function normalizeHeader(value: string): string {
    return value.trim().toLowerCase().replace(/[\s_-]/g, "");
}

function detectDelimiter(line: string): string {
    const candidates = [",", ";", "\t"];

    return candidates.reduce((best, candidate) => {
        const candidateCount = line.split(candidate).length;
        const bestCount = line.split(best).length;
        return candidateCount > bestCount ? candidate : best;
    }, ",");
}

function parseRows(text: string, delimiter: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = "";
    let inQuotes = false;

    for (let index = 0; index < text.length; index += 1) {
        const char = text[index];
        const nextChar = text[index + 1];

        if (inQuotes) {
            if (char === '"') {
                if (nextChar === '"') {
                    field += '"';
                    index += 1;
                } else {
                    inQuotes = false;
                }
            } else {
                field += char;
            }
            continue;
        }

        if (char === '"') {
            inQuotes = true;
            continue;
        }

        if (char === delimiter) {
            row.push(field);
            field = "";
            continue;
        }

        if (char === "\n") {
            row.push(field);
            rows.push(row);
            row = [];
            field = "";
            continue;
        }

        if (char !== "\r") {
            field += char;
        }
    }

    if (field.length > 0 || row.length > 0) {
        row.push(field);
        rows.push(row);
    }

    return rows.filter((parsedRow) => parsedRow.some((cell) => cell.trim() !== ""));
}

export function parseStudentCsv(source: string): CsvParseResult {
    const text = source.replace(/^\uFEFF/, "");

    if (!text.trim()) {
        return {students: [], error: "CSV-файл пуст."};
    }

    const firstLine = text.split(/\r?\n/).find((line) => line.trim() !== "") ?? "";
    const delimiter = detectDelimiter(firstLine);
    const rows = parseRows(text, delimiter);

    if (rows.length < 2) {
        return {students: [], error: "В CSV-файле нет строк со студентами."};
    }

    const [header, ...dataRows] = rows;
    const indexes = new Map<CsvColumn, number>();

    header.forEach((cell, index) => {
        const key = COLUMN_MAP[normalizeHeader(cell)];

        if (key && !indexes.has(key)) {
            indexes.set(key, index);
        }
    });

    const hasSeparateNames = indexes.has("lastName") && indexes.has("firstName");
    const hasFullName = indexes.has("fullName");

    if (!hasSeparateNames && !hasFullName) {
        return {
            students: [],
            error: "В CSV-файле не найдены колонки с именем: добавьте «Фамилия» и «Имя» или одну колонку «ФИО»."
        };
    }

    const students = dataRows
        .map((row) => {
            const getValue = (key: CsvColumn): string => {
                const index = indexes.get(key);
                return index === undefined ? "" : (row[index] ?? "").trim();
            };

            const fullNameParts = getValue("fullName").split(/\s+/).filter(Boolean);

            return {
                lastName: getValue("lastName") || fullNameParts[0] || "",
                firstName: getValue("firstName") || fullNameParts[1] || "",
                middleName: getValue("middleName") || fullNameParts.slice(2).join(" "),
                course: getValue("course"),
                proxmoxLogin: getValue("proxmoxLogin"),
                password: getValue("password"),
            };
        })
        .filter((student) => student.lastName || student.firstName);

    if (students.length === 0) {
        return {students: [], error: "В CSV-файле не найдено ни одного студента."};
    }

    return {students, error: null};
}
