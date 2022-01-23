const TOKEN_KEY = "id_token";

export const login = () => {
  localStorage.setItem(TOKEN_KEY, "TestLogin");
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
};

export const getRole = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    let user = JSON.parse(localStorage.getItem("user") || "");
    return user.role;
  }
  return "";
};
