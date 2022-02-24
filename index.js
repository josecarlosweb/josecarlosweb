import express from 'express';
import proxy from 'express-http-proxy';
import {  getActualSongJob } from './api/spotify.js';
import { getLastSong } from './cache/index.js';

const app = express();

app.get('/url', (req, res) => res.redirect(getLastSong().uri));
app.get('/cover', (req, res) => res.redirect(getLastSong().cover));

app.listen(process.env.PORT || 3000, () => {
  getActualSongJob.invoke();
  console.log("App listening");
})

process.on('SIGINT', () => { 
  getActualSong.gracefulShutdown()
  .then(() => process.exit(0));
});