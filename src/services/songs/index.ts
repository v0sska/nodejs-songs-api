import getGroups from "../../apis";
import Songs, {ISongs} from "../../model/songs";
import { SongsSaveDto } from "../../dto/songs/songsSaveDto";
import { SongsDto } from "../../dto/songs/songsDto";

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

export const saveSong = async ({
    name,
    groupId,
    dateOfRelease,
}: SongsSaveDto): Promise<string> => {

    const groupIds: number[] = await checkGroupsIds();

    if (groupId === undefined || !groupIds.includes(groupId)) {
        throw new Error(`Group with ID ${groupId} does not exist`);
    }

    const song = await new Songs({
        name,
        groupId,
        dateOfRelease,
    }).save();

    return song._id;
}

export const listSongs = async (groupId: number, size: number = 10, from: number = 0): Promise<SongsDto[]> => {
    try {
        const songs = await Songs.find({ groupId })
            .sort({ dateOfRelease: -1 }) // Сортування по зменшенню дати випуску
            .skip(from) // Пропуск елементів
            .limit(size); // Обмеження кількості елементів

        return songs.map(song => toSongsDto(song));
    } catch (error) {
        console.error('Error while fetching songs:', error);
        throw error; // Кидання помилки для обробки на рівні контролера
    }
}

export const countSongsByGroup = async (): Promise<Record<string, number>> => {
    try {
        const results = await Songs.aggregate([
            {
                $group: {
                    _id: "$groupId",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    groupId: "$_id",
                    count: 1
                }
            }
        ]);

        const counts: Record<string, number> = {};
        results.forEach((result) => {
            counts[result.groupId] = result.count;
        });

        return counts;
    } catch (error) {
        console.error('Error while counting songs by group:', error);
        throw error;
    }
};

const toSongsDto = (song: ISongs): SongsDto => {
    return {
        _id: song._id,
        name: song.name,
        groupId: song.groupId,
        dateOfRelease: song.dateOfRelease,
    };
}