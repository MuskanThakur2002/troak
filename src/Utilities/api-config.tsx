const hostname = window && window.location && window.location.hostname;
let apiUrl: string;

if (hostname === "troak.club") {
  apiUrl = "https://testconsumerapi.troak.club";
} else {
  apiUrl = "https://testconsumerapi.troak.club";
}

// const apiUrl = "";
export const API_ROOT: string = apiUrl;
