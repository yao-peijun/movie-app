export const SetBackgroundImage = (state, action) => {
  const newState = { ...state };
  newState.appTheme.setBackgroundImage(action.payload.image);
  return newState;
};

export const SetDefaultBackground = (state) => {
  const newState = { ...state };
  newState.appTheme.setDefaultBackground();
  return newState;
};
