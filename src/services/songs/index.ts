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



