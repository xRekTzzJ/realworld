const articleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ARTICLE':
      return {
        ...action.payload.article,
      };
    case 'UPDATE_ARTICLE_FAVORITES_INFO':
      return {
        ...state,
        favorited: action.payload.favorited,
        favoritesCount: action.payload.favoritesCount,
      };
    default:
      return state;
  }
};

export default articleReducer;
