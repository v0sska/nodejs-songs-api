import getGroups from "../../apis";

export const checkGroupsIds = async (): Promise<number[]> => {
    let groupIds: number[];

    try {
        groupIds = await getGroups();
        console.log('Retrieved group IDs:', groupIds);
    } catch (error) {
        console.error('Error while retrieving group IDs:', error);
        throw error; // Переконайтеся, що помилка кидається, щоб її можна було обробити
    }

    return groupIds; // Повертаємо масив groupIds
};