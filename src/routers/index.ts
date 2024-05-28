import { Router } from 'express';
import songs from './songs'

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello, world!');
});

router.use('/songs', songs);

export default router;
