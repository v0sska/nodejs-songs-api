import { checkGroupsIds } from '../../services/songs';
import { Request, Response } from 'express';

export const listIdGroups = async (_: Request, res: Response): Promise<void> => {
    try {
        const groupIds: number[] = await checkGroupsIds();
        res.status(200).send(groupIds);
    } catch (error) {
        res.status(500).send(error);
    }
};