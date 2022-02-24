import NodeCache from "node-cache";

const lastSong = new NodeCache();
const LAST_SONG_KEY = "lastSongKey";

const defaultLastSong = {
  uri: "https://open.spotify.com/track/4JLk3WmaRmMmYe4HQBoz6H",
  cover: "cover.png"
}

export const getLastSong = () => {
  const lastSongByCache = lastSong.get(LAST_SONG_KEY);
  return (lastSongByCache == undefined) ? defaultLastSong : lastSongByCache;
};

export const setLastSong = ({uri, cover} = defaultLastSong) => {
  console.log("Saving new song on cache")
  const newSong = {uri, cover};
  console.log("New song is", JSON.stringify(newSong));
  lastSong.set(LAST_SONG_KEY, newSong);
}