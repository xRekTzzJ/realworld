const url = 'https://blog.kata.academy/api/';

export const getArticles = async () => {
  const data = await fetch(`${url}/articles`);
  const response = data.json();
  return response;
};
