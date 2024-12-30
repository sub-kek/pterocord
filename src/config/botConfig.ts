import dotenv from "dotenv";

dotenv.config();

export const config = {
    token: process.env.BOT_TOKEN,
    embed_color: 0x74bcff,
    lang: 'ru',
};

import path from "path";
import { parse } from 'jsonc-parser';
import fs from "fs";

export class Language {
    private readonly data: Record<string, any>;

    constructor(filePath: string) {
        const content = fs.readFileSync(filePath).toString();
        this.data = parse(content);
    }

    get(key: string, variables?: Record<string, any>): string {
        // Рекурсивное получение значения из карты языка.
        const value = key.split('.').reduce((acc, part) => acc && acc[part], this.data);

        if (typeof value === 'string') {
            return this.interpolate(value, variables);
        }

        return `<unknown: ${key}>`;
    }

    // Метод для подстановки значений в строках с переменными
    private interpolate(template: string, variables?: Record<string, any>): string {
        if (!variables) return template;

        return template.replace(/\${(.*?)}/g, (_, variableName) => {
            return variables[variableName] !== undefined ? variables[variableName] : _;
        });
    }
}

export const language = new Language(path.resolve(__dirname, 'languages', `${config.lang}.jsonc`));
