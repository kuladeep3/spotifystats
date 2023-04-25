import axios from 'axios';

export const getProfile = async () => {
  let accessToken = localStorage.getItem('access_token');
  console.log(accessToken)
  const res = await axios({
    url: 'https://api.spotify.com/v1/me',
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });
  return res?.data;
};
