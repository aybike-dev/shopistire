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
import { mockSellers } from "../../mockData/sellers";

// Action Creators
export const loginStart = () => ({
  type: AUTH_LOGIN_START,
});

export const loginSuccess = (data) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
});

export const registerStart = () => ({
  type: AUTH_REGISTER_START,
});

export const registerSuccess = (data) => ({
  type: AUTH_REGISTER_SUCCESS,
  payload: data,
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
export const loginUser =
  (credentials, userType = "customer") =>
  (dispatch) => {
    dispatch(loginStart());

    // Simulate API call
    setTimeout(() => {
      let user = null;
      let foundUserType = null;

      if (userType === "customer") {
        // Check in customer users
        user = mockUsers.find(
          (u) =>
            (u.username === credentials.username ||
              u.email === credentials.username) &&
            u.password === credentials.password
        );
        if (user) {
          foundUserType = "customer";
        }
      } else if (userType === "seller") {
        // Check in sellers
        const seller = mockSellers.find(
          (s) =>
            (s.credentials.username === credentials.username ||
              s.credentials.email === credentials.username) &&
            s.credentials.password === credentials.password
        );
        if (seller) {
          user = {
            id: seller.id,
            username: seller.credentials.username,
            email: seller.credentials.email,
            firstName: seller.name,
            lastName: "",
            role: "seller",
            sellerInfo: seller,
          };
          foundUserType = "seller";
        }
      }

      if (user) {
        const { password, ...userWithoutPassword } = user;
        dispatch(
          loginSuccess({
            user: userWithoutPassword,
            userType: foundUserType,
          })
        );
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
