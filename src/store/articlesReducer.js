const initialState = {
  articles: [],
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ARTICLES':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default articlesReducer;
