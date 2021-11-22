import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.104.140.150:8081/v1',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

const endpoints = {
  auth: '/auth',
  user: '/user',
  link: '/link'
};

api.interceptors.request.use(function (config) {
  if (config.headers) {
    config.headers['Authorization'] = 'Basic ' + getToken();
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      ['/signin', '/signup'].indexOf(location.pathname) === -1 &&
      error.response?.status === 401
    ) {
      localStorage.removeItem('api-token');
      location.reload();
    }
    return Promise.reject(error);
  }
);

function getToken() {
  const storedToken = localStorage.getItem('api-token');
  return storedToken && typeof storedToken === 'string' ? storedToken : '';
}

export { api, endpoints };
