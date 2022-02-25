import axios from 'axios';
import { refreshActualToken } from '../auth/refreshTokenHandler';

const getDefaultHeaders = (contentType) => ({
  "Content-Type": contentType,
  "Cache-Control": "no-cache",
  "Accept": "application/json",
  Pragma: "no-cache",
});

const remoteTagInterceptor = (response) => {
  response.data = JSON.parse(
    JSON.stringify(response.data)
      .replace(/<script/g, "")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  );
  return response;
};

const unauthorizedInteceptor = (error) => {
  const res = error.response;
  if (res.status === 401) {
    console.log("Oops, token is invalid, refreshing and try again in another run");
    refreshActualToken();
  }
  console.error(`Looks like there was a problem. Status Code:  ${res.status}`);
  return Promise.reject(error);
};

export const getAxiosInstance = (
  contentType = "application/json;charset=utf-8"
) => {
  let headers = getDefaultHeaders(contentType);
  if(process.env.BEARER_TOKEN){
    headers["Authorization"] = process.env.BEARER_TOKEN;
  }
  const axiosInstance = axios.create({
    headers,
    baseURL: "https://api.spotify.com/v1/me/player/currently-playing",
  });
  axiosInstance.interceptors.response.use((response) =>
    remoteTagInterceptor(response)
  );
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => unauthorizedInteceptor(error)
  );
  return axiosInstance;
};

const send = async ({ data, method, url, error }) => {
  const axiosInstance = getAxiosInstance();
  const axiosSource = axios.CancelToken.source();
  const encodedURL = encodeURI(url).replace(/#/g, "%23");
  method = method.toLowerCase();

  try {
    const response = await axiosInstance.request({
      url: encodedURL,
      method,
      data,
      cancelToken: axiosSource.token,
      params: {market: 'BR'}
    });

    return response.data;
  } catch (requestError) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", requestError.message);
    } else if (error && requestError.request) {
      error(requestError.request);
    } else {
      console.log(requestError);
    }

    if (requestError.response && requestError.response.status === 403) {
      window.location.reload();
    }

    return requestError;
  }
};

export const get = ({url}) => {
  return send({ method: "get", url });
};

export const post = ({ url, requestData }) => {
  return send({ data: requestData, method: "post", url });
};