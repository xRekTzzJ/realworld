const url = 'https://blog.kata.academy/api/';

export const getArticles = async (page = 0) => {
  const data = await fetch(`${url}/articles?offset=${page > 1 ? page * 20 : 0}`);
  const response = data.json();
  return response;
};
