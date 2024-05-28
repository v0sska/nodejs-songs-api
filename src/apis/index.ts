const groupsUrl = 'http://localhost:8080/api/music_groups/list';

const getGroups = async (): Promise<number[]> => {
    try {
        const response = await fetch(groupsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        // Витягуємо масив груп з об'єкта `content`
        const groups = data.content;

        if (!Array.isArray(groups)) {
            throw new Error('Fetched data is not an array');
        }

        const groupIds: number[] = [];
        groups.forEach((group: any) => {
            if (group.id !== undefined) {
                groupIds.push(group.id);
            }
        });

        return groupIds;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export default getGroups;
