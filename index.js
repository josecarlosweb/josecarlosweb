import express from 'express';
import proxy from 'express-http-proxy';
import {  getActualSongJob } from './api/spotify.js';
import { getLastSong } from './cache/index.js';

const app = express();

app.get('/url', (req, res) => res.send(getLastSong().uri));
app.get('/cover', (req, res) => res.redirect(getLastSong().cover));

app.listen(8080, () => {
  getActualSongJob.invoke();
  console.log("App listening");
})

process.on('SIGINT', () => { 
  getActualSong.gracefulShutdown()
  .then(() => process.exit(0));
});