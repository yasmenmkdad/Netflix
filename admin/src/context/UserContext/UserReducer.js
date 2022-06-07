const UserReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS_START":
      return {
        Users: [],
        isFetching: true,
        error: false,
      };
    case "GET_USERS_SUCCESS":
      return {
        Users: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_USERS_FAILURE":
      return {
        Users: [],
        isFetching: false,
        error: true,
      };
    case "DELETE_USER_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_USER_SUCCESS":
      return {
        Users: state.Users.filter((User) => User._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default UserReducer;
