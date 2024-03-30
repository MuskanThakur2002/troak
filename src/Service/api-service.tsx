// vendors
import Axios, { AxiosInstance, CancelToken } from "axios";
import { useNavigate } from "react-router-dom";

// --------------------------------------------------------------------------------
export const apiBase =
  window.location.host === "https://dp7kgmm2ljn9m.cloudfront.net"
    ? "https://testconsumerapi.troak.club"
    : window.location.host === "http://localhost:3000"
    ? "https://testconsumerapi.troak.club"
    : "https://testconsumerapi.troak.club";
// "https://affordable-housingapi.uat.werize.com";
// "http://localhost:9066";
// ---------------------------------------------------------------------------------

class Api {
  private _apiBase: string;
  private axios: AxiosInstance;
  private timeout: number = 30000;
  private navigate: Function;

  constructor(apiBase: string) {
    this._apiBase = apiBase;
    this.axios = Axios.create({
      baseURL: this.apiBase,
      timeout: this.timeout,
    });
    // this.axios.defaults.headers.common["Content-Type"] = "application/json";
    this.axios.defaults.headers.post["Content-Type"] = "application/json";
    this.axios.interceptors.request.use(
      (req) => {
        // let token = this.token;
        // req["headers"]["Authorization"] = token ? `Token ${token}` : "";
        return req;
      },
      (e) => {
        return Promise.reject(e);
      }
    );
    this.axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 401) {
          return this.logout();
        }
        return Promise.reject(error);
      }
    );

    this.navigate = useNavigate();
  }

  get signOut() {
    localStorage.clear();
    sessionStorage.clear();
    return this.navigate("/login");
  }

  get apiBase() {
    return this._apiBase;
  }

  get token() {
    return sessionStorage?.getItem("token");
  }

  get = (
    url: string,
    params: any = {},
    timeout?: number,
    cancelToken?: CancelToken
  ) => {
    return this.axios({
      method: "get",
      url,
      params,
      timeout: timeout ?? this.timeout,
      cancelToken,
    });
  };

  post = (
    url: string,
    data: any = {},
    params: any = {},
    timeout?: number
  ) => {
    return this.axios({
      method: "post",
      url,
      data,
      params,
      timeout: timeout ?? this.timeout,
    });
  };

  put = (url: string, data: any, params: any = {}, timeout?: number) => {
    return this.axios({
      method: "put",
      url,
      data,
      params,
      timeout: timeout ?? this.timeout,
    });
  };

  delete = (url: string, data?: any, timeout?: number) => {
    return this.axios({
      method: "delete",
      url,
      data,
      timeout: timeout ?? this.timeout,
    });
  };

  /**send login request */
  login = (credentials: any) => {
    return this.post("auth/login/", { ...credentials }, {}, 30000);
  };

  logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    this.navigate("/login");
  };
}

// ---------------------------------------------------------------------------------
const API = new Api(apiBase);
// ---------------------------------------------------------------------------------

export { API };
