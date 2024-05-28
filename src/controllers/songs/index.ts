import httpStatus from 'http-status';
import { SongsSaveDto } from '../../dto/songs/songsSaveDto';
import { checkGroupsIds, 
    saveSong as saveSongApi,
    listSongs as listSongsApi,
    countSongsByGroup as  countSongsByGroupApi} from '../../services/songs';
import { Request, Response } from 'express';


export const listIdGroups = async (_: Request, res: Response): Promise<void> => {
    try {
        const groupIds: number[] = await checkGroupsIds();
        res.status(200).send(groupIds);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const saveSong = async (req : Request, res: Response) => {
    try {
        const {
            name,
            groupId,
            dateOfRelease,
        } = new SongsSaveDto(req.body);
        const songId = await saveSongApi({
            name,
            groupId,
            dateOfRelease,
        });
        res.status(httpStatus.CREATED).send({ songId, });
    }catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
}

export const getSongs = async (req: Request, res: Response) => {
    const { groupId, size, from } = req.query;

    if (!groupId) {
        return res.status(400).send({ error: 'groupId is required' });
    }

    const groupIdNumber = parseInt(groupId as string, 10);
    const limit = parseInt(size as string, 10) || 10;
    const skip = parseInt(from as string, 10) || 0;

    try {
        const songs = await listSongsApi(groupIdNumber, limit, skip);
        res.status(200).send(songs);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching data' });
    }
};

export const getCountsByGroup = async (_: Request, res: Response): Promise<void> => {
    try {
        const counts = await countSongsByGroupApi();
        res.status(200).send(counts);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while fetching data' });
    }
};
