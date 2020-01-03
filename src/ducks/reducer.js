let initialState = {
  username: "",
  id: "",
  profilePic: ""
};

const UPDATE_USER = "UPDATE_USER";

export const updateUser = (username, id, profilePic) => {
  return { type: UPDATE_USER, payload: { id, username, profilePic } };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
          ...state,
          username: action.payload.username,
          id: action.payload.id,
          profilePic: action.payload.profilePic
      };
    default:
      return state;
  }
};

export default reducer;
