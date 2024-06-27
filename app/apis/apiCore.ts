// import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {BASE_URL} from '../config/constant';
import {setItem} from '../utils/storage';

// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['x-api-key'] =
  '6fa234fb1ab881a48d10068f21432e953986b85cb1cf9';
axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded';

// // intercepting to capture errors
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;

    switch (error?.response?.status) {
      case 401:
        setItem('token', '');
        setItem('expiresIn', 0);

        message = 'Invalid credentials';
        break;
      case 403:
        setItem('token', '');
        setItem('expiresIn', 0);

        message = 'Access Forbidden';
        break;
      case 404:
        message = 'Sorry! the data you are looking for could not be found';
        break;
      default: {
        message =
          error.response && error.response.data
            ? error.response.data['message']
            : error.message || error;
      }
    }
    console.log('error', error.response.data);
    return Promise.reject({error: error.response.data, message});
  },
);

// const getUserFromCookie = () => {
//   const user = sessionStorage.getItem(AUTH_SESSION_KEY);
//   return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
// };

// axios.interceptors.request.use(
//   function (config) {
//     console.log('intersept request', config);
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   },
// );
class APICore {
  /**
   * Fetches data from given url
   */
  get = (url: string, params: any) => {
    let response;
    if (params) {
      const queryString = params
        ? Object.keys(params)
            .map(key => key + '=' + params[key])
            .join('&')
        : '';
      console.log('url-', url);

      response = axios.get(`${url}?${queryString}`, params);
    } else {
      console.log('url', url);
      response = axios.get(`${url}`, params);
    }
    return response;
  };

  //   getFile = (url: string, params: any) => {
  //     let response;
  //     if (params) {
  //       const queryString = params
  //         ? Object.keys(params)
  //             .map(key => key + '=' + params[key])
  //             .join('&')
  //         : '';
  //       response = axios.get(`${url}?${queryString}`, {responseType: 'blob'});
  //     } else {
  //       response = axios.get(`${url}`, {responseType: 'blob'});
  //     }
  //     return response;
  //   };

  //   getMultiple = (urls: string, params: any) => {
  //     const reqs = [];
  //     let queryString = '';
  //     if (params) {
  //       queryString = params
  //         ? Object.keys(params)
  //             .map(key => key + '=' + params[key])
  //             .join('&')
  //         : '';
  //     }

  //     for (const url of urls) {
  //       reqs.push(axios.get(`${url}?${queryString}`));
  //     }
  //     return axios.all(reqs);
  //   };

  /**
   * post given data to url
   */
  create = (url: string, data: any) => {
    return axios.post(url, data);
  };

  /**
   * Updates patch data
   */
  updatePatch = (url: string, data: any) => {
    return axios.patch(url, data);
  };

  /**
   * Updates data
   */
  update = (url: string, data: any) => {
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (url: string) => {
    return axios.delete(url);
  };

  /**
   * post given data to url with file
   */
  createWithFile = (url: string, data: any) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        'Content-Type': 'multipart/form-data',
      },
    };
    return axios.post(url, formData, config);
  };

  /**
   * post given data to url with file
   */
  updateWithFile = (url: string, data: any) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        'content-type': 'multipart/form-data',
      },
    };
    return axios.patch(url, formData, config);
  };

  //   isUserAuthenticated = () => {
  //     const user = this.getLoggedInUser();

  //     if (!user) {
  //       return false;
  //     }
  //     const decoded: any = jwtDecode(user.token);
  //     const currentTime = Date.now() / 1000;
  //     if (decoded.exp < currentTime) {
  //       console.warn('access token expired');
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   };

  //   setLoggedInUser = (session: any) => {
  //     if (session)
  //       sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
  //     else {
  //       sessionStorage.removeItem(AUTH_SESSION_KEY);
  //     }
  //   };
  /**
   * Returns the logged in user
   */
  //   getLoggedInUser = () => {
  //     return getUserFromCookie();
  //   };

  //   setUserInSession = (modifiedUser: any) => {
  //     const userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
  //     if (userInfo) {
  //       const {token, user} = JSON.parse(userInfo);
  //       this.setLoggedInUser({token, ...user, ...modifiedUser});
  //     }
  //   };
}

/*
    "axios": "^0.21.1",

Check if token available in session
*/

export {APICore};
