import { CommandInteraction } from 'discord.js';
import { addUser } from '../services/userService';

export const addPanel = async (interaction: CommandInteraction) => {
    const userId = interaction.user.id;
    const panel = interaction.options.get('panel', true).value as string;
    const apikey = interaction.options.get('apikey', true).value as string;

    try {
        await addUser({ id: userId, panel, apikey });
        await interaction.reply('Ваша панель успешно сохранена!');
    } catch (error) {
        console.error('Ошибка добавления панели:', error);
        await interaction.reply('Произошла ошибка при сохранении панели. Попробуйте снова.');
    }
};
