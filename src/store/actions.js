import { getArticle as article, getArticles as articles } from '../services/realworld-service';

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
