import {
  getArticle as article,
  getArticles as articles,
  favoriteAnArticle as favorite,
  getUserInfo,
  userLogin as login,
  registerNewUser as register,
  unfavoriteAnArticle as unfavorite,
  updateUser as update,
} from '../services/realworld-service';

export const getArticles = (page, key = undefined) => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_ARTICLES',
      payload: await articles(page, key),
    });
  };
};

export const getArticle = (slug, key = undefined) => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_ARTICLE',
      payload: await article(slug, key),
    });
  };
};

export const registerNewUser = (userdata) => {
  return async (dispatch) => {
    dispatch({
      type: 'REGISTER_NEW_USER',
      payload: await register(userdata),
    });
  };
};

export const checkAuth = (userData) => {
  if (userData) {
    return async (dispatch) => {
      const { token } = userData;
      dispatch({
        type: 'AUTH',
        payload: await getUserInfo(token),
      });
    };
  }
  return {
    type: 'AUTH',
    payload: userData,
  };
};

export const logOut = () => {
  localStorage.removeItem('user');
  return {
    type: 'LOG_OUT',
    payload: {},
  };
};

export const loginUser = (userdata) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN',
      payload: await login(userdata),
    });
  };
};

export const updateUser = (userdata, key) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: await update(userdata, key),
    });
  };
};

export const favoriteArticle = (slug, key) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_ARTICLE_FAVORITES_INFO',
      payload: await favorite(slug, key),
    });
  };
};

export const unfavoriteArticle = (slug, key) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_ARTICLE_FAVORITES_INFO',
      payload: await unfavorite(slug, key),
    });
  };
};
