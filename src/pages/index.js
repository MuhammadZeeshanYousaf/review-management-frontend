import authConfig from "@/configs/authConfig";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  setTimeout(function () {
    if (isAuthenticated()) {
      router.replace("/reviews");
    } else {
      router.replace(authConfig.loginEndpoint);
    }
  }, 500);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-2">Welcome to Review Management</h1>
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
    </div>
  );
};

export default Home;
