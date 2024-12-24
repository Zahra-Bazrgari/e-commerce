"use client";
import store from "@/libs/redux/store";
import React from "react";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default GlobalStateProvider;
