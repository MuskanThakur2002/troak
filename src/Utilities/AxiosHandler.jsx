import axios from "axios";
import { useNavigate } from "react-router-dom";

const SERVER_MESSAGE_500 =
  'Something went wrong at our end. Please wait a few minutes and try again.';

export function setJwt(jwt) {
  axios.defaults.headers.common["authorization"] = jwt;
}

const getAPIErrorMessage = error => {
  let { status } = ""
  if (error.response != undefined) {
    status = error.response;
  } else {
    status = "500";
  }
  const errorClone = { ...error };

  if (isServerError(status)) {
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

const AxiosHandler = config => {
  return new Promise((resolve, reject) => {
    axios(config)
      .then(resolve)
      .catch(error => {
        error = getAPIErrorMessage(error);
        reject(error);
      });
  });
};

export default AxiosHandler;
