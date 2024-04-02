const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REGISTER_NEW_USER':
      return {
        ...action.payload,
      };
    case 'AUTH':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
