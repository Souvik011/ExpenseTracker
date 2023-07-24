import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  email: localStorage.getItem("email"),
  idToken: localStorage.getItem("idtoken"),
  isLoggedIn: !!localStorage.getItem("email"),
};

const AuthSlice = createSlice({
    name : "auth",
    initialState : initialAuthState,
    reducers: {
        login(state,action) {
            state.email = action.payload.email;
            state.idToken = action.payload.idToken;
            state.isLoggedIn = true;
            localStorage.setItem("email",action.payload.email);
            localStorage.setItem("idtoken",action.payload.idToken);
        },
        logout(state) {
            localStorage.removeItem("email");
            localStorage.removeItem("idtoken");
            state.email = null ;
            state.idToken = null ;
            state.isLoggedIn = false ;
        }
    }
});

export const AuthAction = AuthSlice.actions;
export default AuthSlice.reducer;