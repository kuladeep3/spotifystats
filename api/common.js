import axios from 'axios';
import { getCookie } from 'cookies-next';

export const getProfile = async () => {
  const accessToken = getCookie('access_token');
  const res = await axios({
    url: 'https://api.spotify.com/v1/me',
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });
  return res?.data;
};
