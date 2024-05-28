import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routers from './routers';
import config from './config';
import log4js, { Configuration } from 'log4js';
import connectDB from './config/mongoConfig'; // Імпортуємо функцію connectDB

const startServer = async () => {
  const app = express();

  log4js.configure(config.log4js as Configuration);

  app.disable('etag');

  app.use(express.json({ limit: '1mb' }));

  app.use((req, _, next) => {
    const dateReviver = (_: string, value: unknown) => {
      if (value && typeof value === 'string') {
        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        if (dateRegex.test(value)) {
          return new Date(value);
        }
      }
      return value;
    };

    req.body = JSON.parse(JSON.stringify(req.body), dateReviver);
    next();
  });

  app.use('/', routers);

  // Підключення до MongoDB
  await connectDB(); // Виклик connectDB()

  // Запуск сервера на визначеному порту
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    log4js.getLogger().info(`Example app listening on port ${port}`);
  });

  return app;
};

startServer();
