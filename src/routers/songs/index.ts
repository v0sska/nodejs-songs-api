import express from 'express';
import { listIdGroups } from '../../controllers/songs';

const router = express.Router();

router.get('/', listIdGroups);

export default router;