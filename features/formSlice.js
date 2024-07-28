import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stepOne: {},
  stepTwo: {},
  stepThree: {},
  stepFour: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveStepOne(state, action) {
      state.stepOne = action.payload;
    },
    saveStepTwo(state, action) {
      state.stepTwo = action.payload;
    },
    saveStepThree(state, action) {
      state.stepThree = action.payload;
    },
    saveStepFour(state, action) {
      state.stepFour = action.payload;
    },
  },
});

export const { saveStepOne, saveStepTwo, saveStepThree, saveStepFour } =
  formSlice.actions;
export default formSlice.reducer;
