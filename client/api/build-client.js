import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // we are on the server!
    return axios.create({
      baseURL:
        'http://ticketing-smwentum-prod.xyz/',
      headers: req.headers,
    });
  } else {
    //on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};
