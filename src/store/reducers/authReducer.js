
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  authLoading: true,
  userToken: null,
  patient: null,
  doctorId: null,
  isLogedIn: false,
  isCompletedOnboardingFlow: false,
  userName: null,
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    // ################################################################
    setUserToken: (authReducer, action) => {
      authReducer.userToken = action.payload;
    },
    setPatient: (authReducer, action) => {
      authReducer.patient = action.payload;
    },
    setDoctorId: (authReducer, action) => {
      authReducer.doctorId = action.payload;
    },
    setIsLogedIn: (authReducer, action) => {
      authReducer.isLogedIn = action.payload;
    },
    setUserName: (authReducer, action) => {
      authReducer.userName = action.payload;
    },
    setIsCompletedOnboardingFlow: (authReducer, action) => {
      authReducer.isCompletedOnboardingFlow = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
  },
});

export const {
  setUserToken,
  setPatient,
  setDoctorId,
  setIsLogedIn,
  setIsCompletedOnboardingFlow,
  setAuthLoading,
  setUserName,
} = authReducer.actions;

export default authReducer.reducer;
