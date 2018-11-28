// For this app, Limit is a default at 20
const defineLimit = (pageCalled, numberArticlesPerPage) => {
  const offset = (pageCalled - 1) * 20;
  const limit = numberArticlesPerPage;
  return `${offset}, ${limit}`;
};

module.exports = defineLimit;
