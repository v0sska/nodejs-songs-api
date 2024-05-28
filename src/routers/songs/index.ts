import express from 'express';
import {saveSong, getSongs, getCountsByGroup} from '../../controllers/songs';

const router = express.Router();

  router.get('', getSongs);
  router.post('', saveSong);
  router.post('/_counts', getCountsByGroup);


export default router;