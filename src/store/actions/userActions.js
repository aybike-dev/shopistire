import {
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER_START,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGOUT,
  AUTH_CLEAR_ERROR,
} from "../types";

// Import mock data
import { mockUsers } from "../../mockData/users";

// Action Creators
export const loginStart = () => ({
  type: AUTH_LOGIN_START,
});

export const loginSuccess = (user) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
});

export const registerStart = () => ({
  type: AUTH_REGISTER_START,
});

export const registerSuccess = (user) => ({
  type: AUTH_REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: AUTH_REGISTER_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: AUTH_LOGOUT,
});

export const clearError = () => ({
  type: AUTH_CLEAR_ERROR,
});

// Async Actions (Thunks)
export const loginUser = (credentials) => (dispatch) => {
  dispatch(loginStart());

  // Simulate API call
  setTimeout(() => {
    const user = mockUsers.find(
      (u) =>
        (u.username === credentials.username ||
          u.email === credentials.username) &&
        u.password === credentials.password
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;
      dispatch(loginSuccess(userWithoutPassword));
    } else {
      dispatch(loginFailure("Kullanıcı adı veya şifre hatalı"));
    }
  }, 1000);
};

export const registerUser = (userData) => (dispatch) => {
  dispatch(registerStart());

  // Simulate API call
  setTimeout(() => {
    // Check if user already exists
    const existingUser = mockUsers.find(
      (u) => u.username === userData.username || u.email === userData.email
    );

    if (existingUser) {
      dispatch(registerFailure("Bu kullanıcı adı veya email zaten kullanımda"));
    } else {
      const newUser = {
        id: mockUsers.length + 1,
        ...userData,
        role: "user",
      };
      mockUsers.push(newUser);
      const { password, ...userWithoutPassword } = newUser;
      dispatch(registerSuccess(userWithoutPassword));
    }
  }, 1000);
};
