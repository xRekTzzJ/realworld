const url = 'https://blog.kata.academy/api/';

export const getArticles = async (page = 1) => {
  const data = await fetch(`${url}/articles?offset=${page > 1 ? page * 20 : 0}`);
  const response = await data.json();
  return { ...response, page };
};

export const getArticle = async (slug) => {
  const data = await fetch(`${url}/articles/${slug}`);
  const response = await data.json();
  return response;
};
