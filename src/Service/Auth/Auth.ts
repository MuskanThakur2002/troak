import { useNavigate } from "react-router-dom";

interface LocalStorageStorageData {
  token: string;
  email: string;
  sessionId: string;
  troakId: string;
}

const saveUser = (params: LocalStorageStorageData) => {
  const { token, email, troakId, sessionId } = params;

  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  localStorage.setItem("sessionId", sessionId);
  localStorage.setItem("troakId", troakId);

  console.log(token, email, sessionId, troakId);
};

const isLoggedIn: () => boolean = () => {
  return (
    Boolean(localStorage?.getItem("token")) &&
    Boolean(localStorage.getItem("email"))
  );
};

const signOut = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export { saveUser, isLoggedIn, signOut };
