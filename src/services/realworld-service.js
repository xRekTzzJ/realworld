const url = 'https://blog.kata.academy/api/';

export const getArticles = async (page = 1) => {
  const data = await fetch(`${url}/articles?offset=${page > 1 ? page * 20 : 0}`);
  if (!data.ok) {
    throw data;
  }

  const response = await data.json();
  return { ...response, page };
};

export const getArticle = async (slug) => {
  const data = await fetch(`${url}articles/${slug}`);

  if (!data.ok) {
    throw data;
  }

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

  if (!data.ok) {
    throw data;
  }

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

  if (!data.ok) {
    throw data;
  }

  const result = await data.json();
  return result.user;
};

export const userLogin = async (userData) => {
  const data = await fetch(`${url}users/login`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ user: userData }),
  });
  if (!data.ok) {
    throw data;
  }

  const result = await data.json();
  localStorage.setItem('user', JSON.stringify(result.user));
  return result.user;
};

export const updateUser = async (userData, key) => {
  const data = await fetch(`${url}user`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${key}`,
    },
    body: JSON.stringify({ user: userData }),
  });
  if (!data.ok) {
    throw data;
  }
  const result = await data.json();
  localStorage.setItem('user', JSON.stringify(result.user));
  return result.user;
};
