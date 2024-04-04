import axios from "axios";
import { useNavigate } from "react-router-dom";

const SERVER_MESSAGE_500 =
  'Something went wrong at our end. Please wait a few minutes and try again.';

export function setJwt(jwt) {
  axios.defaults.headers.common["authorization"] = jwt;
}

const getAPIErrorMessage = error => {
  let status = "";
  if (error.response != undefined) {
    status = error.response.status; // Fixed to access the status property correctly
  } else {
    status = "500";
  }
  const errorClone = { ...error };

  if (isServerError(status)) {
    // Assuming the structure supports directly assigning to `errorClone.response.data`
    errorClone.response.data = { error: SERVER_MESSAGE_500 };
  }

  return errorClone;
};

const isServerError = status => {
  return status === 500;
};

const logout = (navigate) => {
  localStorage.clear();
  sessionStorage.clear();
  navigate('/login');
}

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const navigate = useNavigate(); // Cannot use hooks in interceptor directly
    if (error.response.status === 401) {
      logout(navigate);
    }
    error = getAPIErrorMessage(error);
    return Promise.reject(error);
  }
);

export { getAPIErrorMessage };


const AxiosHandler = (config, customTimeout = 15000) => { // Default timeout of 5000ms, can be overridden
  const configWithTimeout = { ...config, timeout: customTimeout };

  return new Promise((resolve, reject) => {
    axios(configWithTimeout)
      .then(resolve)
      .catch(error => {
        const modifiedError = getAPIErrorMessage(error);
        reject(modifiedError);
      });
  });
};

export default AxiosHandler;
