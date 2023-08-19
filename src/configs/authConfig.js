const authConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  loginEndpoint: "/login",
  logoutEndpoint: "/logout",
  signUpEndpoint: "/signup",
  storageTokenKeyName: "accessToken",
  storageUserKeyName: "userData",
};

export default authConfig;
