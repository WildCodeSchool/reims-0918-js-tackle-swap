import axios from "axios";
const isArticle = id_article => {
  return new Promise(resolve => {
    axios
      .get(`${process.env.REACT_APP_URL_API}/article/${id_article}`)
      .then(results => resolve(results.data.type === "success" ? true : false));
  });
};
export default isArticle;
