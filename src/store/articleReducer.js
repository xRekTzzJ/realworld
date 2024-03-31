const articleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ARTICLE':
      return {
        ...action.payload.article,
      };
    default:
      return state;
  }
};

export default articleReducer;
