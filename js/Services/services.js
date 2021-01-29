const axios = require('axios');

const dataPost = async (url, body) => axios.post(url, body);

const dataGet = async url => await axios.get(url);

export {dataPost};
export {dataGet};