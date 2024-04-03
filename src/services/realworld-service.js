const url = 'https://blog.kata.academy/api/';

export const getArticles = async (page = 1) => {
  const data = await fetch(`${url}/articles?offset=${page > 1 ? page * 20 : 0}`);
  const response = await data.json();
  return { ...response, page };
};

export const getArticle = async (slug) => {
  const data = await fetch(`${url}articles/${slug}`);
  const response = await data.json();
  return response;
};

export const registerNewUser = async (userData) => {
  const data = await fetch(`${url}users`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ user: userData }),
  });
  const result = await data.json();
  localStorage.setItem('user', JSON.stringify(result.user));
  return result.user;
};

export const getUserInfo = async (key) => {
  const data = await fetch(`${url}user`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${key}`,
    },
  });

  const result = await data.json();
  return result.user;
};
