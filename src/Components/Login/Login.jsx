import React, { useEffect, useState } from "react";
import Styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { saveUser, signOut } from "../../Service/Auth/Auth";
import { userLogin } from "../../Utilities/ApiHandler";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
	const navigate = useNavigate();
	const { REACT_APP_HOSTED_DOMAIN } = process.env;
	const [showAnimationPostLogin, setShowAnimationPostLogin] = useState(false);
	useEffect(() => {
		const handleMessage = (event) => {
			try {
				if (event?.data?.type == "googleSignInResponse") {
					debugger;
					const token = event.data.idToken;
					const email = event.data.email;
					processSignIn({ token, email });
				}
			} catch (error) {
				console.error("Error processing the message", error);
			}
		};

		window.addEventListener("message", handleMessage);

		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, []);

	useEffect(() => {
		if (showAnimationPostLogin) {
			// Assuming the GIF duration is 3000 milliseconds (3 seconds)
			const timer = setTimeout(() => {
				navigate("/home");
			}, 1500);
			return () => clearTimeout(timer);
		}
	}, [showAnimationPostLogin]);

	const processSignIn = async ({ token, email }) => {
		try {
			const response = await userLogin(token);
			if (response.status === 200) {
				const { sessionId, troakId } = response.data.data;
				if (window.ReactNativeWebView) {
					window.ReactNativeWebView.postMessage(
						JSON.stringify({ action: "sessionId", sessionId: sessionId }),
					);
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
		console.log(credentialResponse);
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
		navigate("/login");
	};

	const requestSignIn = () => {
		if (window.ReactNativeWebView) {
			window.ReactNativeWebView.postMessage(
				JSON.stringify({ action: "requestGoogleSignIn" }),
			);
		}
	};

	return (
		<div className={Styles.container}>
			{!showAnimationPostLogin && (
				<img
					className={Styles.loginImage}
					src={require("../../images/ic_troak_logo.png")}
					alt="Login Icon"
				/>
			)}
			<div
				className={`${Styles.header} ${
					showAnimationPostLogin ? Styles.headerExtraMargin : ""
				}`}
			>
				Nice To See You!
			</div>
			{showAnimationPostLogin && (
				<img
					className={Styles.postLoginGIF}
					src={require("../../images/troak_logo.gif")}
					alt="Login Sucess"
				/>
			)}

			{!showAnimationPostLogin && (
				<div>
					{window.ReactNativeWebView ? (
						<div className={Styles.googleButton} onClick={requestSignIn}>
							<img
								src={require("../../images/ic_google_red.png")}
								alt="Google Img"
							/>
							<p>Continue With Google</p>
						</div>
					) : (
						<p className={Styles.errorMsg}>
							You can't log in using the website; it's only available on the
							app.
						</p>
					)}
					<GoogleLogin
						onSuccess={signIn}
						onError={onError}
						hosted_domain={REACT_APP_HOSTED_DOMAIN}
					/>
				</div>
			)}
		</div>
	);
};

export default Login;
