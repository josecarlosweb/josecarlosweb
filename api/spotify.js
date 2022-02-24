import http from 'http';
import { Transform } from 'stream';
import fs from 'fs';

import { get } from '../api/adapters/index.js';
import schedule from 'node-schedule';
import { setLastSong } from '../cache/index.js';

const storeImage = (originUri) => {
  http.request(originUri, (response) => {                                        
    var data = new Stream();                                                    
  
    response.on('data', (chunk) => {                                       
      data.push(chunk);                                                         
    });                                                                         
  
    response.on('end', () => {                                             
      fs.writeFileSync('cover.png', data.read());                               
    });                                                                         
  }).end();
} 

const collectMetadata = (responseData) => {
  const uri = responseData.item.uri.split(/[:]+/).pop();
  console.log('uri', uri);
  const cover = responseData.item.album.images.find(element => element.width >= 600).url;
  console.log('cover', cover);
  storeImage(cover);

  return {
    uri: `https://open.spotify.com/track/${uri}`,
    cover: 'cover.png'
  }
} 

const getSong = () => get({url: "/"})
  .then(response => {
    const metadata = collectMetadata(response);
    if(metadata.uri && metadata.cover){
      setLastSong({uri: metadata.uri, cover: metadata.cover});
    }
  })
  .catch(err => console.log("Error on try to get the actual song", err.message));

export const getActualSongJob = schedule.scheduleJob('*/5 * * * *', () => getSong());