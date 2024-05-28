import express from 'express';
import { listIdGroups, saveSong } from '../../controllers/songs';

const router = express.Router();

  router.get('', listIdGroups);
  router.post('', saveSong);

export default router;