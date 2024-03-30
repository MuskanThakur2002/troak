import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./Components/AppRouter";
import { GoogleOAuthProvider } from "@react-oauth/google";

type Props = {};

const App = (props: Props) => {
  const { REACT_APP_CLIENT_ID_UAT } = process.env;

  const clintKey: any =
    "241909642205-f6771doddnsmeisgk83ecqnvsrsik3q3.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clintKey}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
