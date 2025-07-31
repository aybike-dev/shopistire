import { createSlice } from "@reduxjs/toolkit";

// Mock users data
const mockUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    password: "123456",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
  },
  {
    id: 2,
    username: "johndoe",
    email: "john@example.com",
    password: "123456",
    firstName: "John",
    lastName: "Doe",
    role: "user",
  },
  {
    id: 3,
    username: "janedoe",
    email: "jane@example.com",
    password: "123456",
    firstName: "Jane",
    lastName: "Doe",
    role: "user",
  },
];

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
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
      state.user = action.payload;
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
      state.error = null;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
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
