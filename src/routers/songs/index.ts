import express from 'express';
import {saveSong, getSongs} from '../../controllers/songs';

const router = express.Router();

  router.get('', getSongs);
  router.post('', saveSong);

export default router;