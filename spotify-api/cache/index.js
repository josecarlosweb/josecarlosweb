import NodeCache from "node-cache";

const lastSong = new NodeCache();
const LAST_SONG_KEY = "lastSongKey";

const defaultLastSong = {
  uri: "4JLk3WmaRmMmYe4HQBoz6H",
  cover: "https://i.scdn.co/image/ab67616d0000b273ec50ecfef2585f58c789b933"
}

export const getLastSong = () => {
  const lastSongByCache = lastSong.get(LAST_SONG_KEY);
  return (!lastSongByCache || lastSongByCache === undefined) ? defaultLastSong : lastSongByCache;
};

export const setLastSong = ({uri, cover} = defaultLastSong) => {
  console.log("Saving new song on cache")
  const newSong = {uri, cover};
  lastSong.set(LAST_SONG_KEY, newSong);
}