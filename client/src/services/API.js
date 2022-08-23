import axios from 'axios';

const nKey = process.env.REACT_APP_API_KEY_NEWS;
const newsCall = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${nKey}`;

export const getNews = async () => {
  const res = await axios.get(`${newsCall}`);
  return res;
};
