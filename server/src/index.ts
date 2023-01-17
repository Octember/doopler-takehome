import express, { Request, Response } from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const db = new sqlite3.Database('./analytics.sqlite');
const corsOpt: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

app.use(express.json());
app.use(cors(corsOpt));

app.post('/events', async (req: Request, res: Response) => {
  const name = req.body.name;
  const timestamp = (new Date()).getTime();

  await db.run("INSERT INTO events (name, timestamp) VALUES (?, datetime('now'))", [name]);
  return res.json({success: true});
});

app.listen({port: 8081});
