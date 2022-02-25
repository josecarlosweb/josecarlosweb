import NodeCache from "node-cache";

const cache = new NodeCache();
const LAST_SONG_KEY = "lastSongKey";
const ACCESS_TOKEN_KEY = "accessTokenKey";

const defaultLastSong = {
  uri: "https://open.spotify.com/track/4JLk3WmaRmMmYe4HQBoz6H",
  cover: "cover.png",
  embed: "4JLk3WmaRmMmYe4HQBoz6H"
}

export const getLastSong = () => {
  const lastSongByCache = cache.get(LAST_SONG_KEY);
  return (lastSongByCache == undefined) ? defaultLastSong : lastSongByCache;
};

export const setLastSong = ({uri, cover, embed} = defaultLastSong) => {
  console.log("Saving new song on cache")
  const newSong = {uri, cover, embed};
  console.log("New song is", JSON.stringify(newSong));
  cache.set(LAST_SONG_KEY, newSong);
}

export const getAccessToken = () => {
  const token = cache.get(ACCESS_TOKEN_KEY);
  return (token == undefined) ? process.env.BEARER_TOKEN : token;
}

export const setAccessToken = (newAccessToken) => {
  cache.set(ACCESS_TOKEN_KEY, `Bearer ${newAccessToken}`);
}