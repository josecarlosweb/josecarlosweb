import express from 'express';
import path from 'path';
import {  getActualSongJob } from './api/spotify.js';
import { getLastSong } from './cache/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.set('view engine', 'ejs');
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get("/", (req, res) => {
  res.render(path.join(__dirname, 'views/home'), {
    embed: getLastSong().embed
  })
});
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