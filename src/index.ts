import express from 'express';
import dotenv from 'dotenv';
import { todoRouter } from './routes/todo.routes';
dotenv.config();

import { StatsD } from 'hot-shots';

const statsd = new StatsD({
  host: '127.0.0.1',
  port: 8125,
  prefix: 'express.',
});

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.use((req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = seconds * 1e3 + nanoseconds / 1e6;

    const route = req.route?.path || req.path;
    const method = req.method.toLowerCase();
    const status = res.statusCode;

    // Example metric: express.api_get_users.response_time
    statsd.timing(
      `api_${method}_${route.replace(/\//g, '_')}.response_time`,
      durationMs
    );
    statsd.increment(
      `api_${method}_${route.replace(/\//g, '_')}.status_code.${status}`
    );
  });

  next();
});

app.get('/hold/:time', async (req, res) => {
  const time = parseInt(req.params.time, 10);

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });

  res.json({
    timeABC: time,
  });
});

app.post('/stop/:time', async (req, res) => {
  const time = parseInt(req.params.time, 10);

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });

  res.json({
    timeABC: time,
  });
});

app.use('/todos', todoRouter);

app.listen(port, () => {
  console.log('Server successfully started on port', port);
});
