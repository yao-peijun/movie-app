import React, { useReducer, useContext, createContext } from "react";
import PropTypes from "prop-types";
import { SetBackgroundImage, SetDefaultBackground } from "./reducer/AppTheme";
import AppTheme from "../style/AppTheme";

/* ========================== store state =============================== */

const initialState = {
  appTheme: new AppTheme(),
};

/* ====================== dispatch actions =============================== */

const Store = createContext({});
const { Provider } = Store;

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_BACKGROUND_IMAGE":
      return SetBackgroundImage(state, action);

    case "SET_DEFAULT_BACKGROUND":
      return SetDefaultBackground(state, action);

    default:
      throw new Error();
  }
};

export const useStore = () => useContext(Store);

export const StoreProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Provider value={value}>{children}</Provider>;
};

export default Store;

StoreProvider.defaultProps = {
  children: {},
};

StoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
