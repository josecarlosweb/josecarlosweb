import axios from "axios";
import { setAccessToken } from "../../cache/index.js";

const refreshToken = process.env.REFRESH_TOKEN || "";
const clientId = process.env.CLIENT_ID || "";
const clientSecret = process.env.CLIENT_SECRET || "";

const authRequestOptions = {
  headers: {
    Authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export const refreshActualToken = () => {
  axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      authRequestOptions
    )
    .then((response) => setAccessToken(response.access_token))
    .catch((err) =>
      console.log("Error on try to get a new token", err.message)
    );
};
