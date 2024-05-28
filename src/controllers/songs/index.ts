import httpStatus from 'http-status';
import { SongsSaveDto } from '../../dto/songs/songsSaveDto';
import { checkGroupsIds, 
    saveSong as saveSongApi } from '../../services/songs';
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
        res.status(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
    
