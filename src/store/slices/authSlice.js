import { createSlice } from "@reduxjs/toolkit";
import { mockUsers } from "../../mockData/users";
import { mockSellers } from "../../mockData/sellers";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  userType: null, // 'customer', 'seller'
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.userType = null;
      state.error = null;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.userType = action.payload.userType;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Async actions
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

export const registerUser =
  (userData, userType = "customer") =>
  (dispatch) => {
    dispatch(registerStart());

    // Simulate API call
    setTimeout(() => {
      if (userType === "customer") {
        // Check if user already exists
        const existingUser = mockUsers.find(
          (u) => u.username === userData.username || u.email === userData.email
        );

        if (existingUser) {
          dispatch(
            registerFailure("Bu kullanıcı adı veya email zaten kullanımda")
          );
        } else {
          const newUser = {
            id: mockUsers.length + 1,
            ...userData,
            role: "user",
          };
          mockUsers.push(newUser);
          const { password, ...userWithoutPassword } = newUser;
          dispatch(
            registerSuccess({
              user: userWithoutPassword,
              userType: "customer",
            })
          );
        }
      } else if (userType === "seller") {
        // For seller registration, we would add more complex logic
        // For now, just show a message that seller registration requires approval
        dispatch(
          registerFailure("Satıcı kaydı için lütfen bizimle iletişime geçin")
        );
      }
    }, 1000);
  };

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
