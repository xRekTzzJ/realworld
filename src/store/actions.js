import { getArticles as articles } from '../services/realworld-service';

export const getArticles = () => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_ARTICLES',
      payload: await articles(),
    });
  };
};
