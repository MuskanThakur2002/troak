import React, { useEffect } from "react";
import Styles from "./Login.module.scss";
import loginImage from "../../Assets/Images/ic_launcher_round.png";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

import { saveUser, signOut } from "../../Service/Auth/Auth";
import { userLogin } from "../../Utilities/ApiHandler"

const Login = () => {
  const navigate = useNavigate();
  const { REACT_APP_HOSTED_DOMAIN } = process.env;

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        if (event?.data?.type == 'googleSignInResponse') {
          debugger
          const token = event.data.idToken
          const email = event.data.email
          processSignIn({ token, email })
        }

      } catch (error) {
        console.error('Error processing the message', error);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const processSignIn = async ({ token, email }) => {
    try {
      const response = await userLogin(token);
      if (response.status === 200) {
        const { sessionId, troakId } = response.data.data;
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ action: "sessionId", sessionId: sessionId }));
        }

        saveUser({ email, token, sessionId, troakId });
        navigate("/");
      } else {
        console.log("Failed to sign in");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      // signOut();
    }
  };

  const signIn = async (credentialResponse) => {
    console.log(credentialResponse)
    const token = credentialResponse?.credential;
    const user = jwt_decode(token);
    const { email } = user;
    try {
      const response = await userLogin(token);
      if (response.status === 200) {
        const { sessionId, troakId } = response.data.data;
        saveUser({ email, token, sessionId, troakId });
        navigate("/");
      } else {
        console.log("Failed to sign in");
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const onError = () => {
    signOut();
    navigate('/login');
  };


  const requestSignIn = () => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ action: "requestGoogleSignIn" }));
    }
  };

  return (
    <div className={Styles.mainContainer}>

      <div className={Styles.container}>
        <div className={Styles.loginImage}>
          <img src={loginImage} width="100px" height="100px" alt="Login Icon" />
        </div>
        <div className={Styles.header}>Nice To See You!</div>
        {window.ReactNativeWebView ?
          <button className={Styles.button} onClick={requestSignIn}>
            Continue With Google
          </button>
          :
          <button className={Styles.button}>
            You can't log in using the website; it's only available on the app.
            <div>
            <GoogleLogin
              onSuccess={signIn}
              onError={onError}
              hosted_domain={REACT_APP_HOSTED_DOMAIN}
            />
          </div>
          </button>}

      </div>
    </div>
  );
};

export default Login;
