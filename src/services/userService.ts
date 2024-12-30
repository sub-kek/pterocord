import fs from 'fs';
import path from 'path';
import {createDir} from "../asserts";

interface User {
    id: string; // Discord ID пользователя
    panel: string; // URL панели пользователя
    apikey: string; // API-ключ пользователя
}

const filePath = path.resolve(__dirname, '../../data/users.json');

export const loadUsers = async (): Promise<User[]> => {
    try {
        if (!fs.existsSync(filePath)) {
            return []
        }
        const data = await fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data) as User[];
    } catch (error) {
        console.error('Ошибка чтения users.json:', error);
        return [];
    }
};

export const saveUsers = async (users: User[]): Promise<void> => {
    try {
        await createDir(filePath);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 4));
    } catch (error) {
        console.error('Ошибка записи users.json:', error);
    }
};

export const addUser = async (user: User): Promise<void> => {
    const users = await loadUsers();
    const existingUser = users.find(u => u.id === user.id);

    if (existingUser) {
        existingUser.panel = user.panel;
        existingUser.apikey = user.apikey;
    } else {
        users.push(user);
    }

    await saveUsers(users);
};
