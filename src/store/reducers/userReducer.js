import {
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER_START,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGOUT,
  AUTH_CLEAR_ERROR,
  USERS_SET_LOADING,
  USERS_SET_ERROR,
  USERS_SET_USERS,
  USERS_ADD_USER,
  USERS_UPDATE_USER,
  USERS_DELETE_USER,
} from "../types";

const initialState = {
  // Auth state
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Users management state
  users: [],
  usersLoading: false,
  usersError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // Auth cases
    case AUTH_LOGIN_START:
    case AUTH_REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case AUTH_LOGIN_FAILURE:
    case AUTH_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };

    case AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    // Users management cases
    case USERS_SET_LOADING:
      return {
        ...state,
        usersLoading: action.payload,
      };

    case USERS_SET_ERROR:
      return {
        ...state,
        usersError: action.payload,
      };

    case USERS_SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case USERS_ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case USERS_UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case USERS_DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
};

export default userReducer;
