import authConfig from "@/configs/authConfig";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultProvider = {
  user: null,
  token: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: null,
    email: null,
  });
  const [token, setToken] = useState();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      if (isAuthenticated()) {
        router.replace("/reviews");
      } else {
        const storedToken = window.localStorage.getItem(
          authConfig.storageTokenKeyName
        );
        const storedUser = window.localStorage.getItem(
          authConfig.storageUserKeyName
        );
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          router.replace("/login");
        }
      }
    };
    initAuth();
  }, []);

  const authorizeUser = (response) => {
    const accessToken = response.headers["authorization"].split(" ")[1]; // Extract JWT token from response headers
    setToken(accessToken);
    setUser({ ...response.data.data });

    window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken);
    window.localStorage.setItem(
      authConfig.storageUserKeyName,
      JSON.stringify(response.data.data)
    );

    // Display a success toast message
    toast.success(response.data.message, {
      position: "top-left",
    });

    router.replace("/reviews");
  };

  const login = (params) => {
    axios
      .post(authConfig.baseUrl + authConfig.loginEndpoint, params)
      .then((response) => {
        authorizeUser(response);
        console.log("Signed in Successfully :)");
      })
      .catch((error) => {
        toast.error("Email or Password is invalid!", {
          position: "top-left", // Position of the toast
          autoClose: 3000, // Duration in milliseconds
        });
        console.log("Cannot Sign in :( Error: " + error);
      });
  };

  const logout = () => {
    // Clear user data and token
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the DELETE request
    axios
      .delete(authConfig.baseUrl + authConfig.logoutEndpoint, axiosConfig)
      .then((response) => {
        console.log("Delete successful:", response.data);
        window.localStorage.removeItem(authConfig.storageTokenKeyName);
        window.localStorage.removeItem(authConfig.storageUserKeyName);
        setUser(null);
        setToken(null);
        router.push(authConfig.loginEndpoint);
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-left",
        });
        console.error("Error:", error);
      });
  };

  const signup = (params) => {
    axios
      .post(authConfig.baseUrl + authConfig.signUpEndpoint, params)
      .then((response) => {
        authorizeUser(response);
        console.log("Signed up Successfully :)");
      })
      .catch((error) => {
        console.error("Signup error:", error);

        // Display an error toast message
        toast.error("Error occurred while signing up.", {
          position: "top-left",
        });
      });
  };

  const isAuthenticated = () => {
    return user != null && token != null;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, isAuthenticated, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
