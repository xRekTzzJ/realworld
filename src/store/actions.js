import {
  getArticle as article,
  getArticles as articles,
  getUserInfo,
  registerNewUser as register,
} from '../services/realworld-service';

export const getArticles = (page) => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_ARTICLES',
      payload: await articles(page),
    });
  };
};

export const getArticle = (slug) => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_ARTICLE',
      payload: await article(slug),
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
