import express from 'express';
import {  getActualSongJob } from './api/spotify.js';
import { getLastSong } from './cache/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.get('/url', (req, res) => res.redirect(getLastSong().uri));
app.get('/cover', (req, res) => {
  res.header('Pragma', 'no-cache');
  res.header('Content-Type', 'image/png');
  res.header('Expires', '0');
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.sendFile('cover.png', { root: __dirname })
});

app.listen(process.env.PORT || 3000, () => {
  getActualSongJob.invoke();
  console.log("App listening");
})

process.on('SIGINT', () => { 
  getActualSong.gracefulShutdown()
  .then(() => process.exit(0));
});