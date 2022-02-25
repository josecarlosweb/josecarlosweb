import fs from 'fs';
import axios from 'axios';
import { get } from '../api/adapters/index.js';
import schedule from 'node-schedule';
import { setLastSong } from '../cache/index.js';

const storeImage = (originUri) => axios({
  url: originUri,
  responseType: 'stream',
}).then(
  response =>
    new Promise((resolve, reject) => {
      response.data
        .pipe(fs.createWriteStream('cover.png'))
        .on('finish', () => resolve())
        .on('error', e => reject(e));
    }),
);

const collectMetadata = (responseData) => {
  const rawUri = responseData.item.uri.split(/[:]+/).pop();
  console.log('uri', rawUri);
  const cover = responseData.item.album.images.find(element => element.width >= 600).url;
  console.log('cover', cover);
  storeImage(cover);

  return {
    uri: `https://open.spotify.com/track/${rawUri}`,
    cover: 'cover.png',
    embed: rawUri
  }
} 

const getSong = () => get({url: "/"})
  .then(response => {
    const metadata = collectMetadata(response);
    if(metadata.uri && metadata.cover){
      setLastSong({uri: metadata.uri, cover: metadata.cover, embed: metadata.uri});
    }
  })
  .catch(err => console.log("Error on try to get the actual song", err.message));

export const getActualSongJob = schedule.scheduleJob('*/5 * * * *', () => getSong());