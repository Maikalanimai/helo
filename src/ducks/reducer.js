let initialState = {
  username: "",
  id: "",
  profilePic: ""
};

const UPDATE_USER = "UPDATE_USER";

export const updateUser = ({ id, username, profilePic }) => {
  return { type: UPDATE_USER, payload: { id, username, profilePic } };
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {...state,
      username: action.payload.username,

    }

    default:
      return state;
  }
}

export default reducer;
