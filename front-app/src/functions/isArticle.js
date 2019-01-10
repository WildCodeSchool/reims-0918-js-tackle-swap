import axios from "axios";
const isArticle = id_article => {
  return new Promise(resolve => {
    axios
      .get(`http://localhost:5000/article/${id_article}`)
      .then(results => resolve(results.data.type === "success" ? true : false));
  });
};
export default isArticle;
